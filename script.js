const popupEdit = document.querySelector(".profile__box");
const popupBox = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup__profile");
const popupCross = document.querySelector(".popup__cross");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const popupName = document.querySelector(".popup__name");
const popupJob = document.querySelector(".popup__textjob");
const popupSaveButton = document.querySelector(".popup__button");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const elements = document.querySelector(".elements");
const popupFullPicture = document.querySelector(".popup__full-picture");
const popupCaption = document.querySelector(".popup__caption");
const popupCrossPicture = document.querySelector(".popup__cross-picture");
const popupPicture = document.querySelector(".popup__picture");
const plusButton = document.querySelector(".profile__add");
const popupPlace = document.querySelector(".popup__place");
const placeCross = document.querySelector(".popup__place-cross");
const formPlace = document.querySelector(".popup__form-place");
const placeName = formPlace.querySelector(".popup__placename");
const placeLink = formPlace.querySelector(".popup__placelink");
const crossForPicture = document.querySelector(".popup__cross-picture");

//открытие popup
function popupOpened(popup) {
  popup.classList.add("popup_opened");
}

popupEdit.addEventListener("click", function () {
  popupOpened(popupProfile);
});

//закрытие popup при нажатии на крестик
function popupClosed(popup) {
  popup.classList.remove("popup_opened");
}
popupCross.addEventListener("click", function () {
  popupClosed(popupProfile);
});

//редактируем профиль
function formSubmitHandler(evt) {
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  evt.preventDefault();
  popupClosed(popupProfile);
}

popupSaveButton.addEventListener("submit", formSubmitHandler);

//Добавление какой-то новой карточки
function cardAdding(name, link) {
  const card = elementMaking(name, link);
  elements.prepend(card);
}

//Добавление "оригинальной шестёрки" карточек
function originalCards() {
  initialCards.forEach((item) => {
    cardAdding(item.name, item.link);
  });
}
originalCards();

//Создание шаблона для последующего добавления карточки
function elementMaking(name, link) {
  const cardTemplate = document.querySelector("#template").content;
  const element = cardTemplate.querySelector(".element").cloneNode(true);
  const pictureElement = element.querySelector(".element__image");

  pictureElement.src = link;
  element.querySelector(".element__caption-text").textContent = name;
  pictureElement.alt = name;

  const buttonLike = element.querySelector(".element__box-like");
  buttonLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__active-like");
  });

  const trash = element.querySelector(".element__delete");
  trash.addEventListener("click", function (evt) {
    element.remove();
  });

  pictureElement.addEventListener("click", function () {
    fullPicture(name, link);
    popupOpened(popupPicture);
  });

  function fullPicture(name, link) {
    popupFullPicture.src = link;
    popupFullPicture.alt = name;
    popupCaption.textContent = name;
  }

  return element;
}

//Открытие и закрытие popop'а добавления карточки
plusButton.addEventListener("click", function () {
  popupOpened(popupPlace);
});

placeCross.addEventListener("click", function () {
  popupClosed(popupPlace);
});

//Добавление кароточки по кнопке "Создать"
function cardSubmitHandler(evt) {
  cardAdding(placeName.value, placeLink.value);
  evt.preventDefault();
  popupClosed(popupPlace);
  evt.target.reset();
}

formPlace.addEventListener("submit", cardSubmitHandler);

//Добавление кнопки закрытия для раскрытой popup-карточки
crossForPicture.addEventListener("click", function () {
  popupClosed(popupPicture);
});
