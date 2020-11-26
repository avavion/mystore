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
const products = {};

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
