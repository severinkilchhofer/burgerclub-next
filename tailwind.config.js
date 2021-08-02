module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            'display': ['Poppins', 'system-ui'],
            'body': ['Work Sans', 'system-ui'],
        },
        boxShadow: {
            'card': '0px 0px 20px 0px hsla(0, 0%, 90%, 1)'
        }
    }
}