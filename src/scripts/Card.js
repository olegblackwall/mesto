export default class Card {
    constructor(name, link, template, handleCardClick) {
        this.name = name;
        this.link = link;
        this.element = document.querySelector(template).content.querySelector('.element').cloneNode(true);
        this.title = this.element.querySelector('.element__title');
        this.cardImg = this.element.querySelector('.element__img');
        this.buttonCardDelete = this.element.querySelector('.element__delete');
        this.like = this.element.querySelector('.element__like');
        this.handleCardClick = handleCardClick;
    }

    createCard() {    
        this.title.textContent = this.name;
        this.cardImg.src = this.link;
        this.cardImg.alt = this.name;

        this._setEventListeners();

        return this.element;
    }
    
    _deleteCardListener() {
            this.element.remove()
    }

    _likeCardListener() {
            this.like.classList.toggle('element__like_active')
    }

    _openPopupListener() {
            this.handleCardClick(this.name, this.link)
    }

    _setEventListeners() {
        this.like.addEventListener('click', () => this._likeCardListener());
        this.buttonCardDelete.addEventListener('click', () => this._deleteCardListener());
        this.cardImg.addEventListener('click', () => this._openPopupListener());
    }
}