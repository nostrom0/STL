document.addEventListener("DOMContentLoaded", function() {
    loadImages('dragonball', 'images/dragonball', 10);
    loadImages('panel2', 'images/panel2', 0); // Ajusta el número de imágenes según lo necesario
    loadImages('panel3', 'images/panel3', 0); // Ajusta el número de imágenes según lo necesario
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
    var grid = document.getElementById(panelId + '-grid');

    for (let i = 1; i <= imageCount; i++) {
        let imageName = `DragonBall(${i})`;
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
