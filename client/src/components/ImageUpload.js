import { useState, useRef, useEffect } from "react";
import {
  Play,
  Download,
  Upload,
  Volume2,
  Pause,
  RotateCcw,
} from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";
import { db } from "../db";
import { apiCall, ENDPOINTS } from "../config/api";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [language, setLanguage] = useState("en");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const dropRef = useRef();
  const fileInputRef = useRef();
  const audioRef = useRef();
  const statusRef = useRef();

  // Handle image selection
  const handleImageChange = (file) => {
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        announceToScreenReader("Error: Please select a valid image file.");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError(
          "Image file is too large. Please select an image smaller than 5MB."
        );
        announceToScreenReader(
          "Error: Image file is too large. Please select an image smaller than 5MB."
        );
        return;
      }

      setImage(file);
      setCaption("");
      setAudioUrl(null);
      setError("");
      announceToScreenReader(
        `Image selected: ${file.name}. Ready to generate caption.`
      );
    }
  };

  // Announce messages to screen readers
  const announceToScreenReader = (message) => {
    if (statusRef.current) {
      statusRef.current.textContent = message;
    }
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    dropRef.current?.classList.remove("border-primary", "bg-card");
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current?.classList.add("border-primary", "bg-card");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropRef.current?.classList.remove("border-primary", "bg-card");
  };

  // Audio controls
  const playAudio = (url) => {
    if (!url) return;

    setIsPlaying(true);
    announceToScreenReader("Playing audio description.");

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.preload = "auto";
    audio.addEventListener(
      "canplaythrough",
      () => {
        setTimeout(() => {
          audio.play().catch((error) => {
            console.error("Audio play failed:", error);
            setIsPlaying(false);
            announceToScreenReader("Error: Could not play audio.");
          });
        }, 300);
      },
      { once: true }
    );

    audio.onended = () => {
      setIsPlaying(false);
      announceToScreenReader("Audio playback completed.");
    };

    audio.onerror = () => {
      setIsPlaying(false);
      announceToScreenReader("Error: Audio playback failed.");
    };

    audio.load();
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      announceToScreenReader("Audio paused.");
    }
  };

  const handleDownload = async () => {
    if (!audioUrl) return;

    setIsDownloading(true);
    announceToScreenReader("Starting audio download.");

    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Vision2Voice-ai-caption-${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      announceToScreenReader("Audio download completed.");
    } catch (error) {
      console.error("Download failed:", error);
      announceToScreenReader("Error: Audio download failed.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setImage(null);
    setCaption("");
    setAudioUrl(null);
    setError("");
    setUploadProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    announceToScreenReader("Form reset. Ready for new image.");
  };

  // Main upload and processing function
  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image first.");
      announceToScreenReader("Error: Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    setError("");
    setUploadProgress(25);
    announceToScreenReader("Processing image. Please wait...");

    try {
      // Step 1: Generate caption
      const res = await apiCall(ENDPOINTS.CAPTION, {
        method: "POST",
        body: formData,
      });

      setUploadProgress(50);
      const data = await res.json();
      let finalCaption =
        data.caption || "No caption could be generated for this image.";

      // Step 2: Translate if needed
      if (language !== "en") {
        setUploadProgress(65);
        announceToScreenReader("Translating caption...");

        try {
          const translateForm = new FormData();
          translateForm.append("text", finalCaption);
          translateForm.append("target_lang", language);

          const transRes = await apiCall(ENDPOINTS.TRANSLATE, {
            method: "POST",
            body: translateForm,
          });

          if (transRes.ok) {
            const transData = await transRes.json();
            if (transData.translated_text) {
              finalCaption = transData.translated_text;
            }
          }
        } catch (error) {
          console.error("Translation error:", error);
          // Continue with original caption if translation fails
        }
      }

      setCaption(finalCaption);
      setUploadProgress(80);
      announceToScreenReader(`Caption generated: ${finalCaption}`);

      // Step 3: Generate audio
      let audioBlob = null;
      let newAudioUrl = null;

      try {
        const audioFormData = new FormData();
        audioFormData.append("text", finalCaption);
        audioFormData.append("language", language);

        const audioResponse = await apiCall(ENDPOINTS.TTS, {
          method: "POST",
          body: audioFormData,
        });

        if (audioResponse.ok) {
          audioBlob = await audioResponse.blob();
          newAudioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(newAudioUrl);
          announceToScreenReader(
            "Audio generated successfully. You can now play or download the audio."
          );
        }
      } catch (error) {
        console.error("TTS error:", error);
        announceToScreenReader("Caption generated but audio creation failed.");
      }

      setUploadProgress(90);

      // Step 4: Save to history
      try {
        await db.history.add({
          caption: finalCaption,
          image: image,
          audio: audioBlob,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error("Failed to save history:", error);
      }

      setUploadProgress(100);

      // Auto-play audio for accessibility
      if (newAudioUrl) {
        setTimeout(() => playAudio(newAudioUrl), 1000);
      }
    } catch (e) {
      console.error(e);
      let errorMessage = "Something went wrong while processing your image.";

      if (e.message.includes("Network error") || e.message.includes("CORS")) {
        errorMessage =
          "Connection error: Unable to reach the server. Please check if the backend is running.";
      } else if (e.message.includes("fetch")) {
        errorMessage = "Network error: Please check your internet connection.";
      }

      setError(errorMessage);
      announceToScreenReader(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // Keyboard event handlers
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Screen Reader Status */}
      <div
        ref={statusRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      {/* Main Card */}
      <div className="bg-card border-4 border-card-border rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-xl font-bold text-primary mb-4">
            <Upload
              className="inline-block mr-3"
              size={32}
              aria-hidden="true"
            />
            Upload Image for Audio Description
          </h2>
          <p className="text-base text-secondary leading-relaxed">
            Select an image to get an AI-generated description converted to
            speech. Supported formats: JPG, PNG, GIF, WebP. Maximum size: 5MB.
          </p>
        </div>

        {/* Language Selection */}
        <div className="mb-8">
          <LanguageDropdown
            selectedLanguage={language}
            onLanguageChange={setLanguage}
            disabled={loading}
          />
        </div>

        {/* File Upload Area */}
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onKeyDown={handleKeyDown}
          onClick={() => fileInputRef.current?.click()}
          className="border-4 border-dashed border-card-border rounded-2xl p-12 mb-8 text-center cursor-pointer transition-all duration-300 hover:border-primary hover:bg-card focus-within:border-primary focus-within:bg-card large-click-target"
          role="button"
          tabIndex="0"
          aria-label="Click to select image file or drag and drop image here"
        >
          <div className="space-y-4">
            <Upload
              size={48}
              className="mx-auto text-primary"
              aria-hidden="true"
            />
            <p className="text-lg font-medium text-text">
              Click here to select an image or drag and drop
            </p>
            <p className="text-base text-secondary">
              Supported: JPG, PNG, GIF, WebP (Max: 5MB)
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0])}
            className="sr-only"
            aria-describedby="file-upload-description"
          />
          <p id="file-upload-description" className="sr-only">
            Select an image file to upload. Supported formats are JPEG, PNG,
            GIF, and WebP. Maximum file size is 5MB.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div
            className="bg-error text-white p-4 rounded-lg mb-6 border-2 border-error"
            role="alert"
            aria-live="assertive"
          >
            <p className="font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Image Preview */}
        {image && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-text mb-4">
              Selected Image:
            </h3>
            <div className="bg-background rounded-xl p-4 border-2 border-card-border">
              <img
                src={URL.createObjectURL(image)}
                alt="Selected image for processing"
                className={`max-h-80 w-auto mx-auto rounded-lg ${
                  loading ? "opacity-50" : ""
                }`}
                onLoad={() =>
                  announceToScreenReader(`Image loaded: ${image.name}`)
                }
              />
              <p className="text-center text-secondary mt-2">
                <strong>File:</strong> {image.name} (
                {(image.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {loading && (
          <div
            className="mb-6"
            role="progressbar"
            aria-valuenow={uploadProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-text">
                Processing Progress
              </span>
              <span className="text-sm text-secondary">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-card-border rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleUpload}
            disabled={loading || !image}
            className={`
              flex-1 flex items-center justify-center gap-3 py-4 px-6 font-bold text-lg rounded-xl large-click-target
              focus:outline-none focus:ring-4 focus:ring-focus transition-all duration-300
              ${
                loading || !image
                  ? "btn-disabled border-2"
                  : "bg-button text-button-text hover:bg-button-hover active:scale-95 border-2 border-button"
              }
            `}
            aria-describedby="generate-button-desc"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current" />
                Processing...
              </>
            ) : (
              <>
                <Volume2 size={24} />
                Generate Audio Description
              </>
            )}
          </button>
          <p id="generate-button-desc" className="sr-only">
            Generate an AI description of your image and convert it to speech
          </p>

          {(image || caption) && (
            <button
              onClick={resetForm}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-4 px-6 bg-card text-text hover:bg-secondary border-2 border-card-border hover:border-secondary rounded-xl font-medium large-click-target focus:outline-none focus:ring-4 focus:ring-focus transition-all duration-300"
              aria-label="Reset form and start over"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          )}
        </div>

        {/* Results Section */}
        {caption && (
          <div className="border-4 border-card-border rounded-2xl p-6 bg-background">
            <h3 className="text-xl font-bold text-primary mb-4">
              Generated Description:
            </h3>

            {/* Caption Text */}
            <div className="bg-card p-6 rounded-xl mb-6 border-2 border-card-border">
              <p className="text-lg text-text leading-relaxed font-medium">
                "{caption}"
              </p>
            </div>

            {/* Audio Controls */}
            {audioUrl && (
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button
                  onClick={isPlaying ? pauseAudio : () => playAudio(audioUrl)}
                  disabled={isPlaying}
                  className="flex items-center gap-3 px-6 py-4 bg-button text-button-text hover:bg-button-hover rounded-xl font-bold large-click-target focus:outline-none focus:ring-4 focus:ring-focus transition-all duration-300"
                  aria-label={
                    isPlaying ? "Pause audio" : "Play audio description"
                  }
                >
                  {isPlaying ? (
                    <>
                      <Pause size={24} />
                      Playing Audio...
                    </>
                  ) : (
                    <>
                      <Play size={24} />
                      Play Audio
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-3 px-6 py-4 bg-card text-text hover:bg-button hover:text-button-text border-2 border-card-border hover:border-button rounded-xl font-medium large-click-target focus:outline-none focus:ring-4 focus:ring-focus transition-all duration-300"
                  aria-label="Download audio file"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      Download Audio
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
