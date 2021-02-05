// IDs for sections
const catFact = document.getElementById("cat-fact");
const showNewFact = document.getElementById("new-fact-button");
const showLoadingMessage = document.getElementById("loading-message");
const catPictureContainer = document.getElementById("cat-picture-container");

// Functions for changing button
const disableButton = () => {
  showNewFact.innerHTML = "Playing fetch";
  showNewFact.disabled = true;
};

const enableButton = () => {
  showNewFact.innerHTML = "Show me another";
  showNewFact.disabled = false;
};

// Function to fetch cat image API
const fetchCatImage = () => {
  return fetch("https://api.thecatapi.com/v1/images/search").then((response) =>
    response.json()
  );
};

// Function to fetch cat fact API
const fetchCatFact = () => {
  return fetch("https://catfact.ninja/fact").then((response) =>
    response.json()
  );
};

// Function to wait for both cat APIs to finish and pass values through the other functions
const consumeCatApis = () => {
  catPictureContainer.innerHTML = `<p id="loading-message" class="font-bold text-4xl">Fetching...</p>`;
  disableButton();
  Promise.all([fetchCatImage(), fetchCatFact()]).then((values) => {
    const catImageUrl = values[0][0].url;
    const getCatFact = values[1].fact;

    getRandomCatPicture(catImageUrl);
    getRandomCatFact(getCatFact);
    enableButton();
  });
};

// Function for adding new url from cat API to img src
const getRandomCatPicture = (url) => {
  catPictureContainer.innerHTML = `<img id="cat-picture" class="mx-auto h-full" src=${url} />`;
};

// Function for displaying random cat fact from API
const getRandomCatFact = (fact) => {
  catFact.innerHTML = "";

  const element = document.createElement("p");
  element.classList.add("m-6", "text-lg");
  element.innerHTML = fact;

  catFact.appendChild(element);
};

// When button clicked, recall function for adding new cat pic and fact
showNewFact.addEventListener("click", () => {
  consumeCatApis();
});

consumeCatApis();
