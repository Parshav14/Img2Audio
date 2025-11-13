"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { Moon, Sun, Menu, X, Contrast } from "lucide-react";
import { useContext, useState, useRef, useEffect } from "react";
import { ThemeContext } from "../pages/_app";

export default function Layout({ children }) {
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState("normal");
  const [textSize, setTextSize] = useState("large");
  const skipLinkRef = useRef(null);

  // Load text size from localStorage on component mount
  useEffect(() => {
    const savedTextSize = localStorage.getItem("textSize") || "large";
    setTextSize(savedTextSize);
  }, []);

  // Cycle through text sizes: normal → large → extra-large → normal
  const cycleTextSize = () => {
    let nextSize;
    switch (textSize) {
      case "normal":
        nextSize = "large";
        break;
      case "large":
        nextSize = "extra-large";
        break;
      case "extra-large":
        nextSize = "normal";
        break;
      default:
        nextSize = "large";
    }
    setTextSize(nextSize);
    localStorage.setItem("textSize", nextSize);
  };

  // Get display info for current text size
  const getTextSizeInfo = () => {
    switch (textSize) {
      case "normal":
        return { label: "Normal", icon: "Aa", description: "Normal text size" };
      case "large":
        return { label: "Large", icon: "T", description: "Large text size" };
      case "extra-large":
        return {
          label: "XL",
          icon: "XL",
          description: "Extra large text size",
        };
      default:
        return { label: "Large", icon: "T", description: "Large text size" };
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + 1: Skip to main content
      if (e.altKey && e.key === "1") {
        e.preventDefault();
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView();
        }
      }
      // Alt + 2: Skip to navigation
      if (e.altKey && e.key === "2") {
        e.preventDefault();
        const nav = document.getElementById("main-navigation");
        if (nav) {
          nav.focus();
          nav.scrollIntoView();
        }
      }
      // Escape to close mobile menu
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Apply accessibility modes
  useEffect(() => {
    const body = document.body;
    // Remove existing classes
    body.classList.remove("high-contrast", "large-text", "extra-large-text");

    // Apply accessibility mode
    if (accessibilityMode === "high-contrast") {
      body.classList.add("high-contrast");
    }

    // Apply text size
    if (textSize === "large") {
      body.classList.add("large-text");
    } else if (textSize === "extra-large") {
      body.classList.add("extra-large-text");
    }
  }, [accessibilityMode, textSize]);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Skip Links for Screen Readers */}
      <div className="sr-only">
        <a href="#main-content" className="skip-link">
          Skip to main content (Alt + 1)
        </a>
        <a href="#main-navigation" className="skip-link">
          Skip to navigation (Alt + 2)
        </a>
      </div>

      {/* Accessible Header */}
      <header
        role="banner"
        className="bg-background border-b-4 border-card-border p-6"
      >
        {/* Main Navigation */}
        <nav
          id="main-navigation"
          role="navigation"
          aria-label="Main navigation"
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
        >
          {/* Logo and Title */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl lg:text-xl font-bold text-primary focus:outline-none focus:ring-4 focus:ring-focus rounded-lg p-2"
              aria-label="Vision2VoiceAI - Go to home page"
            >
              <h1 className="inline">
                Vision2VoiceAI
                <span className="text-accent ml-2" aria-hidden="true">
                  🔊
                </span>
              </h1>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden large-click-target bg-card border-2 border-card-border rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-focus"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLinkList currentPath={router.pathname} />
            <AccessibilityControls
              theme={theme}
              toggleTheme={toggleTheme}
              accessibilityMode={accessibilityMode}
              setAccessibilityMode={setAccessibilityMode}
              textSize={textSize}
              cycleTextSize={cycleTextSize}
              getTextSizeInfo={getTextSizeInfo}
            />
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`lg:hidden ${
              isMenuOpen ? "block" : "hidden"
            } mt-6 space-y-4`}
            aria-hidden={!isMenuOpen}
          >
            <NavLinkList currentPath={router.pathname} mobile={true} />
            <div className="border-t-2 border-card-border pt-4">
              <AccessibilityControls
                theme={theme}
                toggleTheme={toggleTheme}
                accessibilityMode={accessibilityMode}
                setAccessibilityMode={setAccessibilityMode}
                textSize={textSize}
                cycleTextSize={cycleTextSize}
                getTextSizeInfo={getTextSizeInfo}
                mobile={true}
              />
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main
        id="main-content"
        role="main"
        className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto w-full"
        tabIndex="-1"
      >
        {children}
      </main>

      {/* Accessible Footer */}
      <footer
        role="contentinfo"
        className="bg-card border-t-4 border-card-border p-6 text-center"
      >
        <p className="text-secondary">
          <span className="font-semibold">Vision2VoiceAI</span> - Accessible AI
          for Visual Interpretation and Audio Narration
        </p>
        <p className="text-secondary mt-2 text-sm">
          Press Alt + 1 for main content, Alt + 2 for navigation
        </p>
      </footer>
    </div>
  );
}

// Navigation Links Component
function NavLinkList({ currentPath, mobile = false }) {
  const links = [
    { href: "/", label: "Home", description: "Upload and process images" },
    {
      href: "/about",
      label: "About",
      description: "Learn about Vision2VoiceAI",
    },
    {
      href: "/history",
      label: "History",
      description: "View processed images history",
    },
  ];

  return (
    <ul
      className={`${
        mobile ? "flex flex-col space-y-3" : "flex items-center space-x-6"
      }`}
      role="list"
    >
      {links.map((link) => (
        <li key={link.href} role="listitem">
          <Link
            href={link.href}
            className={`
              inline-block px-4 py-3 rounded-lg font-medium large-click-target
              focus:outline-none focus:ring-4 focus:ring-focus
              transition-colors duration-200
              ${
                currentPath === link.href
                  ? "bg-primary text-button-text font-bold border-2 border-primary"
                  : "text-text hover:bg-card hover:text-primary border-2 border-transparent"
              }
            `}
            aria-current={currentPath === link.href ? "page" : undefined}
            aria-describedby={`${link.href.slice(1)}-desc`}
          >
            {link.label}
            <span id={`${link.href.slice(1)}-desc`} className="sr-only">
              {link.description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Accessibility Controls Component
function AccessibilityControls({
  theme,
  toggleTheme,
  accessibilityMode,
  setAccessibilityMode,
  textSize,
  cycleTextSize,
  getTextSizeInfo,
  mobile = false,
}) {
  return (
    <div
      className={`${
        mobile ? "flex flex-col space-y-3" : "flex items-center space-x-4"
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-3 bg-button text-button-text hover:bg-button-hover rounded-lg font-medium large-click-target focus:outline-none focus:ring-4 focus:ring-focus transition-colors duration-200"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
      </button>

      {/* High Contrast Toggle */}
      <button
        onClick={() =>
          setAccessibilityMode(
            accessibilityMode === "high-contrast" ? "normal" : "high-contrast"
          )
        }
        className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium large-click-target focus:outline-none focus:ring-4 focus:ring-focus transition-colors duration-200 ${
          accessibilityMode === "high-contrast"
            ? "bg-accent text-button-text"
            : "bg-card text-text hover:bg-button hover:text-button-text border-2 border-card-border"
        }`}
        aria-label={`${
          accessibilityMode === "high-contrast" ? "Disable" : "Enable"
        } high contrast mode`}
        aria-pressed={accessibilityMode === "high-contrast"}
      >
        <Contrast size={20} />
        <span>High Contrast</span>
      </button>

      {/* Single Cycling Text Size Button */}
      <button
        onClick={cycleTextSize}
        className="flex items-center gap-2 px-4 py-3 bg-card text-text hover:bg-button hover:text-button-text border-2 border-card-border hover:border-button rounded-lg font-medium large-click-target focus:outline-none focus:ring-4 focus:ring-focus transition-colors duration-200"
        aria-label={`Current text size: ${
          getTextSizeInfo().description
        }. Click to cycle to next size.`}
        title={`Text Size: ${getTextSizeInfo().label} (Click to cycle)`}
      >
        <span className="font-bold text-sm">{getTextSizeInfo().icon}</span>
        <span className="text-sm">{getTextSizeInfo().label}</span>
      </button>
    </div>
  );
}
