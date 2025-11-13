from fastapi import APIRouter, Form
from deep_translator import GoogleTranslator

router = APIRouter()

@router.post("/translate")
async def translate_caption(text: str = Form(...), target_lang: str = Form(...)):
    try:
        translator = GoogleTranslator(source='auto', target=target_lang)
        translated_text = translator.translate(text)
        return {"translated_text": translated_text}
    except Exception as e:
        return {"error": str(e)}