import { useEffect, useRef } from "react";
import ImageUpload from "../components/ImageUpload";
import { Headphones, Eye, Users } from "lucide-react";

export default function Home() {
  const mainContentRef = useRef(null);

  // Focus management for accessibility
  useEffect(() => {
    // Set focus to main content when page loads
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={mainContentRef}
        className="text-center mb-12 focus:outline-none"
        tabIndex="-1"
        aria-labelledby="main-heading"
      >
        <h1
          id="main-heading"
          className="text-2xl lg:text-xl font-bold text-primary mb-6"
        >
          <Headphones
            className="inline-block mr-4"
            size={40}
            aria-hidden="true"
          />
          Vision2VoiceAI - Image to Audio Description
        </h1>

        <p className="text-lg text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
          Upload any image and get an instant AI-generated description converted
          to clear, natural-sounding speech. Designed for accessibility with
          support for multiple languages and high contrast viewing options.
        </p>

        {/* Accessibility Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-card border-4 border-card-border rounded-2xl p-6 text-center">
            <Eye
              size={32}
              className="mx-auto mb-4 text-primary"
              aria-hidden="true"
            />
            <h3 className="text-xl font-bold text-text mb-3">
              Visual Accessibility
            </h3>
            <p className="text-base text-secondary">
              High contrast themes, large text options, and screen reader
              support for low vision users.
            </p>
          </div>

          <div className="bg-card border-4 border-card-border rounded-2xl p-6 text-center">
            <Headphones
              size={32}
              className="mx-auto mb-4 text-primary"
              aria-hidden="true"
            />
            <h3 className="text-xl font-bold text-text mb-3">
              Audio Description
            </h3>
            <p className="text-base text-secondary">
              Clear, natural voice synthesis with playback controls and
              downloadable audio files.
            </p>
          </div>

          <div className="bg-card border-4 border-card-border rounded-2xl p-6 text-center">
            <Users
              size={32}
              className="mx-auto mb-4 text-primary"
              aria-hidden="true"
            />
            <h3 className="text-xl font-bold text-text mb-3">For Everyone</h3>
            <p className="text-base text-secondary">
              Simple interface designed for elderly users, with full keyboard
              navigation and voice guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Upload Section */}
      <section aria-labelledby="upload-heading" className="mb-12">
        <h2 id="upload-heading" className="sr-only">
          Image Upload and Processing
        </h2>
        <ImageUpload />
      </section>

      {/* Instructions Section */}
      <section
        aria-labelledby="instructions-heading"
        className="bg-card border-4 border-card-border rounded-2xl p-8 max-w-4xl mx-auto"
      >
        <h2
          id="instructions-heading"
          className="text-2xl font-bold text-primary mb-6 text-center"
        >
          How to Use Vision2VoiceAI
        </h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary text-button-text rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-text mb-2">
                Upload Your Image
              </h3>
              <p className="text-base text-secondary">
                Click the upload area or drag and drop any image file (JPG, PNG,
                GIF, WebP) up to 5MB. You can also use the Tab key to navigate
                to the upload button and press Enter to select a file.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary text-button-text rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-text mb-2">
                Choose Language
              </h3>
              <p className="text-base text-secondary">
                Select your preferred language for the audio description.
                Currently supports English, Hindi, and Bengali. Use arrow keys
                to navigate language options and Enter to select.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary text-button-text rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-text mb-2">
                Generate & Listen
              </h3>
              <p className="text-base text-secondary">
                Click "Generate Audio Description" and wait for the AI to
                process your image. The audio will automatically play when
                ready. You can replay or download the audio file.
              </p>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-8 pt-6 border-t-2 border-card-border">
          <h3 className="text-lg font-bold text-text mb-4">
            Keyboard Shortcuts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-text">Alt + 1</span>
              <span className="text-secondary">Skip to main content</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-text">Alt + 2</span>
              <span className="text-secondary">Skip to navigation</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-text">Tab</span>
              <span className="text-secondary">Navigate between elements</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-text">Enter/Space</span>
              <span className="text-secondary">Activate buttons and links</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-text">Arrow Keys</span>
              <span className="text-secondary">Navigate dropdown menus</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-text">Escape</span>
              <span className="text-secondary">Close dropdown menus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Statement */}
      <section
        aria-labelledby="accessibility-heading"
        className="mt-12 bg-background border-4 border-card-border rounded-2xl p-8 max-w-4xl mx-auto"
      >
        <h2
          id="accessibility-heading"
          className="text-xl font-bold text-primary mb-4"
        >
          Accessibility Commitment
        </h2>
        <p className="text-base text-secondary leading-relaxed">
          Vision2VoiceAI is designed with accessibility as a core principle. We
          follow WCAG 2.1 AA guidelines to ensure our application is usable by
          everyone, including people with visual impairments, motor
          disabilities, and elderly users. Features include screen reader
          compatibility, keyboard navigation, high contrast themes, and audio
          feedback throughout the interface.
        </p>
      </section>
    </div>
  );
}
