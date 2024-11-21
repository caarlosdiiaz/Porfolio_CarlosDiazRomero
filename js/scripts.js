// Modo odcuro
// Creamos 3 variables para almacenar estados de los elementos
const toggleTheme = document.getElementById("toggle-theme")
const toggleIcon = document.getElementById("toggle-icon")
const toggleText = document.getElementById("toggle-text")

// Evento click para cambiar
toggleTheme.addEventListener("click", () =>{
    // Toggle hace que cambie de tener la clase a quitarsela
    document.body.classList.toggle("dark")
    // Si está la luna
    if(toggleIcon.src.includes("moon.svg")){
        // La cambiamos al sol
        toggleIcon.src="assets/icons/sun.svg"
        // En el texto ponemos light mode
        toggleText.textContent = "Light mode"
    }else{
        // Si está el sol ponemos la luna
        toggleIcon.src="assets/icons/moon.svg"
        // Cambiamos en el texto y ponemos Dark mode
        toggleText.textContent = "Dark mode"
    }
})

// Escuchamos el div de toggle-colors
const toggleColors = document.getElementById("toggle-colors");

const rootStyles = document.documentElement.style;
// Creamos un listener para toggle-colors
toggleColors.addEventListener("click", (e) => {
    rootStyles.setProperty('--primary-color', e.target.dataset.color)
})

// Verificar si ya hay un idioma guardado en localStorage
let language = localStorage.getItem('language');

// Si no hay un idioma guardado, asignamos "es" como idioma por defecto
if (!language) {
    language = 'es';
    localStorage.setItem('language', language);  // Guardamos "es" en localStorage
}

// Función para cambiar el idioma
const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const text = await requestJson.json();

    // Buscar todos los elementos que necesitan ser cambiados
    const textsToChange = document.querySelectorAll("[data-section]");
    for (const textElement of textsToChange) {
        const section = textElement.dataset.section;  // Se obtiene la sección del dataset
        const value = textElement.dataset.value;      // Se obtiene el valor del dataset
        textElement.innerHTML = text[section][value];  // Asigna el texto traducido
    }

    // Guardar el idioma seleccionado en localStorage
    localStorage.setItem('language', language);
};

// Cargar el idioma por defecto al inicio
changeLanguage(language);

// Escuchar el click en las banderas para cambiar el idioma
const flagsElement = document.getElementById("flags");
flagsElement.addEventListener("click", (e) => {
    const selectedLanguage = e.target.parentElement.dataset.language;
    if (selectedLanguage) {
        changeLanguage(selectedLanguage);
    }
});