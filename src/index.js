import './pages/index.css';

import londonImage from './images/London.jpg';
import miamiImage from './images/Miami.jpg';
import moscowImage from './images/Moskow.jpg';
import peruImage from './images/Peru.jpg';
import sydneyImage from './images/Sydney.jpg';
import tokioImage from './images/Tokio.jpg';

import Card from "./scripts/Card.js";
import Section from "./scripts/Section.js";
import FormValidator from "./scripts/FormValidator.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";


const initialCards = [
    {
      name: 'Лондон',
      link: londonImage
    },
    {
      name: 'Майами',
      link: miamiImage
    },
    {
      name: 'Москва',
      link: moscowImage
    },
    {
      name: 'Перу',
      link: peruImage
    },
    {
      name: 'Сидней',
      link: sydneyImage 
    },
    {
      name: 'Токио',
      link: tokioImage
    }
  ];

const profileEditButton = document.querySelector('.profile__edit-button');

// Переменные редактирования полей "Имени" и "О себе" в форме "Редактирования профиля"
const profileForm = document.forms["edit-profile-form"];
const profileNameForm = profileForm.elements.name;
const profileAboutselfForm = profileForm.elements.aboutself;

// Переменные изменения "Имени" и "О себе" в профиле
const profileFieldName = document.querySelector('.profile__name');
const profileFieldAboutself = document.querySelector('.profile__aboutself');

// Переменная кнопки "Добавления элементов"
const elementButton = document.querySelector('.profile__add-button');

// Переменная формы добавления элементов
const cardElementForm = document.forms["add-element-form"];

// Переменная попапа картинки карточки
const cardImgPopup = document.querySelector('.popup_show-img');
const imgPopup = cardImgPopup.querySelector('.popup__img');
const imgTitlePopup = cardImgPopup.querySelector('.popup__title-img');

// Переменная включающая в себя объект с параметрами
const object = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-red-line',
    errorClass: 'popup__input-error_active'
  }

//   Два экземпляра класса: формы Профиля и формы Добавления карточки
  const formProfile = new FormValidator(object, profileForm);
  const formAddCard = new FormValidator(object, cardElementForm);

  const section = new Section({items: initialCards, renderer: (item) => {section.addItem(createCard(item.name, item.link))}}, '.elements');
  section.renderItems();

  const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__aboutself'});

  const popupWithImage = new PopupWithImage('.popup_show-img');
  popupWithImage.setEventListeners();

  const popupWithFormProfile = new PopupWithForm(
    '.popup_edit-profile',
    { handleFormSubmit: (formValues) => {
      userInfo.setUserInfo(formValues);
      popupWithFormProfile.close();
      } 
    });
  popupWithFormProfile.setEventListeners();

  const popupWithFormAddCard = new PopupWithForm('.popup_add-element', { handleFormSubmit: (formValues) => {
    section.addItem(createCard(formValues.title, formValues.link));
    popupWithFormAddCard.close();
    } 
  });
  popupWithFormAddCard.setEventListeners();


// ----------------------------------------------------------------------------------------


// Функция открывает попап карточки
function handleOpenPopup(name, link) {
  imgPopup.src = link; 
  imgPopup.alt = name; 
  imgTitlePopup.textContent = name; 
  popupWithImage.open(name, link);
}

function createCard(name, link) {
  const card = new Card(name, link, '.card', handleOpenPopup);

  return card.createCard();
}

// ----------------------------------------------------------------------------------------


// Слушатель открытия формы "Редактирования профиля"
profileEditButton.addEventListener('click', () => {
    popupWithFormProfile.open();
    profileNameForm.value = profileFieldName.textContent;
    profileAboutselfForm.value = profileFieldAboutself.textContent;
    formProfile.resetValidation();
});

// Слушатель открытия формы "Добавления элементов"
elementButton.addEventListener('click', () => {
    popupWithFormAddCard.open();
    formAddCard.switchButton(false);
    formAddCard.resetValidation();
});

// Обращение к свойстам экземпляров класса
formProfile.enableValidation();
formAddCard.enableValidation();