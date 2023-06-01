// Переменная кнопки редактирования профиля
export const profileEditButton = document.querySelector('.profile__edit-button');

// Переменные редактирования полей "Имени" и "О себе" в форме "Редактирования профиля"
export const profileForm = document.forms["edit-profile-form"];
export const profileNameForm = profileForm.elements.name;
export const profileAboutForm = profileForm.elements.about;

// Переменные изменения "Имени" и "О себе" в профиле
export const profileFieldName = document.querySelector('.profile__name');
export const profileFieldAbout = document.querySelector('.profile__about');

// Переменная кнопки "Добавления элементов"
export const elementButton = document.querySelector('.profile__add-button');

// Переменная формы добавления элементов
export const cardElementForm = document.forms["add-element-form"];

// Переменная кнопки открытия попапа "Изменения аватара"
export const avatarEditButton = document.querySelector('.profile__avatar-button');

export const avatarForm = document.forms["avatar-form"];

// Переменная включающая в себя объект с параметрами
export const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input-red-line',
  errorClass: 'popup__input-error_active'
};
