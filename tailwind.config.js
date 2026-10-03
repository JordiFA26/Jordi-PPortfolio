/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: { relative: true, files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'] },
  theme: {
    extend: {
      // Every color is a CSS variable so light/dark themes share one class set.
      // `white` is the foreground color (white in dark mode, navy in light mode);
      // use `snow` where text must stay white in both themes.
      colors: {
        primary: v('primary'),
        'primary-dark': v('primary-dark'),
        'primary-light': v('primary-light'),
        accent: v('accent'),
        'accent-dark': v('accent-dark'),
        background: v('bg'),
        surface: v('surface'),
        surface2: v('surface2'),
        ink: v('fg'),
        muted: v('muted'),
        divider: v('divider'),
        deep: v('deep'),
        onprimary: v('onprimary'),
        shade: v('shade'),
        white: v('fg'),
        snow: '#ffffff',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
