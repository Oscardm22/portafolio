// Manejo global de errores
window.addEventListener('error', function(e) {
    console.log('Error capturado:', e.error);
    return true;
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', function(e) {
    console.log('Promesa rechazada:', e.reason);
    e.preventDefault();
});

// Scroll suave mejorado con offset para el header fijo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = 80; // Altura aproximada del header
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Barra de progreso del scroll
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
    
    // Mostrar/ocultar botón volver arriba
    const backToTop = document.getElementById('backToTop');
    if (winScroll > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Botón volver arriba
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animación de revelado para las secciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todas las secciones con clase section-reveal
document.querySelectorAll('.section-reveal').forEach(section => {
    observer.observe(section);
});

// Datos de imágenes para cada proyecto
const projectImages = {
    inventario: {
        title: 'App de Gestión de Inventario',
        type: 'mobile',
        images: [
            'images/app_inventario.jpeg',
            'images/app_inventario_prodcto.jpg',
            'images/app_inventario_venta.jpg'
        ]
    },
    asistencia: {
        title: 'Sistema de Asistencia QR',
        type: 'mobile',
        images: [
            'images/app_asistencia.jpg',
            'images/app_asistencia_asistencias.jpg',
            'images/app_asistencia_escaner.jpg'
        ]
    },
    futbol: {
        title: 'Estadísticas Deportivas',
        type: 'mobile',
        images: [
            'images/fragment_estadisticas.jpg',
            'images/fragment_jugadores.jpg',
            'images/fragment_partidos.jpg'
        ]
    },
    guardias: {
        title: 'Gestión de Guardias Hospitalarias',
        type: 'web',
        images: [
            'images/home.jpg',
            'images/detalle_guardia.jpg',
            'images/detalle_novedad.jpg'
        ]
    },
    estuguia: {
        title: 'EstuGuía - Gestor de Horarios Académicos',
        type: 'mobile',
        images: [
            'images/horario_inicio.jpg',
            'images/horario_clases.jpg',
            'images/horario_tareas.jpg',
        ]
    }
};

// Funcionalidad del modal de imágenes
const imageModal = document.getElementById('imageModal');
const modalTitle = document.getElementById('modalTitle');
const modalImages = document.getElementById('modalImages');
const closeModal = document.getElementById('closeModal');

// Función para mostrar imágenes del proyecto (debe ser global)
window.showProjectImages = function(projectId) {
    const project = projectImages[projectId];
    if (!project) return;

    // Actualizar título del modal
    modalTitle.textContent = project.title;

    // Limpiar imágenes anteriores
    modalImages.innerHTML = '';

    // Agregar nuevas imágenes
    project.images.forEach((imageSrc, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'relative flex justify-center';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${project.title} - Imagen ${index + 1}`;
        
        // Aplicar clase según el tipo de proyecto
        if (project.type === 'mobile') {
            img.className = 'mobile-image';
        } else {
            img.className = 'web-image';
        }
        
        img.onerror = function() {
            // Si la imagen no existe, mostrar placeholder
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = `
                <i class="fas fa-image"></i>
                <div>Imagen ${index + 1} no disponible</div>
                <div class="text-xs mt-2">${project.title}</div>
            `;
            imgContainer.appendChild(placeholder);
        };
        
        // Agregar indicador si hay más de 3 imágenes
        if (project.images.length > 3 && index === 2) {
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.textContent = `+${project.images.length - 3} más`;
            imgContainer.appendChild(indicator);
        }
        
        imgContainer.appendChild(img);
        modalImages.appendChild(imgContainer);
    });

    // Mostrar modal
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

// Cerrar modal
closeModal.addEventListener('click', closeImageModal);
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeImageModal();
    }
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        closeImageModal();
    }
});

function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = ''; // Restaurar scroll del body
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portafolio cargado correctamente');
});