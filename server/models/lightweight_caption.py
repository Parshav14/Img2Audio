"""
Lightweight image captioning using basic computer vision
This is a fallback solution for extremely low memory environments
"""
from PIL import Image
import io
import colorsys

def analyze_image_basic(image_bytes):
    """Basic image analysis without ML models"""
    try:
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        width, height = image.size
        
        # Analyze dominant colors
        colors = image.getcolors(maxcolors=256*256*256)
        if colors:
            # Get most common color
            dominant_color = max(colors, key=lambda x: x[0])[1]
            r, g, b = dominant_color
            
            # Convert to HSV for better color description
            h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
            
            # Determine color name
            if s < 0.1:
                if v > 0.8:
                    color_name = "white"
                elif v < 0.3:
                    color_name = "black"
                else:
                    color_name = "gray"
            else:
                if h < 0.08 or h > 0.92:
                    color_name = "red"
                elif h < 0.17:
                    color_name = "orange"
                elif h < 0.25:
                    color_name = "yellow"
                elif h < 0.42:
                    color_name = "green"
                elif h < 0.58:
                    color_name = "cyan"
                elif h < 0.75:
                    color_name = "blue"
                else:
                    color_name = "purple"
        else:
            color_name = "colorful"
        
        # Determine orientation
        if width > height * 1.3:
            orientation = "wide"
        elif height > width * 1.3:
            orientation = "tall"
        else:
            orientation = "square"
        
        # Generate simple caption
        caption = f"A {orientation} image with {color_name} tones"
        
        return caption
        
    except Exception as e:
        print(f"Error in basic image analysis: {e}")
        return "An image with visual content"

def generate_lightweight_caption(image_bytes):
    """Generate caption using lightweight analysis"""
    return analyze_image_basic(image_bytes)