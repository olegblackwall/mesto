

// Переменные открытия формы "Редактирование профиля"
const popupEditProfile = document.querySelector('.popup_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');
// Переменная закрытия формы "Редактирования профиля"
const buttonClosePopupEditProfile = document.querySelector('.popup__close-button_edit-profile');

// Переменные сохраняющие текст в полях "Имя" и "О себе"
const profileName = document.querySelector('.profile__name');
const profileAboutself = document.querySelector('.profile__aboutself');

// Переменные редактирования полей "Имени" и "О себе" в форме "Редактирования профиля"
const profileForm = document.querySelector('.popup__form_edit-profile');
const nameForm = document.querySelector('.popup__input_key_name');
const aboutselfForm = document.querySelector('.popup__input_key_aboutself');

// Переменные изменения "Имени" и "О себе" в профиле
const fieldName = document.querySelector('.profile__name');
const fieldAboutself = document.querySelector('.profile__aboutself');

// Переменные открытия формы "Добавления элементов"
const popupAddElement = document.querySelector('.popup_add-element');
const buttonAddElement = document.querySelector('.profile__add-button');

// Переменная закрытия формы "Добавления элементов"
const buttonClosePopupAddElement = document.querySelector('.popup__close-button_add-element');

// Переменная для добавления базовых эелементов
const elementList = document.querySelector('.elements');

// Переменная шаблона элементов
const template = document.querySelector('.card').content;

// Переменная кнопки "Создать"
const buttonCreateElement = document.querySelector('.popup__save-button_add-element');

// Переменная кнопки закрытия картинки элемента
const buttonClosePopupShowImg = document.querySelector('.popup__close-button_show-img');

// Переменная для закрытия картинки элемента при нажатии вне карточки
const clickOutsideClosePopup = document.querySelector('.popup_click-outside')


// ----------------------------------------------------------------------------------------


// Функция открывающая форму "Редактирование профиля" с сохранением текущих полей "Имя" и "О себе"
function openPopupEditProfile() {
    popupEditProfile.classList.add('popup_opened');
    nameForm.value = fieldName.textContent;
    aboutselfForm.value = fieldAboutself.textContent;
}

// Функция выхода из формы "Редактирования профиля" (без сохранения)
function exitPopupEditProfile() {
    popupEditProfile.classList.remove('popup_opened');
}

// Функция отправки формы "Редактирования профиля"
function handleFormSubmit(event) {
    event.preventDefault();
    fieldName.textContent = nameForm.value;
    fieldAboutself.textContent = aboutselfForm.value;
    popupEditProfile.classList.remove('popup_opened');
}

// Функция открытия формы "Добавления элементов"
function openPopupAddElement() {
    popupAddElement.classList.add('popup_opened');
}

// Функция выхода из формы "Добавления элементов"
function exitPopupAddElement() {
    popupAddElement.classList.remove('popup_opened');
}



// Добавление элементов
const addElement = (name, link) => {
    const newElement = template.querySelector('.element').cloneNode(true);
    const elementTitle = newElement.querySelector('.element__title');
    const elementImg = newElement.querySelector('.element__img');

    elementTitle.textContent = name;
    elementImg.src = link;

    return newElement;
}

// Создание эелементов 
function addCard(event) {
    event.preventDefault();
    
    const nameAddElement = document.querySelector('.popup__input_key_name-element');
    const imgAddElement = document.querySelector('.popup__input_key_url-img');


    const cardName = nameAddElement.value;
    const cardImg = imgAddElement.value;

    elementList.prepend(addElement(cardName, cardImg));
    const card = document.querySelector('.element');
    const like = card.querySelector('.element__like');
    const deleteElement = card.querySelector('.element__delete');
    const popupImg = document.querySelector('.element__button-img');
    const popupImgTitle = document.querySelector('.element__title');

    like.addEventListener('click', () => {
        if(like.classList.contains('element__like_active')) {
            like.classList.remove('element__like_active')
        } else {
            like.classList.add('element__like_active')
        }
    })
    deleteElement.addEventListener('click', () => {
        card.remove()
    })
    popupImg.addEventListener('click', () => {
        document.querySelector('.popup__img').src = popupImg.src;
        document.querySelector('.popup__title-img').innerHTML = popupImgTitle.innerHTML;
        document.querySelector('.popup_show-img').classList.add('popup_opened');
    });
}

// Создание базовых шести элементов
initialCards.forEach((card) => {
    elementList.prepend(addElement(card.name, card.link));
});

// Открытия картинки элемента, реализация кнопки удаления элемента
// (У меня не успевали загружаться картинки из интернета, и поэтому никаких взаимодействий с ними не происходило. 
//  Нашёл такой выход, функция срабатывает после загрузки необходимых файлов.)
window.onload = () => {
    const card = document.querySelectorAll('.element')
    const popupImg = document.querySelectorAll('.element__button-img');
    const popupTitle = document.querySelectorAll('.element__title');

    for(let i = 0; i < card.length; i++) {
        const like = card[i].querySelector('.element__like');
        const deleteElement = card[i].querySelector('.element__delete');
        const image = card[i].querySelector('.element__button-img');
        const title = card[i].querySelector('.element__title');

        like.addEventListener('click', () => {
            if(like.classList.contains('element__like_active')) {
                like.classList.remove('element__like_active')
            } else {
                like.classList.add('element__like_active')
            }
        })
        deleteElement.addEventListener('click', () => {
            card[i].remove()
        })
        image.addEventListener('click', () => {
            document.querySelector('.popup__img').src = image.src;
            document.querySelector('.popup__title-img').innerHTML = title.innerHTML;
            document.querySelector('.popup_show-img').classList.add('popup_opened');
        })
    }
}

// Функция и слушатель закрытия попапа картинки эелемента при нажатии за её пределы
clickOutsideClosePopup.addEventListener('click', () => {
    document.querySelector('.popup_show-img').classList.remove('popup_opened')
})

// Функция и слушатель закрытия попапа при нажатии на кнопку закрытия
buttonClosePopupShowImg.addEventListener('click', () => {
    document.querySelector('.popup_show-img').classList.remove('popup_opened')
})


// ----------------------------------------------------------------------------------------


// Слушатель открытия формы "Редактирования профиля"
buttonEditProfile.addEventListener('click', openPopupEditProfile);

// Слушатель выхода из формы "Редактирования профиля" (без сохранения)
buttonClosePopupEditProfile.addEventListener('click', exitPopupEditProfile);

// Слушатель отправки формы "Редактирования профиля"
profileForm.addEventListener('submit', handleFormSubmit);

// Слушатель открытия формы "Добавления элементов"
buttonAddElement.addEventListener('click', openPopupAddElement);

// Слушатель выхода из формы "Добавления элементов" (без сохранения)
buttonClosePopupAddElement.addEventListener('click', exitPopupAddElement);

// Слушатель добавления элемента
buttonCreateElement.addEventListener('click', addCard);