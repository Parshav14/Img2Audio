/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        card: 'var(--color-card)',
        'card-border': 'var(--color-card-border)',
        input: 'var(--color-input)',
        'input-border': 'var(--color-input-border)',
        button: 'var(--color-button)',
        'button-text': 'var(--color-button-text)',
        'button-hover': 'var(--color-button-hover)',
        focus: 'var(--color-focus)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        'disabled-bg': 'var(--color-disabled-bg)',
        'disabled-text': 'var(--color-disabled-text)',
        'disabled-border': 'var(--color-disabled-border)',
      },
      fontSize: {
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      }
    },
  },
  plugins: [],
}