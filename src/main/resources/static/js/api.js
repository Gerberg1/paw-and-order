// In api.js
function fetchAndDisplayImages() {
    // Change the limit to however many images you want to use
    const url = `https://api.thecatapi.com/v1/images/search?limit=20`;
    const api_key = "live_rZJSUjeVpQFx8cQOyxiOgiG5uSO1UaANUCJMVlcbrljlwDbe108jDrZEZoG8Py6O"; // Replace with your actual API key

    fetch(url, {
        headers: {
            'x-api-key': api_key
        }
    })
        .then((response) => response.json())
        .then((data) => {
            let imagesData = data;

            // Clear existing images
            document.getElementById('grid').innerHTML = '';

            imagesData.forEach(function(imageData) {
                let image = document.createElement('img');
                image.src = `${imageData.url}`;

                let gridCell = document.createElement('div');
                gridCell.classList.add('col', 'col-lg');
                gridCell.appendChild(image);

                document.getElementById('grid').appendChild(gridCell);
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}
