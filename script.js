const popupEdit = document.querySelector(".profile__box");
const popupBox = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup__profile");
const popupCross = document.querySelector(".popup__cross");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const popupName = document.querySelector(".popup__name");
const popupJob = document.querySelector(".popup__textjob");
const cardTemplate = document.querySelector("#template").content;
const popupSaveProfileButton = document.querySelector(".popup__buttoninfo");
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
const cardsContainer = document.querySelector(".elements");
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
const formEditInfo = document.querySelector(".popup__formeditinfo");

//открытие popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

popupEdit.addEventListener("click", function () {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  openPopup(popupProfile);
});

//закрытие popup при нажатии на крестик
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
popupCross.addEventListener("click", function () {
  closePopup(popupProfile);
});

//редактируем профиль
function handleFormSubmit(evt) {
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  evt.preventDefault();
  closePopup(popupProfile);
}

formEditInfo.addEventListener("submit", handleFormSubmit);

//Добавление какой-то новой карточки
function addCard(name, link) {
  const card = makElement(name, link);
  cardsContainer.prepend(card);
}

//Добавление "оригинальной шестёрки" карточек
function getOriginalCards() {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  });
}
getOriginalCards();

//Создание шаблона для последующего добавления карточки
function makElement(name, link) {
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
    openPopup(popupPicture);
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
  openPopup(popupPlace);
});

placeCross.addEventListener("click", function () {
  closePopup(popupPlace);
});

//Добавление кароточки по кнопке "Создать"
function handleCardSubmit(evt) {
  addCard(placeName.value, placeLink.value);
  evt.preventDefault();
  closePopup(popupPlace);
  evt.target.reset();
}

formPlace.addEventListener("submit", handleCardSubmit);

//Добавление кнопки закрытия для раскрытой popup-карточки
crossForPicture.addEventListener("click", function () {
  closePopup(popupPicture);
});
