// IDs for sections
const catFact = document.getElementById("cat-fact");
const showNewFact = document.getElementById("new-fact-button");
const catPicture = document.getElementById("cat-picture");
const showLoadingMessage = document.getElementById("loading-message");

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
  Promise.all([fetchCatImage(), fetchCatFact()]).then((values) => {
    const catImageUrl = values[0][0].url;
    const getCatFact = values[1].fact;

    getRandomCatPicture(catImageUrl);
    getRandomCatFact(getCatFact);
    showLoadingMessage.style = "display:none";
  });
};

// Function for adding new url from cat API to img src
const getRandomCatPicture = (url) => {
  catPicture.setAttribute("src", url);
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
