const apiUrl = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';
const apiKey = 'live_yPliWwLND5fesohygU4ppZCGQoINZ3C62UYs9ZvYymHBMejs45k2JPIxEngHiiQd';
const billedeContainer = document.getElementById('billedeContainer');

// Tilføj API-nøglen som header
fetch(apiUrl, {
    headers: {
        'x-api-key': apiKey
    }
})
    .then(response => response.json())
    .then(data => {
        // Kontroller om data indeholder billeder
        if (data.length > 0) {
            const imageUrl = data[0].url; // Brug data[0].url for at få URL'en
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = "Random dog image";
            img.classList.add("img-fluid"); // Bootstrap-klasse for responsivt billede
            billedeContainer.appendChild(img);
        } else {
            console.log('Ingen billeder fundet');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
