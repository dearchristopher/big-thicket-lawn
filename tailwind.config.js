/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'bauhaus': ['Orbitron', 'Impact', 'Arial Black', 'sans-serif'],
                'futura': ['Roboto Condensed', 'sans-serif'],
                'sans': ['Roboto Condensed', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
