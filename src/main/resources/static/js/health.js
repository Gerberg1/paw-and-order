// In your main JavaScript file (e.g., health.js)

async function getJoke(event) {
  event.preventDefault();

  const URL = `${SERVER_URL}health?about=${document.getElementById('about').value}`;
  const spinner = document.getElementById('spinner1');
  const result = document.getElementById('result');
  result.style.color = "black";

  try {
    spinner.style.display = "block";
    const response = await fetch(URL).then(handleHttpErrors);
    result.innerText = response.answer;

    // Fetch and display images
    fetchAndDisplayImages();
  } catch (e) {
    result.style.color = "red";
    result.innerText = e.message;
  } finally {
    spinner.style.display = "none";
  }
}

async function getJokeWithRateLimit(event) {
  event.preventDefault();

  const URL = `${SERVER_URL}jokelimited?about=${document.getElementById('about2').value}`;
  const result2 = document.getElementById('result2');
  const spinner2 = document.getElementById('spinner2');
  result2.style.color = "black";
  result2.innerText = "";

  try {
    spinner2.style.display = "block";
    const response = await fetch(URL).then(handleHttpErrors);
    result2.innerText = response.answer;

    // Fetch and display images
    fetchAndDisplayImages();
  } catch (e) {
    result2.style.color = "red";
    result2.innerText = e.message;
  } finally {
    spinner2.style.display = "none";
  }
}

async function getInfo(event) {
  event.preventDefault();

  const URL = `${SERVER_URL}owninfo?question=${document.getElementById('the-question').value}`;
  const spinner = document.getElementById('spinner3');
  const result3 = document.getElementById('result3');
  result3.innerText = "";
  result3.style.color = "black";

  try {
    spinner.style.display = "block";
    const reply = await fetch(URL).then(handleHttpErrors);
    result3.innerHTML = convertToLink(reply.answer);

    // Fetch and display images
    fetchAndDisplayImages();
  } catch (e) {
    result3.style.color = "red";
    result3.innerText = e.message;
  } finally {
    spinner.style.display = "none";
  }
}
