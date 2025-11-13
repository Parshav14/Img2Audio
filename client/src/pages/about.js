import {
  Heart,
  Eye,
  Headphones,
  Globe,
  Users,
  Zap,
  ArrowUp,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function About() {
  const [showScroll, setShowScroll] = useState(false);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    // Focus management for accessibility
    if (mainContentRef.current) {
      mainContentRef.current.focus();
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto py-8" ref={mainContentRef} tabIndex="-1">
      {/* Hero Section */}
      <section className="text-center mb-16" aria-labelledby="about-heading">
        <h1
          id="about-heading"
          className="text-2xl lg:text-xl font-bold text-primary mb-6"
        >
          <Heart className="inline-block mr-3" size={40} aria-hidden="true" />
          About Vision2VoiceAI - Accessible AI for Everyone
        </h1>
        <p className="text-lg text-secondary max-w-4xl mx-auto leading-relaxed italic">
          "Not every eye can see, but every mind deserves to understand the
          visual world around us."
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16" aria-labelledby="mission-heading">
        <div className="bg-card border-4 border-card-border rounded-2xl p-8">
          <h2
            id="mission-heading"
            className="text-2xl font-bold text-primary mb-6 flex items-center"
          >
            <Zap className="mr-3" size={32} aria-hidden="true" />
            Our Mission
          </h2>
          <p className="text-lg text-text leading-relaxed mb-6">
            Vision2VoiceAI bridges the accessibility gap by converting visual
            content into clear, natural-sounding audio descriptions. We believe
            that technology should serve everyone, especially those who are
            often overlooked by mainstream design.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <Eye
                size={40}
                className="mx-auto mb-4 text-primary"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-text mb-2">
                Visual Accessibility
              </h3>
              <p className="text-base text-secondary">
                Making visual content accessible to blind and low-vision users
                through AI-powered descriptions.
              </p>
            </div>
            <div className="text-center p-4">
              <Headphones
                size={40}
                className="mx-auto mb-4 text-primary"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-text mb-2">
                Audio Excellence
              </h3>
              <p className="text-base text-secondary">
                High-quality text-to-speech synthesis with natural-sounding
                voices and clear pronunciation.
              </p>
            </div>
            <div className="text-center p-4">
              <Globe
                size={40}
                className="mx-auto mb-4 text-primary"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-text mb-2">
                Multilingual Support
              </h3>
              <p className="text-base text-secondary">
                Breaking language barriers with support for English, Hindi,
                Bengali, and growing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16" aria-labelledby="how-it-works-heading">
        <div className="bg-background border-4 border-card-border rounded-2xl p-8">
          <h2
            id="how-it-works-heading"
            className="text-2xl font-bold text-primary mb-6"
          >
            How Vision2VoiceAI Works
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary text-button-text rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-text mb-2">
                  Advanced AI Vision
                </h3>
                <p className="text-base text-secondary leading-relaxed">
                  Our system uses the BLIP (Bootstrapping Language-Image
                  Pre-training) model to analyze and understand the content of
                  uploaded images with high accuracy.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary text-button-text rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-text mb-2">
                  Smart Translation
                </h3>
                <p className="text-base text-secondary leading-relaxed">
                  When needed, descriptions are automatically translated to your
                  preferred language using advanced language processing
                  technology.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary text-button-text rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-text mb-2">
                  Natural Speech Synthesis
                </h3>
                <p className="text-base text-secondary leading-relaxed">
                  Finally, the description is converted to clear,
                  natural-sounding speech that you can play immediately or
                  download for later use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="mb-16" aria-labelledby="target-users-heading">
        <div className="bg-card border-4 border-card-border rounded-2xl p-8">
          <h2
            id="target-users-heading"
            className="text-2xl font-bold text-primary mb-6 flex items-center"
          >
            <Users className="mr-3" size={32} aria-hidden="true" />
            Who Benefits from Vision2VoiceAI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-text mb-4">
                Primary Users
              </h3>
              <ul className="space-y-3 text-base text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Blind and visually impaired individuals seeking image
                    descriptions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Low-vision users who need audio assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Elderly users who prefer audio content</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    People with learning disabilities who benefit from
                    multi-modal content
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-text mb-4">
                Professional Use
              </h3>
              <ul className="space-y-3 text-base text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Accessibility researchers and consultants</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Educators creating inclusive learning materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Developers building accessible applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Content creators ensuring inclusive media</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Features Section */}
      <section className="mb-16" aria-labelledby="features-heading">
        <div className="bg-background border-4 border-card-border rounded-2xl p-8">
          <h2
            id="features-heading"
            className="text-2xl font-bold text-primary mb-6"
          >
            Accessibility Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-4 rounded-xl border-2 border-card-border">
              <h3 className="text-lg font-bold text-text mb-3">
                Screen Reader Compatible
              </h3>
              <p className="text-base text-secondary">
                Full ARIA support and semantic HTML for perfect screen reader
                compatibility.
              </p>
            </div>
            <div className="bg-card p-4 rounded-xl border-2 border-card-border">
              <h3 className="text-lg font-bold text-text mb-3">
                Keyboard Navigation
              </h3>
              <p className="text-base text-secondary">
                Complete keyboard accessibility with logical tab order and
                shortcuts.
              </p>
            </div>
            <div className="bg-card p-4 rounded-xl border-2 border-card-border">
              <h3 className="text-lg font-bold text-text mb-3">
                High Contrast Modes
              </h3>
              <p className="text-base text-secondary">
                Multiple high contrast themes for users with various visual
                needs.
              </p>
            </div>
            <div className="bg-card p-4 rounded-xl border-2 border-card-border">
              <h3 className="text-lg font-bold text-text mb-3">
                Large Text Options
              </h3>
              <p className="text-base text-secondary">
                Scalable text sizes from normal to extra-large for comfortable
                reading.
              </p>
            </div>
            <div className="bg-card p-4 rounded-xl border-2 border-card-border">
              <h3 className="text-lg font-bold text-text mb-3">
                Focus Indicators
              </h3>
              <p className="text-base text-secondary">
                Clear, high-visibility focus indicators for keyboard navigation.
              </p>
            </div>
            <div className="bg-card p-4 rounded-xl border-2 border-card-border">
              <h3 className="text-lg font-bold text-text mb-3">
                Audio Feedback
              </h3>
              <p className="text-base text-secondary">
                Screen reader announcements and audio descriptions throughout
                the interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="mb-16" aria-labelledby="tech-heading">
        <div className="bg-card border-4 border-card-border rounded-2xl p-8">
          <h2
            id="tech-heading"
            className="text-2xl font-bold text-primary mb-6"
          >
            Technical Implementation
          </h2>
          <div className="space-y-4 text-base text-secondary leading-relaxed">
            <p>
              <strong className="text-text">AI Vision Model:</strong> BLIP
              (Bootstrapping Language-Image Pre-training) for accurate image
              captioning with contextual understanding.
            </p>
            <p>
              <strong className="text-text">Text-to-Speech:</strong> Google
              Text-to-Speech (gTTS) for natural-sounding voice synthesis in
              multiple languages.
            </p>
            <p>
              <strong className="text-text">Translation:</strong>{" "}
              Deep-translator library powered by Google Translate for accurate
              multi-language support.
            </p>
            <p>
              <strong className="text-text">Frontend:</strong> Next.js with
              accessibility-first design principles, WCAG 2.1 AA compliance, and
              comprehensive ARIA implementation.
            </p>
            <p>
              <strong className="text-text">Backend:</strong> FastAPI with
              optimized processing pipeline and memory-efficient model loading
              for reliable performance.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-8" aria-labelledby="cta-heading">
        <div className="bg-primary text-button-text rounded-2xl p-8">
          <h2 id="cta-heading" className="text-2xl font-bold mb-4">
            Making the Visual World Audible
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join us in creating a more inclusive digital world where everyone
            can access visual content.
          </p>
          <a
            href="/"
            className="inline-block bg-button-text text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary hover:text-button-text transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-button-text"
            aria-label="Go to home page to start using Vision2VoiceAI"
          >
            Start Using Vision2VoiceAI
          </a>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 bg-button text-button-text rounded-full shadow-2xl hover:bg-button-hover focus:outline-none focus:ring-4 focus:ring-focus transition-all duration-300 z-50"
          aria-label="Scroll to top of page"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
