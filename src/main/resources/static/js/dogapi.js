const apiUrl = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';
const apiKey = 'live_yPliWwLND5fesohygU4ppZCGQoINZ3C62UYs9ZvYymHBMejs45k2JPIxEngHiiQd';
const imageContainer = document.getElementById('imageContainer');


fetch(apiUrl, {
    headers: {
        'x-api-key': apiKey
    }
})
    .then(response => response.json())
    .then(data => {

        if (data.length > 0) {
            const imageUrl = data[0].url;
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = "Random dog image";
            img.classList.add("img-fluid");
            imageContainer.appendChild(img);
        } else {
            console.log('No images found');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
