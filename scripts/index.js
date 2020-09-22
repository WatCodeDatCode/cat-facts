// IDs for sections
const catFact = document.getElementById("cat-fact");
const showNewFact = document.getElementById("new-fact-button");
const catPicture = document.getElementById("cat-picture");
const showLoadingMessage = document.getElementById("loading-message");

// Function for consuming cat picture API and setting new src URL
const randomCatPicture = () => {
  fetch("https://api.thecatapi.com/v1/images/search")
    .then((response) => response.json())
    .then((json) => {
      const picture = json[0].url;
      catPicture.setAttribute("src", picture);
      showLoadingMessage.style = "display:none";
    });
};

// Function for displaying random cat fact from API
const randomCatFact = () => {
  fetch(`https://catfact.ninja/fact`)
    .then((response) => response.json())
    .then((json) => {
      const randomFact = json.fact;

      catFact.innerHTML = "";

      const element = document.createElement("p");
      element.classList.add("m-6", "text-lg");
      element.innerHTML = randomFact;

      catFact.appendChild(element);
    });
};

// When button clicked, recall functions for cat picture and cat fact
showNewFact.addEventListener("click", () => {
  randomCatPicture();
  randomCatFact();
});

randomCatPicture();
randomCatFact();
