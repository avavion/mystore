// let SETTINGS;

// if (localStorage.getItem("settings") == null) {
//   localStorage.setItem(
//     "settings",
//     JSON.stringify({
//       language: "ru",
//       valute: "dol",
//     })
//   );
// } else {
//   SETTINGS = JSON.parse(localStorage.getItem("settings"));
// }

// const catalog = document.querySelector(".catalog-items");

// fetch("database/products.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const products = data.products;
//     products.map((item) => {
//       let image = item.image_path;
//       if (image == "") {
//         image = "https://via.placeholder.com/300x300.png";
//       }
//       catalog.insertAdjacentHTML(
//         "beforeend",
//         `<li class="grid-item catalog-item">
//               <div class="grid-item-image catalog-item-image">
//                   <img src="${image}" alt="${item.name.en}" />
//               </div>
//               <h1 class="grid-item__title catalog-item__title">${item.name[SETTINGS.language]}</h1>
//               <p class="grid-item__text catalog-item__price">Стоимость: ${item.cost[SETTINGS.valute]}${item.symbol[SETTINGS.valute]}</p>
//           </li>`
//       );
//     });
//   });

const settings = {
  settings: {
    language: "RUS",
    valute: "RUB",
  },
  save: (settings) => {
    return localStorage.setItem("settings", JSON.stringify(settings));
  },
  load: (settings = this.settings) => {
    if (localStorage.getItem("settings") == null) {
      return this.save(settings);
    } else {
      return JSON.parse(localStorage.getItem("settings"));
    }
  },
};

const products = {};

settings.load(settings.settings);

const language = document.querySelector("#language");
const options = language.querySelectorAll(".language-select__option");

options.forEach((option) => {
  const { language } = settings.load();
  if (option.value === language) {
    option.setAttribute("selected", "selected");
  }
});

language.addEventListener("change", () => {
  const lang = language.options[language.options.selectedIndex].value,
    valute = language.options[language.options.selectedIndex].getAttribute(
      "data-valute"
    );
  settings.save({ language: lang, valute: valute });
});
