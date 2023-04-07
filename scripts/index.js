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

// Переменные изменения "Имени" и "О себе" в профиле
const profileFieldName = document.querySelector('.profile__name');
const profileFieldAboutself = document.querySelector('.profile__aboutself');

// Переменные открытия формы "Добавления элементов"
const addElementPopup = document.querySelector('.popup_add-element');
const addElementButton = document.querySelector('.profile__add-button');

// Переменные формы добавления элементов
const addElementForm = document.forms["add-element-form"];
const addElementTitle = addElementForm.elements.title;
const addElementImg = addElementForm.elements.link;

// Переменная закрытия формы "Добавления элементов"
const buttonClosePopupAddElement = document.querySelector('.popup__close-button_add-element');

// Переменная для добавления базовых эелементов
const elementList = document.querySelector('.elements');

// Переменная шаблона элементов
const template = document.querySelector('.card').content;

// Переменная попапа картинки карточки
const showImgPopup = document.querySelector('.popup_show-img');
const imgPopup = showImgPopup.querySelector('.popup__img');
const imgTitlePopup = showImgPopup.querySelector('.popup__title-img');



// ----------------------------------------------------------------------------------------


// Функция открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_opened');
}

// Функции закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
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
        openPopup(showImgPopup)
        imgPopup.src = link;
        imgTitlePopup.textContent = name;
        imgPopup.alt = name;
    })

    return newElement;
}

// Функция добавления карточки
function addCard (name, link) {
    elementList.prepend(createElement(name, link))
}

// Создание базовых шести элементов
initialCards.forEach((card) => {
    elementList.append(createElement(card.name, card.link));
});

// Слушатель закрытия всех попапов при нажатии вне попапа
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


// ----------------------------------------------------------------------------------------


// Слушатель открытия формы "Редактирования профиля"
profileEditButton.addEventListener('click', () => {
    openPopup(profileEditPopup);
    profileNameForm.value = profileFieldName.textContent;
    profileAboutselfForm.value = profileFieldAboutself.textContent;
});

// Слушатель открытия формы "Добавления элементов"
addElementButton.addEventListener('click', () => {
    openPopup(addElementPopup);
});

// Слушатель отправки формы "Редактирования профиля"
profileForm.addEventListener('submit', handleProfileFormSubmit);


// Слушатель добавления элемента
addElementForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newElementTitle = addElementTitle.value
    const newElementImg = addElementImg.value

    closePopup(addElementPopup);
    addElementForm.reset();

    addCard(newElementTitle, newElementImg);
})