class Card {
    constructor(name, link, template, openPopup) {
        this.name = name;
        this.link = link;
        this.element = document.querySelector(template).content.querySelector('.element').cloneNode(true);
        this.title = this.element.querySelector('.element__title');
        this.cardImg = this.element.querySelector('.element__img');
        this.buttonCardDelete = this.element.querySelector('.element__delete');
        this.like = this.element.querySelector('.element__like');
        this.openPopup = openPopup;
        this.cardImgPopup = document.querySelector('.popup_show-img');
        this.imgPopup = this.cardImgPopup.querySelector('.popup__img');
        this.imgTitlePopup = this.cardImgPopup.querySelector('.popup__title-img');
    }

    createCard() {    
        this.title.textContent = this.name;
        this.cardImg.src = this.link;
        this.cardImg.alt = this.name;
        
        this._setDeleteCardListener();
        this._setLikeCardListener();
        this._setOpenPopupListener();

        return this.element;
    }
    
    _setDeleteCardListener() {
        this.buttonCardDelete.addEventListener('click', () => {
            this.element.remove()
        })
    }

    _setLikeCardListener() {
        this.like.addEventListener('click', () => {
            this.like.classList.toggle('element__like_active')
        })
    }

    _setOpenPopupListener() {
        this.cardImg.addEventListener('click', () => {
            this.openPopup(this.cardImgPopup)
            this.imgPopup.src = this.link;
            this.imgTitlePopup.textContent = this.name;
            this.imgPopup.alt = this.name;
        })
    }
}