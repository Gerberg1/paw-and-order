const apiKey = 'live_yPliWwLND5fesohygU4ppZCGQoINZ3C62UYs9ZvYymHBMejs45k2JPIxEngHiiQd';
const apiUrl = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';
const outputElement = document.getElementById('output');
const url = document.getElementById('url');

const requestOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
    },
};

fetch(apiUrl, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        outputElement.textContent = JSON.stringify(data, null, 1);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function getElementId() {

}




