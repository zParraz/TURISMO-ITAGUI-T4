// search.js - Barra de búsqueda funcional para todo el sitio
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de búsqueda para cada página
    const searchConfig = {
        'index.html': {
            elements: '.noticia, .categoria',
            textSelectors: 'h3, p, .fw-bold'
        },
        'gastronomia.html': {
            elements: '.card, .card-title, .card-text',
            textSelectors: 'h5, p'
        },
        'culturayarte.html': {
            elements: '.card, h3, p',
            textSelectors: 'h3, p, .fs-5'
        },
        'naturaleza.html': {
            elements: '.card, h3, p',
            textSelectors: 'h3, p, .fs-5'
        },
        'sitiosarte.html': {
            elements: '.section-card, h2, p',
            textSelectors: 'h2, p'
        },
        'naturaleza_sitios.html': {
            elements: '.section-card, h2, p',
            textSelectors: 'h2, p'
        },
        'naturaleza_actividades.html': {
            elements: '.section-card, h2, p',
            textSelectors: 'h2, p'
        },
        'festividades.html': {
            elements: '.section-card, h2, p',
            textSelectors: 'h2, p'
        },
        'restaurantes.html': {
            elements: '.card, h4, p',
            textSelectors: 'h4, p, strong'
        },
        'distrito.html': {
            elements: 'h2, p, .fs-5',
            textSelectors: 'h2, p'
        },
        'bpaisareceta.html': {
            elements: 'h3, h5, li, p',
            textSelectors: 'h3, h5, li'
        },
        'tamales.html': {
            elements: 'h3, h5, li, p',
            textSelectors: 'h3, h5, li'
        },
        'sancocho.html': {
            elements: 'h3, h5, li, p',
            textSelectors: 'h3, h5, li'
        },
        'arepaas.html': {
            elements: 'h3, h5, li, p',
            textSelectors: 'h3, h5, li'
        },
        'alojamiento.html': {
            elements: '.hotel-card, h5',
            textSelectors: 'h5'
        }
    };

    // Obtener el nombre del archivo actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const config = searchConfig[currentPage] || {
        elements: 'h1, h2, h3, h4, h5, h6, p, li, .card, .section-card',
        textSelectors: 'h1, h2, h3, h4, h5, h6, p, li'
    };

    // Inicializar barra de búsqueda
    initSearchBar(config);
});

function initSearchBar(config) {
    const searchBar = document.getElementById('busqueda');
    if (!searchBar) return;

    // Asegurar que el HTML de la barra de búsqueda sea consistente
    const input = searchBar.querySelector('input');
    const button = searchBar.querySelector('button');
    
    if (input && !input.id) input.id = 'searchInput';
    if (button && !button.id) button.id = 'searchButton';
    if (button && !button.type) button.type = 'button';

    // Agregar eventos
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (!searchInput || !searchButton) return;

    // Función para realizar la búsqueda
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            // Si no hay término, mostrar todo
            document.querySelectorAll('.search-result').forEach(el => {
                el.classList.remove('d-none');
            });
            return;
        }

        // Buscar en elementos configurados
        const elements = document.querySelectorAll(config.elements);
        let foundResults = false;

        elements.forEach(element => {
            const text = element.textContent.toLowerCase();
            const elementToHide = element.closest('.card, .section-card, .hotel-card, .noticia') || element;
            
            if (text.includes(searchTerm)) {
                elementToHide.classList.remove('d-none');
                elementToHide.classList.add('search-highlight');
                foundResults = true;
            } else {
                elementToHide.classList.add('d-none');
                elementToHide.classList.remove('search-highlight');
            }
        });

        // Mostrar mensaje si no hay resultados
        showNoResultsMessage(foundResults);
    }

    // Event listeners
    searchInput.addEventListener('input', function() {
        // Búsqueda en tiempo real con debounce
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(performSearch, 300);
    });

    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function showNoResultsMessage(hasResults) {
    let message = document.getElementById('no-results-message');
    
    if (!hasResults) {
        if (!message) {
            message = document.createElement('div');
            message.id = 'no-results-message';
            message.className = 'alert alert-info mt-3 text-center';
            message.innerHTML = `
                <i class="bi bi-info-circle me-2"></i>
                No se encontraron resultados para tu búsqueda. 
                Intenta con términos más generales.
            `;
            
            const searchBar = document.getElementById('busqueda');
            searchBar.parentNode.insertBefore(message, searchBar.nextSibling);
        }
    } else if (message) {
        message.remove();
    }
}

// Estilos para resaltar resultados
const style = document.createElement('style');
style.textContent = `
    .search-highlight {
        animation: highlight 1.5s ease;
        border: 2px solid rgba(0, 120, 220, 0.5) !important;
        box-shadow: 0 0 10px rgba(0, 120, 220, 0.3) !important;
    }
    
    @keyframes highlight {
        0% { background-color: rgba(0, 120, 220, 0.1); }
        100% { background-color: transparent; }
    }
    
    #no-results-message {
        max-width: 500px;
        margin: 1rem auto;
        border-radius: 15px;
    }
`;
document.head.appendChild(style);