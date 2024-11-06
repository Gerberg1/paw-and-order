const SERVER_URL = 'http://localhost:8080/api/v1/';
const apiUrlDog = 'https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';
const apiUrlCat = 'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1';
const apiUrlFox = 'https://randomfox.ca/floof/'
const apiUrlDuck = 'https://random-d.uk/api/v2/random'
const apiKeyDog = 'live_yPliWwLND5fesohygU4ppZCGQoINZ3C62UYs9ZvYymHBMejs45k2JPIxEngHiiQd';
const apiKeyCat = 'live_rZJSUjeVpQFx8cQOyxiOgiG5uSO1UaANUCJMVlcbrljlwDbe108jDrZEZoG8Py6O';
const imageContainer = document.getElementById('imageContainer');

document.getElementById('form-question').addEventListener('submit', getQuestion);
document.getElementById('form-answer').addEventListener('submit', getInfo);

async function getQuestion(event) {
  // Prevent the form from reloading the page.
  event.preventDefault();

  const URL = `${SERVER_URL}health?about= + ${document.getElementById('about').value}`
  const spinner = document.getElementById('spinner1');
  const result = document.getElementById('result');
  let animal = document.getElementById('about').value
  result.style.color = "black";

  try {
    spinner.style.display = "block";
    const response = await fetch(URL).then(handleHttpErrors)
    document.getElementById('result').innerText = response.answer;

  } catch (e) {
    result.style.color = "red";
    result.innerText = e.message;
  }
  finally {
    spinner.style.display = "none";
  }
  checkAnimal(animal)
}

function checkAnimal(animal) {
  if (animal.includes("dog")){
    getAnimalsWithKey(apiUrlDog, apiKeyDog)
  }
  else if (animal.includes("cat")) {
    getAnimalsWithKey(apiUrlCat, apiKeyCat)
    getCatFact()}
  else if (animal.includes("fox")){
    getAnimalsNoKey(apiUrlFox)
  }
  else if (animal.includes("duck")){
    getAnimalsNoKey(apiUrlDuck)
  }
}
function getAnimalsWithKey(apiUrl, apiKey){
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
}

function getAnimalsNoKey(apiUrl) {
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Brug 'url' feltet i stedet for 'image' for at få billed-URL'en
        const imageUrl = data.url; // 'url' feltet indeholder andebilledet
        // Opret et img element og sæt src attributten
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Random Duck';
        img.style.maxWidth = '100%'; // Valgfrit: gør billedet responsivt
        // Ryd eksisterende indhold i billed-containeren
        imageContainer.innerHTML = '';
        // Tilføj img elementet til billed-containeren
        imageContainer.appendChild(img);
      })
      .catch(error => {
        console.error('Error fetching duck image:', error);
        imageContainer.innerHTML = '<p>Sorry, something went wrong.</p>';
      });
}


// Henter kattefaktumet og viser det i HTML
function getCatFact (){
  fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => {
        // Får fat i elementet i HTML med id 'cat-fact'
        const factElement = document.getElementById('cat-fact');

        // Indsætter kattefaktumet som tekst i elementet
        factElement.textContent = data.fact;
      })
      .catch(error => {
        console.error("Der opstod en fejl:", error);
      });
}



async function getInfo(event) {
  // Prevent the form from reloading the page.
  event.preventDefault();

  const URL = `${SERVER_URL}owninfo?question= + ${document.getElementById('the-question').value}`
  const spinner = document.getElementById('spinner3');
  const result3 = document.getElementById('result3');
  result3.innerText = ""
  result3.style.color = "black";
  try {
    spinner.style.display = "block";
    const reply = await fetch(URL).then(handleHttpErrors)
    document.getElementById('result3').innerHTML = convertToLink(reply.answer)
  } catch (e) {
    result3.style.color = "red";
    result3.innerText = e.message;
  } finally {
    spinner.style.display = "none";
  }

  function convertToLink(str) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return str.replace(urlRegex, function(match) {
      if (match.endsWith('.')) {
        match = match.slice(0, -1); // Remove the trailing dot
      }
      return `<a href="${match}" target="_blank">${match}</a>`;
    });
  }
}

async function handleHttpErrors(res) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const msg = errorResponse.message ? errorResponse.message : "No error details provided"
    throw new Error(msg)
  }
  return res.json()
}

