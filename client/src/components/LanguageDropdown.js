import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, Globe, Search } from "lucide-react";

const languages = [
  // Indian
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },

  // International
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "pt", name: "Portuguese", nativeName: "Português" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "zh-cn", name: "Chinese (Simplified)", nativeName: "简体中文" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
];

export default function LanguageDropdown({
  selectedLanguage,
  onLanguageChange,
  disabled = false,
  compact = false,
  showSearch = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]); // array of refs for scrolling into view

  // compute filtered list memoized
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.nativeName || "").toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [query]);

  // ensure itemRefs length matches filtered length
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, filtered.length);
  }, [filtered.length]);

  const selectedLang =
    languages.find((lang) => lang.code === selectedLanguage) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll focused index into view
  useEffect(() => {
    if (!isOpen || focusedIndex < 0) return;
    const el = itemRefs.current[focusedIndex];
    const container = listRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      if (elRect.top < contRect.top) {
        // scroll up
        container.scrollTop -= contRect.top - elRect.top + 8;
      } else if (elRect.bottom > contRect.bottom) {
        // scroll down
        container.scrollTop += elRect.bottom - contRect.bottom + 8;
      }
    }
  }, [focusedIndex, isOpen]);

  // keyboard navigation
  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
          setTimeout(() => {
            // focus search input if visible
            const search = dropdownRef.current?.querySelector(
              "input[type='search']"
            );
            if (search) search.focus();
          }, 0);
        } else if (focusedIndex >= 0) {
          handleSelect(filtered[focusedIndex].code);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < filtered.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(filtered.length - 1);
        } else {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filtered.length - 1
          );
        }
        break;
      case "Home":
        e.preventDefault();
        if (isOpen) setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        if (isOpen) setFocusedIndex(filtered.length - 1);
        break;
      default:
        break;
    }
  };

  const handleSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
    setFocusedIndex(-1);
    setQuery("");
    buttonRef.current?.focus();
    announceToSR(
      `Selected language: ${languages.find((l) => l.code === langCode)?.name}`
    );
  };

  const announceToSR = (message) => {
    const node = document.createElement("div");
    node.className = "sr-only";
    node.setAttribute("aria-live", "polite");
    node.textContent = message;
    document.body.appendChild(node);
    setTimeout(() => document.body.removeChild(node), 800);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label
        id="language-label"
        className={`block mb-2 font-bold ${
          compact ? "text-sm" : "text-lg"
        } text-text`}
      >
        <span className="inline-flex items-center gap-2">
          <Globe size={20} aria-hidden="true" />
          Select Language:
        </span>
      </label>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (!disabled) {
            setIsOpen((v) => !v);
            if (!isOpen) setFocusedIndex(0);
          }
        }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-labelledby="language-label"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          w-full text-left bg-input border-2 rounded-lg flex items-center justify-between
          ${compact ? "px-3 py-2 text-sm" : "px-4 py-3 text-base"}
          focus:outline-none focus:ring-4 focus:ring-focus transition
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-card cursor-pointer"
          }
        `}
      >
        <span className={`${compact ? "text-sm" : "text-base"} font-medium`}>
          {selectedLang.name}{" "}
          {selectedLang.nativeName ? `(${selectedLang.nativeName})` : ""}
        </span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <p id="language-description" className="sr-only">
        Select the language for caption translation and audio generation.
      </p>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          className={`absolute z-50 left-0 right-0 mt-2 bg-input border-2 rounded-lg shadow-lg`}
          role="dialog"
          aria-modal="false"
        >
          {/* optional search */}
          {showSearch && (
            <div className={`px-3 pt-3 ${compact ? "pb-2" : "pb-3"}`}>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={16} className="text-secondary" />
                </span>
                <input
                  type="search"
                  aria-label="Search languages"
                  placeholder="Search language (name / native name / code)..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setFocusedIndex(0);
                  }}
                  className={`
                    w-full ${
                      compact ? "py-2 text-sm" : "py-3 text-base"
                    } pl-10 pr-3 bg-input border border-input-border rounded-md focus:outline-none focus:ring-3 focus:ring-focus
                  `}
                />
              </div>
            </div>
          )}

          {/* scrollable list */}
          <div
            ref={listRef}
            role="listbox"
            aria-labelledby="language-label"
            tabIndex={-1}
            className={`max-h-56 overflow-y-auto ${
              compact ? "text-sm" : "text-base"
            } px-1 py-1`}
          >
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-secondary">No results</div>
            ) : (
              filtered.map((language, idx) => (
                <div
                  key={language.code}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  role="option"
                  aria-selected={selectedLanguage === language.code}
                  tabIndex={-1}
                  onClick={() => handleSelect(language.code)}
                  onMouseEnter={() => setFocusedIndex(idx)}
                  className={`
                    cursor-pointer flex items-center justify-between w-full px-3 py-2 rounded-md
                    ${
                      focusedIndex === idx
                        ? "bg-primary text-button-text font-semibold"
                        : "hover:bg-card"
                    }
                    ${
                      selectedLanguage === language.code
                        ? "border-l-4 border-primary"
                        : ""
                    }
                    ${compact ? "py-2 text-sm" : "py-3 text-base"}
                  `}
                >
                  <div>
                    <div className="font-medium">{language.name}</div>
                    <div className="text-xs text-secondary">
                      {language.nativeName} • {language.code}
                    </div>
                  </div>
                  {selectedLanguage === language.code && (
                    <div aria-hidden className="font-bold text-primary">
                      ✓
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SR status */}
      <div className="sr-only" aria-live="polite">
        {isOpen
          ? `Language list opened. ${filtered.length} matching items.`
          : ""}
      </div>
    </div>
  );
}
