// Переменные открытия формы "Редактирование профиля"

let popup = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__edit-button');

// Переменная закрытия формы "Редактирования профиля"

let closePopup = document.querySelector('.popup__close-button');

// Переменные сохраняющие текст в полях "Имя" и "О себе"

let profileName = document.querySelector('.profile__name');
let profileAboutself = document.querySelector('.profile__aboutself');

// Переменные редактирования полей "Имени" и "О себе" в форме "Редактирования профиля"

let profileForm = document.querySelector('.popup__form');
let nameForm = document.querySelector('.popup__input_key_name');
let aboutselfForm = document.querySelector('.popup__input_key_aboutself');

// Переменные изменения "Имени" и "О себе" в профиле

let fieldName = document.querySelector('.profile__name');
let fieldAboutself = document.querySelector('.profile__aboutself');



// Функция открывающая форму "Редактирование профиля" с сохранением текущих полей "Имя" и "О себе"

function openPopup() {
    popup.classList.add('popup_opened');
    nameForm.value = fieldName.textContent;
    aboutselfForm.value = fieldAboutself.textContent;
}

// Функция выхода из формы "Редактирования профиля" (без сохранения)

function popupExit() {
    popup.classList.remove('popup_opened');
}

// Функция отправки формы "Редактирования профиля"

function handleFormSubmit(event) {
    event.preventDefault();
    fieldName.textContent = nameForm.value;
    fieldAboutself.textContent = aboutselfForm.value;
    popup.classList.remove('popup_opened');
}



// Слушатель открытия формы "Редактирования профиля"

editProfile.addEventListener('click', openPopup);

// Слушатель выхода из формы "Редактирования профиля" (без сохранения)

closePopup.addEventListener('click', popupExit);

// Слушатель отправки формы "Редактирования профиля"

profileForm.addEventListener('submit', handleFormSubmit);