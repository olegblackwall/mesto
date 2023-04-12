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



// ----------------------------------------------------------------------------------------


// Функция открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', pushEsc);
}

// Функции закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', pushEsc);
}

closeButtons.forEach((button) => { 
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

// Функция отправки формы "Редактирования профиля"
function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileFieldName.textContent = profileNameForm.value;
    profileFieldAboutself.textContent = profileAboutselfForm.value;
    closePopup(profileEditPopup);
}

// Создание карточки
const createElement = (name, link) => {
    const newElement = template.querySelector('.element').cloneNode(true);
    const elementTitle = newElement.querySelector('.element__title');
    const elementImg = newElement.querySelector('.element__img');
    const buttonDeleteCard = newElement.querySelector('.element__delete');
    const like = newElement.querySelector('.element__like');

    elementTitle.textContent = name;
    elementImg.src = link;
    elementImg.alt = name;

    buttonDeleteCard.addEventListener('click', () => {
        newElement.remove()
    })

    like.addEventListener('click', () => {
        like.classList.toggle('element__like_active')
    })

    elementImg.addEventListener('click', () => {
        openPopup(cardImgPopup)
        imgPopup.src = link;
        imgTitlePopup.textContent = name;
        imgPopup.alt = name;
    })

    return newElement;
}

// Функция добавления карточки
function addCard (name, link) {
    elementsContainer.prepend(createElement(name, link))
}

// Создание базовых шести элементов
initialCards.forEach((card) => {
    elementsContainer.append(createElement(card.name, card.link));
});

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
function pushEsc(event) {
    if (event.key === "Escape") {
        const closePopupEscape = document.querySelector('.popup_opened');
        closePopup(closePopupEscape);
    }
}


// ----------------------------------------------------------------------------------------


// Слушатель открытия формы "Редактирования профиля"
profileEditButton.addEventListener('click', () => {
    openPopup(profileEditPopup);
    profileNameForm.value = profileFieldName.textContent;
    profileAboutselfForm.value = profileFieldAboutself.textContent;
    closeError(profileNameForm, 'popup__input-error_active');
    closeError(profileAboutselfForm, 'popup__input-error_active');
    switchButton(profileSaveButton, 'popup__save-button_inactive', true);
});

// Слушатель открытия формы "Добавления элементов"
elementButton.addEventListener('click', () => {
    openPopup(elementPopup);
    switchButton(elementSaveButton, 'popup__save-button_inactive', false);
});

// Слушатель отправки формы "Редактирования профиля"
profileForm.addEventListener('submit', handleProfileFormSubmit);


// Слушатель добавления элемента
cardElementForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newElementTitle = cardElementTitle.value
    const newElementImg = cardElementImg.value

    closePopup(elementPopup);
    cardElementForm.reset();

    addCard(newElementTitle, newElementImg);
})

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input-red-line',
    errorClass: 'popup__input-error_active'
  });