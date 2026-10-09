// Tailwind v4 runs as a PostCSS plugin; without this file Next.js serves globals.css unprocessed
// and every page renders without styles (tests and HTTP 200 still pass).
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
