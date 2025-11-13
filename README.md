# 🔊 **Vision2VoiceAI ✨**

<p align="center">
  <img src="https://img.shields.io/badge/Python-6A0DAD?style=flat&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-228B22?style=flat&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/HuggingFace-FCC72A?style=flat&logo=huggingface&logoColor=white"/>
  <img src="https://img.shields.io/badge/gTTS-FF6F00?style=flat&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/Translate_API-4285F4?style=flat&logo=googletranslate&logoColor=white"/>
</p>

**AI-powered visual understanding with multilingual speech narration**

Vision2VoiceAI is an accessibility-focused AI system that transforms images into spoken descriptions across multiple languages. Using deep learning–based image captioning and neural TTS, it bridges the gap between visual media and individuals with visual impairments, allowing them to “hear” what an image contains.

---

## 🛠 **Features**

* 🖼️ **AI Image Captioning** using the BLIP model
* 🔉 **Natural Text-to-Speech** using `gTTS`
* 🌐 **Multi-language support**: English, Hindi, Bengali (expandable)
* 🎨 **Clean, modern UI** with optional dark mode for visual comfort
* 📑 **Drag-and-drop image uploads** for quick interaction
* 🔐 **Accessible interface** designed for low-vision & blind users

---

## 🔧 **Setup Instructions**

### **1. 🖥️ Clone the Repository**

```
git clone https://github.com/<your-username>/Vision2VoiceAI.git
cd Vision2VoiceAI
```

---

### **2. 🧩 Frontend Setup (Next.js + Tailwind)**

```
cd client
npm install
npm run dev
```

Your frontend will run at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### **3. 🧩 Backend Setup (FastAPI)**

```
cd server
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Your backend API will run at:
👉 **[http://localhost:8000](http://localhost:8000)**

---

## 🗃️ **Project Structure**

```
Vision2VoiceAI/
├── server/            # FastAPI backend
│   ├── api/routes
│   ├── models
│   ├── main.py
│   └── requirements.txt
│
└── client/            # Next.js + Tailwind frontend
    ├── components
    ├── pages
    └── styles
```

---

### 🧠 **Frontend Reference**

* Interface layout: `src/components/Layout.js`
* Image upload workflow: `src/components/ImageUpload.js`
* Global theme & styles: `src/styles/globals.css`
* Page routing: `src/pages/`

---

## 🫠 **Upcoming Enhancements**

* 📶 Full offline mode for maximum accessibility
* 📈 History section to revisit past captions & audio
* 📱 Mobile (Android) version with cloud sync

---

## 🫱🏻‍🫲🏼 **Contribution & License**

Contributions, ideas, and suggestions for improving accessibility are always welcome.
Feel free to open issues or send pull requests.

This project is licensed under the **MIT License**.
See the [`LICENSE`](./LICENSE) file for complete terms.

<p align="center"><strong>Created with ❤️ by Parshav Singla</strong></p>