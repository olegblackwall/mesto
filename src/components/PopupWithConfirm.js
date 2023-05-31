import Popup from './Popup.js';

class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.submitButton = this._popupElement.querySelector('.popup__save-button_confirm');
  }

  setEventListeners() {
    super.setEventListeners();
    this.submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(this._submitter)
      this._submitter();
    });
  }

  getSubmitter(_submitter) { 
    console.log('отрабатывает getSubmitter PWC')
    this._submitter = _submitter; 
}
}

export default PopupWithConfirm;
