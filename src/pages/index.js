import './index.css';

import { profileEditButton, profileForm, profileNameForm, profileAboutForm, profileFieldName, profileFieldAbout, elementButton, cardElementForm, avatarEditButton, avatarForm, object } from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {api} from "../components/Api.js";
import PopupWithConfirm from '../components/PopupWithConfirm';

// Два экземпляра класса: формы Профиля и формы Добавления карточки
const formProfile = new FormValidator(object, profileForm);
const formAddCard = new FormValidator(object, cardElementForm);
const formAvatar = new FormValidator(object, avatarForm);

const section = new Section({renderer: (item) => {section.addItem(createCard(item.name, item.link, item.likes, item._id, setLike, deleteLike, item.owner, deleteCard, userInfo.getUserInfo()))}}, '.elements');

const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar'});

const popupWithImage = new PopupWithImage('.popup_show-img');
popupWithImage.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup_edit-profile', { handleFormSubmit: (formValues, saveButton) => {
      
  saveButton.textContent = 'Сохранение...';
  
  api.editProfile(formValues)
  .then((result) => {
    userInfo.setUserInfo(result);
    popupWithFormProfile.close();
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
    
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    userInfo.setId(userData);
    section.renderItems(cards);
  })
  .catch(err => {
    console.log(err);
  });
    
    
const popupWithFormAddCard = new PopupWithForm('.popup_add-element', { handleFormSubmit: (formValues, saveButton) => {
  saveButton.textContent = 'Создание...';
  
  api.postCard(formValues, saveButton)
  .then((result) => {
    section.addItem(createCard(result.name, result.link, result.likes, result._id, setLike, deleteLike, result.owner, deleteCard, userInfo.getUserInfo()));
    popupWithFormAddCard.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    saveButton.textContent = 'Создать';
  })

  } 
});

popupWithFormAddCard.setEventListeners();

const editAvatar = new PopupWithForm('.popup_avatar', { handleFormSubmit: (formValues, saveButton) => {
  saveButton.textContent = 'Сохранение...';
  api.editAvatar(formValues)
  .then((result) => {
    userInfo.setAvatar(result);
    editAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    saveButton.textContent = 'Сохранить';
  })

} });
editAvatar.setEventListeners();

const confirmPopup = new PopupWithConfirm('.popup_confirm');
confirmPopup.setEventListeners();


// ----------------------------------------------------------------------------------------


// Функция открывает попап карточки
function handleOpenPopup(name, link) {
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
  const card = new Card(name, link, '.card', handleOpenPopup, likes, _id, setLike, deleteLike, owner, deleteCard, userInfo.getUserInfo());

  return card.createCard();
}

function deleteCard(_id, card) {
  confirmPopup.open(); 
  confirmPopup.setSubmitter(() => { 
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