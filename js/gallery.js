// Galería
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.querySelector('.gallery-modal-image');
    const closeBtn = document.querySelector('.close-gallery-modal');
    let currentIndex = 0;
    
    // Función para abrir el modal
    function openModal(index) {
        const item = galleryItems[index];
        const img = item.querySelector('img');
        currentIndex = index;
        
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Función para navegar a la siguiente imagen
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    }
    
    // Función para navegar a la imagen anterior
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const img = galleryItems[currentIndex].querySelector('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    }
    
    // Event Listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(index);
        });
    });
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
    
    // Botones de navegación
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    
    if (prevButton) prevButton.addEventListener('click', prevImage);
    if (nextButton) nextButton.addEventListener('click', nextImage);
    
    // Prevenir que las imágenes se arrastren
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
});
