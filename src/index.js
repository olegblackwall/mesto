import './pages/index.css';

import Card from "./components/Card.js";
import Section from "./components/Section.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

import {api} from "./utils/Api.js";
import PopupWithConfirm from './components/PopupWithConfirm';

// Переменная кнопки редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');

// Переменные редактирования полей "Имени" и "О себе" в форме "Редактирования профиля"
const profileForm = document.forms["edit-profile-form"];
const profileNameForm = profileForm.elements.name;
const profileAboutForm = profileForm.elements.about;

// Переменные изменения "Имени" и "О себе" в профиле
const profileFieldName = document.querySelector('.profile__name');
const profileFieldAbout = document.querySelector('.profile__about');

// Переменная кнопки "Добавления элементов"
const elementButton = document.querySelector('.profile__add-button');

// Переменная формы добавления элементов
const cardElementForm = document.forms["add-element-form"];

// Переменная попапа картинки карточки
const cardImgPopup = document.querySelector('.popup_show-img');
const imgPopup = cardImgPopup.querySelector('.popup__img');
const imgTitlePopup = cardImgPopup.querySelector('.popup__title-img');

// Переменная кнопки открытия попапа "Изменения аватара"
const avatarEditButton = document.querySelector('.profile__avatar-button');

const avatarForm = document.forms["avatar-form"];

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
  const formAvatar = new FormValidator(object, avatarForm);

  const section = new Section({renderer: (item) => {section.addItem(createCard(item.name, item.link, item.likes, item._id, setLike, deleteLike, item.owner, deleteCard))}}, '.elements');

  api.getInitialCards()
  .then((result) => {
    section.renderItems(result);
  })
  .catch((err) => {
    console.log(err);
  });

  const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar'});

  const popupWithImage = new PopupWithImage('.popup_show-img');
  popupWithImage.setEventListeners();

  const popupWithFormProfile = new PopupWithForm('.popup_edit-profile', { handleFormSubmit: (formValues, saveButton) => {

      popupWithFormProfile.close();
      
      console.log(formValues);
      saveButton.textContent = 'Сохранение...';

      api.editProfile(formValues)
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        saveButton.textContent = 'Сохранить';
      })
      
      } 
    });
  popupWithFormProfile.setEventListeners();

  api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
    userInfo.setAvatar(result);
  })
  .catch((err) => {
    console.log(err);
  });



  const popupWithFormAddCard = new PopupWithForm('.popup_add-element', { handleFormSubmit: (formValues, saveButton) => {
    saveButton.textContent = 'Создание...';

    api.postCard(formValues, saveButton)
    .then((result) => {
      section.addItem(createCard(result.name, result.link, result.likes, result._id, setLike, deleteLike, result.owner, deleteCard));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveButton.textContent = 'Создать';
    })

    popupWithFormAddCard.close();
    } 
  });
  popupWithFormAddCard.setEventListeners();

  const editAvatar = new PopupWithForm('.popup_avatar', { handleFormSubmit: (formValues, saveButton) => {
    saveButton.textContent = 'Сохранение...';
    api.editAvatar(formValues)
    .then((result) => {
      // console.log(result);
      userInfo.setAvatar(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    })

    editAvatar.close();
  } });
  editAvatar.setEventListeners();

  const confirmPopup = new PopupWithConfirm('.popup_confirm');
  confirmPopup.setEventListeners();


// ----------------------------------------------------------------------------------------


// Функция открывает попап карточки
function handleOpenPopup(name, link) {
  imgPopup.src = link; 
  imgPopup.alt = name; 
  imgTitlePopup.textContent = name; 
  popupWithImage.open(name, link);
}

function setLike(_id) {
  return api.setLike(_id)
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  }); 
}

function deleteLike(_id) {
  return api.deleteLike(_id)
  .then((result) => {
    return result;
  })
  .catch((err) => {
    console.log(err);
  }); 
}

function createCard(name, link, likes, _id, setLike, deleteLike, owner) {
  const card = new Card(name, link, '.card', handleOpenPopup, likes, _id, setLike, deleteLike, owner, deleteCard);

  return card.createCard();
}

function deleteCard(_id, card) {
    confirmPopup.open(); 
    confirmPopup.getSubmitter(() => { 
        api.deleteCard(_id) 
        .then(res => { 
            card.remove(); 
            confirmPopup.close(); 
        }) 
        .catch(err => { 
            console.log(err); 
        }); 
    });
}


// ----------------------------------------------------------------------------------------


// Слушатель открытия формы "Редактирования профиля"
profileEditButton.addEventListener('click', () => {
    popupWithFormProfile.open();
    profileNameForm.value = profileFieldName.textContent;
    profileAboutForm.value = profileFieldAbout.textContent;
    formProfile.resetValidation();
});

// Слушатель открытия формы "Добавления элементов"
elementButton.addEventListener('click', () => {
    popupWithFormAddCard.open();
    formAddCard.switchButton(false);
    formAddCard.resetValidation();
});

avatarEditButton.addEventListener('click', () => {
  editAvatar.open();
  formAvatar.switchButton(false);
  formAvatar.resetValidation();
});


// Обращение к свойстам экземпляров класса
formProfile.enableValidation();
formAddCard.enableValidation();
formAvatar.enableValidation();