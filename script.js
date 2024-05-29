document.addEventListener("DOMContentLoaded", function() {
    // Cargar imágenes para cada panel
    loadImages("panel1", "panel1-grid");
    loadImages("panel2", "panel2-grid");
    loadImages("panel3", "panel3-grid");
});

function loadImages(panelName, gridId) {
    var grid = document.getElementById(gridId);

    // Obtener la ruta de la carpeta de imágenes del panel
    var folderPath = "images/" + panelName + "/";

    // Crear una solicitud para obtener el contenido de la carpeta
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Parsear la respuesta JSON
                var files = JSON.parse(xhr.responseText);
                // Iterar sobre los archivos y crear elementos de imagen
                files.forEach(function(file) {
                    var img = document.createElement("img");
                    img.src = folderPath + file;
                    img.alt = file;
                    img.onclick = function() {
                        showImage(folderPath + file, file);
                    };

                    var p = document.createElement("p");
                    p.textContent = file.replace(/\.[^/.]+$/, ""); // Eliminar la extensión del nombre del archivo

                    var div = document.createElement("div");
                    div.classList.add("grid-item");
                    div.appendChild(img);
                    div.appendChild(p);

                    grid.appendChild(div);
                });
            } else {
                console.error("Error al cargar las imágenes del panel " + panelName);
            }
        }
    };
    xhr.open("GET", folderPath);
    xhr.send();
}
