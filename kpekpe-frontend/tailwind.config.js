/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                kpekpe: {
                    green: "#006a4e",
                    yellow: "#fce100",
                    "green-light": "#008a66",
                    "yellow-dark": "#e5cc00",
                }
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
