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
  get() {
    const URL = `${location.protocol}//${location.host}`;
    const items = fetch(`${URL}/database/products.json`, {
      method: "GET",
      mode: "cors",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((productsData) => {
        return productsData.products;
      })
      .catch((error) => console.error(error));
    return items;
  },
  async render() {
    const data = await this.get();
    return data;
  },
};

// Язык
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
        location.reload();
      });
    });
  },
};

// Загружаем настройки сайта
settings.load(settings.settings);

// Получаем продукты из БД
(async () => {
  document.querySelector("#index-catalog").innerHTML = "<h1>Загрузка...</h1>";
  const indexProducts = await products.get();
  document.querySelector("#index-catalog").innerHTML = "";
  const lang = settings.load()["language"];
  const valute = settings.load()["valute"];
  indexProducts.map((item) => {
    document.querySelector("#index-catalog").insertAdjacentHTML(
      "beforeend",
      `
    <li class="grid-item catalog-item" data-category="${item["category"]["type"]}">
      <div class="grid-item-image catalog-item-image">
        <img src="${item.image_path}" alt="${item.name.ENG}" />
      </div>
      <h1 class="grid-item__title catalog-item__title">${item["name"][lang]}</h1>
      <p class="grid-item__text catalog-item__vendor">${item.vendor}</p>
      <p class="grid-item__text catalog-item__price">${item["price"][valute]} ${valute}</p>
      <p class="grid-item__text catalog-item__category">${item.category.name[lang]}</p>
      ${
        item.inStock
          ? `<a href="#add?id=${item.id}" class="button button--default button-addToCart">Add To Cart</a>`
          : `<a href="#pre-order?id=${item.id}" class="button button--secondary button-preOrder">Pre-Order</a>`
      }
    </li>
    `
    );
  });
})();

// indexProducts.map((item) => {});
// const indexProducts = products.get();
// indexProducts.map((item) => {
//   document.querySelector("#index-catalog").insertAdjacentHTML(
//     "beforeend",
//     `
// <li class="grid-item catalog-item">
//   <div class="grid-item-image catalog-item-image">
//     <img src="${location.origin}/${item.image_path}" alt="Apple" />
//   </div>
//   <h1 class="grid-item__title catalog-item__title">Apple</h1>
//   <p class="grid-item__text catalog-item__price">Price: 0.69$</p>
//   <a href="#" class="button button--default button-addToCart">Add To Cart</a>
// </li>
//     `
//   );
// });

// Язык
language.load(".language-select");
language.change(".language-select");
