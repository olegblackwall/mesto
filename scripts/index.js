// Переменные открытия формы "Редактирование профиля"

let popup = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__edit-button');

// Переменная закрытия формы "Редактирования профиля"

let closePopup = document.querySelector('.popup__close-button');

// Переменные сохраняющие текст в полях "Имя" и "О себе"

let profileName = document.querySelector('.profile__name').textContent;
let profileAboutself = document.querySelector('.profile__aboutself').textContent;

// Переменные редактирования полей "Имени" и "О себе" в форме "Редактирования профиля"

let profileForm = document.querySelector('.popup__form');
let nameForm = document.querySelector('.popup__form-name');
let aboutselfForm = document.querySelector('.popup__form-aboutself');

// Переменные изменения "Имени" и "О себе" в профиле

let fieldName = document.querySelector('.profile__name');
let fieldAboutself = document.querySelector('.profile__aboutself');



// Функция открывающая форму "Редактирование профиля" с сохранением текущих полей "Имя" и "О себе"

function activePopup() {
    popup.classList.add('popup_active');
    profileName.textContent = fieldName.value;
    profileAboutself.textContent = fieldAboutself.value;
}
editProfile.addEventListener('click', activePopup);

// Функция выхода из формы "Редактирования профиля" (без сохранения)

function popupExit() {
    popup.classList.remove('popup_active');
}
closePopup.addEventListener('click', popupExit);

// Функция отправки формы "Редактирования профиля"

function handleFormSubmit(event) {
    event.preventDefault();
    fieldName.textContent = nameForm.value;
    fieldAboutself.textContent = aboutselfForm.value;
    popup.classList.remove('popup_active');
}
profileForm.addEventListener('submit', handleFormSubmit);