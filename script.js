document.addEventListener("DOMContentLoaded", function() {
    loadImages('dragonball', 'images/dragonball', 100);
    loadImages('starwars', 'images/StarWars', 3); // Ajusta el número de imágenes según lo necesario
    loadImages('panel3', 'images/panel3', 0); // Ajusta el número de imágenes según lo necesario

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
    var grid = document.getElementById(panelId + '-grid'); // Consistentes con los IDs en HTML

    for (let i = 1; i <= imageCount; i++) {
        let imageName = `${capitalizeFirstLetter(panelId)}(${i})`;
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
