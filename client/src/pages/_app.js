import "../styles/globals.css";
import Layout from "../components/Layout";
import { createContext, useState, useEffect } from "react";
import Head from "next/head";

export const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);

    // Check for user's preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === "light" ? "dark" : "light"
    );
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function MyApp({ Component, pageProps, router }) {
  // Handle route changes for screen readers
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Announce page changes to screen readers
      const pageName =
        url === "/"
          ? "Home"
          : url.replace("/", "").charAt(0).toUpperCase() + url.slice(2);
      document.title = `${pageName} - Vision2VoiceAI`;

      // Announce to screen readers
      const announcement = document.createElement("div");
      announcement.textContent = `Navigated to ${pageName} page`;
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <ThemeProvider>
      <Head>
        <meta
          name="title"
          content="Vision2Voice AI | Multilingual Image-to-Speech AI Tool"
        />
        <meta
          name="description"
          content="An open-source AI-powered accessibility tool that converts images into multilingual spoken descriptions using deep learning-based image captioning and text-to-speech synthesis. Built to empower visually impaired users, it bridges the gap between visual content and human understanding. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="qfesxMY6zVrjb1fE3AACzlu9EIKl0FCpgm_CKHltfUg"
        />
        <title>Vision2Voice AI | Multilingual Image-to-Speech AI Tool</title>

        <link rel="icon" href="/favicons/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicons/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
