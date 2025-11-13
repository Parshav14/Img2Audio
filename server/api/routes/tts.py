from fastapi import APIRouter, Form
from fastapi.responses import FileResponse
from gtts import gTTS
import uuid
import os

router = APIRouter()

@router.post("/tts")
async def text_to_speech(text: str = Form(...), language: str = Form("en")):
    try:
        tts = gTTS(text=text, lang=language)
        filename = f"audio_{uuid.uuid4().hex}.mp3"
        filepath = os.path.join("temp_audio", filename)

        os.makedirs("temp_audio", exist_ok=True)
        tts.save(filepath)

        return FileResponse(filepath, media_type="audio/mpeg", filename=filename)
    except Exception as e:
        return {"error": str(e)}
