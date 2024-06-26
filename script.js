document.addEventListener("DOMContentLoaded", function() {
    loadImages('DragonBall', 'images/DragonBall', 100);
    loadImages('StarWars', 'images/StarWars', 79); // Ajusta el número de imágenes según lo necesario
    loadImages('OnePiece', 'images/OnePiece', 80);
    loadImages('Games', 'images/Games', 105);

    // Cerrar la lightbox al hacer clic fuera de la imagen
    var lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
});

function togglePanel(panelId) {
    var panelContent = document.getElementById(panelId);
    panelContent.style.display = (panelContent.style.display === "block") ? "none" : "block";
}

function showImage(src, caption) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightbox-image');
    var lightboxCaption = document.getElementById('lightbox-caption');
    lightboxImage.src = src;
    lightboxCaption.textContent = caption;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

function loadImages(panelId, imagePath, imageCount) {
    var grid = document.getElementById(panelId.toLowerCase() + '-grid'); // Convertir a minúsculas

    for (let i = 1; i <= imageCount; i++) {
        let imageName = `${panelId}(${i})`;
        let imgPath = `${imagePath}/${imageName}.png`;

        let gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.setAttribute('onclick', `showImage('${imgPath}', '${imageName}')`);

        let img = document.createElement('img');
        img.src = imgPath;
        img.alt = imageName;

        let caption = document.createElement('p');
        caption.textContent = imageName;

        gridItem.appendChild(img);
        gridItem.appendChild(caption);

        grid.appendChild(gridItem);
    }
}
