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

const numbers = [2, 3, 5];

const doubledNumbers = numbers.map(number => number * 2);


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

// Переменная попапов
const popups = document.querySelectorAll('.popup')

// Переменные открытия формы "Редактирование профиля"
const profileEditPopup = document.querySelector('.popup_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');

// Переменная закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

// Переменная закрытия формы "Редактирования профиля"
const buttonClosePopupEditProfile = document.querySelector('.popup__close-button_edit-profile');

// Переменные сохраняющие текст в полях "Имя" и "О себе"
const profileName = document.querySelector('.profile__name');
const profileAboutself = document.querySelector('.profile__aboutself');

// Переменные редактирования полей "Имени" и "О себе" в форме "Редактирования профиля"
const profileForm = document.forms["edit-profile-form"];
const profileNameForm = profileForm.elements.name;
const profileAboutselfForm = profileForm.elements.aboutself;
const profileFormInputs = Array.from(profileForm.querySelectorAll('.popup__input'));

// Переменные изменения "Имени" и "О себе" в профиле
const profileFieldName = document.querySelector('.profile__name');
const profileFieldAboutself = document.querySelector('.profile__aboutself');

// Переменная попапа  "Добавления элементов"
const elementPopup = document.querySelector('.popup_add-element');

// Переменная кнопки "Добавления элементов"
const elementButton = document.querySelector('.profile__add-button');

// Переменные формы добавления элементов
const cardElementForm = document.forms["add-element-form"];
const cardElementTitle = cardElementForm.elements.title;
const cardElementImg = cardElementForm.elements.link;

// Переменная закрытия формы "Добавления элементов"
const buttonClosePopupAddElement = document.querySelector('.popup__close-button_add-element');

// Переменные кнопок сохранения/добавления в попапах
const elementSaveButton = document.querySelector('.popup__save-button_add-element')
const profileSaveButton = document.querySelector('.popup__save-button_edit-profile')

// Переменная для добавления базовых эелементов
const elementsContainer = document.querySelector('.elements');

// Переменная шаблона элементов
const template = document.querySelector('.card').content;

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

  const section = new Section({items: initialCards, renderer: (item) => {addCard(item.name, item.link)}}, '.elements');
  section.renderItems();

  const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__aboutself'});

  const popupWithImage = new PopupWithImage('.popup_show-img');
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


// Функция открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
}

// Функции закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
}

closeButtons.forEach((button) => { 
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

// Функция добавления карточки
function addCard (name, link) {
    const card = createCard(name, link);
    elementsContainer.prepend(card);
}

// Слушатель закрытия попапа при нажатии вне попапа
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})

// Функция закрытия попапа при нажатии на кнопку Esc
function handleEscClose(event) {
    if (event.key === "Escape") {
        const closePopupEscape = document.querySelector('.popup_opened');
        closePopup(closePopupEscape);
    }
}

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
    openPopup(profileEditPopup);
    profileNameForm.value = profileFieldName.textContent;
    profileAboutselfForm.value = profileFieldAboutself.textContent;
    formProfile.resetValidation();
});

// Слушатель открытия формы "Добавления элементов"
elementButton.addEventListener('click', () => {
    openPopup(elementPopup);
    formAddCard.switchButton(false);
    formAddCard.resetValidation();
});

// Обращение к свойстам экземпляров класса
formProfile.enableValidation();
formAddCard.enableValidation();