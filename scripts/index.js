// Переменная названий и адресов первых шести карточек
const initialCards = [
    {
      name: 'Лондон',
      link: 'https://images.unsplash.com/photo-1502700559166-5792585222ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1852&q=80'
    },
    {
      name: 'Майами',
      link: 'https://images.unsplash.com/photo-1563792137260-9b578c20677e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80'
    },
    {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1544987185-101082cca5de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'
    },
    {
      name: 'Перу',
      link: 'https://images.unsplash.com/photo-1526697675318-89790adec369?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80'
    },
    {
      name: 'Сидней',
      link: 'https://images.unsplash.com/photo-1590716209211-ea74d5f63573?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3024&q=80'
    },
    {
      name: 'Токио',
      link: 'https://images.unsplash.com/photo-1578593050839-28efab21e431?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3162&q=80'
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

// Функция добавления карточки
function addCard (name, link) {
    const card = new Card(name, link, '.card', openPopup)
    elementsContainer.prepend(card.createCard());
}

// Создание базовых шести элементов
initialCards.reverse().forEach((data) => {
    addCard(data.name, data.link);
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
});

// Слушатель открытия формы "Добавления элементов"
elementButton.addEventListener('click', () => {
    openPopup(elementPopup);
    formAddCard._switchButton(false);
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

// Обращение к свойстам экземпляров класса
formProfile.enableValidation();
formAddCard.enableValidation();