from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch
from io import BytesIO
import gc
import os

# Force CPU usage to reduce memory consumption
device = "cpu"  # Force CPU usage for memory efficiency

# Initialize processor and model as None
processor = None
model = None

def _load_blip_model():
    global processor, model
    if processor is None or model is None:
        print("Loading optimized BLIP model for low memory usage...")
        try:
            # Load with memory optimizations
            processor = BlipProcessor.from_pretrained(
                "Salesforce/blip-image-captioning-base",
                torch_dtype=torch.float32  # Use float32 instead of float16 for CPU
            )
            model = BlipForConditionalGeneration.from_pretrained(
                "Salesforce/blip-image-captioning-base",
                torch_dtype=torch.float32,
                low_cpu_mem_usage=True  # Enable low memory usage
            ).to(device)
            
            # Set model to evaluation mode to save memory
            model.eval()
            
            # Clear any cached memory
            gc.collect()
            
            print("BLIP model loaded successfully with memory optimizations.")
        except Exception as e:
            print(f"Error loading BLIP model: {e}")
            raise

def generate_caption(image_bytes):
    try:
        _load_blip_model()  # Ensure model is loaded
        
        # Process image with memory optimization
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        
        # Resize image to reduce memory usage (optional)
        max_size = 512
        image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        
        # Generate caption with memory optimizations
        with torch.no_grad():  # Disable gradients to save memory
            inputs = processor(image, return_tensors="pt").to(device)
            
            # Generate with reduced parameters to save memory
            out = model.generate(
                **inputs, 
                max_new_tokens=20,  # Reduced from 30 to save memory
                do_sample=False,    # Deterministic generation saves memory
                num_beams=1        # Reduced beam search to save memory
            )
            
            caption = processor.decode(out[0], skip_special_tokens=True)
            
            # Clean up memory
            del inputs, out
            gc.collect()
            
            return caption
            
    except Exception as e:
        # Clean up on error
        gc.collect()
        print(f"Error in generate_caption: {e}")
        # Fallback to a simple description
        return "An image with various visual elements"