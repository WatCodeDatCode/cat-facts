const catFact = document.getElementById("cat-fact");
const showNewFact = document.getElementById("new-fact");
const catPicture = document.getElementById("cat-picture");

const catAPI = () => {
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

const randomCatPicture = () => {
  fetch("https://api.thecatapi.com/v1/images/search")
    .then((response) => response.json())
    .then((json) => {
      const picture = json[0].url;
      catPicture.setAttribute("src", picture);
    });
};


showNewFact.addEventListener("click", () => {
  catAPI();
  randomCatPicture();
});

randomCatPicture();
catAPI();
