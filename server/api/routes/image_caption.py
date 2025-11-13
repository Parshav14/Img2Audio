from fastapi import APIRouter, UploadFile, File, HTTPException
from models.blip_model import generate_caption
from models.lightweight_caption import generate_lightweight_caption
import os
import gc

router = APIRouter()

@router.post("/caption")
async def generate_image_caption(file: UploadFile = File(...)):
    try:
        # Validate file size to prevent memory issues
        image_bytes = await file.read()
        
        # Limit file size to 5MB to prevent memory overflow
        if len(image_bytes) > 5 * 1024 * 1024:
            raise HTTPException(status_code=413, detail="File too large. Please upload an image smaller than 5MB.")
        
        # Check if we should use lightweight mode based on environment
        use_lightweight = os.getenv('USE_LIGHTWEIGHT_CAPTION', 'false').lower() == 'true'
        
        try:
            if use_lightweight:
                print("Using lightweight captioning...")
                caption = generate_lightweight_caption(image_bytes)
            else:
                print("Attempting BLIP model captioning...")
                caption = generate_caption(image_bytes)
                
        except Exception as model_error:
            print(f"BLIP model failed: {model_error}")
            print("Falling back to lightweight captioning...")
            caption = generate_lightweight_caption(image_bytes)
        
        # Clean up memory
        del image_bytes
        gc.collect()
        
        return {"caption": caption}
        
    except HTTPException:
        raise
    except Exception as e:
        # Clean up on any error
        gc.collect()
        print(f"Error in image captioning: {e}")
        return {"error": f"Failed to process image: {str(e)}"}

@router.get("/caption/health")
async def caption_health():
    """Health check for caption service"""
    return {"status": "healthy", "service": "image_caption"}
