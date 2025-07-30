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
                'futura': ['Futura PT', 'Futura', 'Century Gothic', 'sans-serif'],
                'sans': ['Futura PT', 'Futura', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
