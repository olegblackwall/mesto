// рецепт

export default class Card {
    constructor(name, link, template, handleCardClick, likes, index, setLike, deleteLike, owner, deleteCard) {
        this.name = name;
        this.link = link;
        this.likes = likes;
        this.element = document.querySelector(template).content.querySelector('.element').cloneNode(true);
        this.title = this.element.querySelector('.element__title');
        this.cardImg = this.element.querySelector('.element__img');
        this.buttonCardDelete = this.element.querySelector('.element__delete');
        this.like = this.element.querySelector('.element__like');
        this.handleCardClick = handleCardClick;
        this.likeCounter = this.element.querySelector('.element__like-counter');
        this.id = index;
        this.setLike = setLike;
        this.deleteLike = deleteLike;
        this.myId = '90a7a11d7d79e5437aca9c94';
        this.owner = owner._id;
        this.deleteCard = deleteCard;
    }

    createCard() {    
        this.title.textContent = this.name;
        this.cardImg.src = this.link;
        this.cardImg.alt = this.name;
        this.likeCounter.textContent = this.likes.length;

        if (this.likes.some(item => item._id === this.myId)) {
            this.like.classList.add('element__like_active');
        }

        if (this.myId !== this.owner) {
            this.buttonCardDelete.remove();
        }

        this._setEventListeners();

        return this.element;
    }
    
    _deleteCardListener() {
            this.deleteCard(this.id, this.element)
    }

    _likeCardListener() {
            if (!this.like.classList.contains('element__like_active')) {
            this.setLike(this.id)
                .then((result) => {
                    this.like.classList.add('element__like_active')
                    this.likeCounter.textContent = result.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                }); 
            } else {
            this.deleteLike(this.id)
            .then((result) => {
                this.like.classList.remove('element__like_active')
                this.likeCounter.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log(err);
            }); 
            }
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