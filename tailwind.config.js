/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
            primary: "#FFCA7B",
            secondary: "#FF7251",
            neutral: "#FFEDBF",
            dark: "#9B2948",
            support: "#F7B8A3"
        }
    }
    },
    plugins: [],
}

export default config