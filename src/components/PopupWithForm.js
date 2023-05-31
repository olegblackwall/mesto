import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._handleFormSubmit = handleFormSubmit;
    this.saveButton = this._form.querySelector('.popup__save-button');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this.saveButton);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
