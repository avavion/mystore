// Настройки сайта
const settings = {
  // Объект: настройки для сайта
  settings: {
    language: "RUS",
    valute: "RUB",
    // Возможно они будут дополняться
  },
  // Функция: сохранение настроек
  save(settings) {
    return localStorage.setItem("settings", JSON.stringify(settings));
  },
  // Функция: загрузка настроек
  load(settings = this.settings) {
    // Делаем проверку на установленные настройки для сайта
    if (localStorage.getItem("settings") == null) {
      return this.save(settings);
    } else {
      return JSON.parse(localStorage.getItem("settings"));
    }
  },
};

// Продукты
const products = {
  get() {},
};

const language = {
  // Функция: выбираем язык из хранилища
  load(switchSelectors) {
    const selects = document.querySelectorAll(switchSelectors);
    selects.forEach((select) => {
      const options = select.querySelectorAll("option");
      options.forEach((option) => {
        const { language } = settings.load();
        if (option.value === language) {
          option.setAttribute("selected", "selected");
        }
      });
    });
  },
  // Функция: навешиваем событие изменения на все возможные селекты выбора языка, с дальнейшей перезаписью в локале
  change(switchSelectors) {
    const selects = document.querySelectorAll(switchSelectors);
    selects.forEach((select) => {
      select.addEventListener("change", () => {
        const lang = select.options[select.options.selectedIndex].value;
        const valute = select.options[select.options.selectedIndex].getAttribute("data-valute");
        settings.save({ language: lang, valute: valute });
      });
    });
  },
};

// Загружаем настройки сайта
settings.load(settings.settings);

// Язык
language.load(".language-select");
language.change(".language-select");

const URL = "https://api.themoviedb.org/3/discover/movie";
const KEY = "4237669ebd35e8010beee2f55fd45546";
let pages = 1;

const getData = () => {
  fetch(`${URL}?api_key=${KEY}&language=ru-RU&sort_by=popularity.desc&page=${pages}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      const array = data.results;
      array.map((item) => {
        document.querySelector(".catalog-items").insertAdjacentHTML(
          "beforeend",
          `
          <li class="grid-item catalog-item">
            <div class="grid-item-image catalog-item-image">
              <img src="http://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}" alt="${item.title}">
            </div>
            <h1 class="grid-item__title catalog-item__title">${item.title}</h1>
          </li>
          `
        );
      });
    })
    .catch((error) => console.error(error));
};

document.querySelector(".load-data").addEventListener("click", () => {
  pages++;
  getData();
});

getData();
