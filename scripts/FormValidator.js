class FormValidator {
    constructor(obj, form) {
        this.form = form;
        this.inputs = Array.from(this.form.querySelectorAll(obj.inputSelector))
        this.button = this.form.querySelector(obj.submitButtonSelector);
        this.obj = obj;
    }

    enableValidation() {
        this.inputs.forEach((input) => {
            input.addEventListener('input', () => {
                const isValid = this._checkValidity(this.inputs);
                this._inputValidityHandler(input);
                this._switchButton(isValid);
            })
        })}

    _checkValidity (inputList) {
    return inputList.every((input) => {
            return input.validity.valid
        })
        }

    _inputValidityHandler (input) {
        if (input.validity.valid) {
            this._closeError(input);
        }
        else {
            this._openError(input);
        }
        }

    _switchButton(isValid) {
        this.button.disabled = !isValid;
        this.button.classList.toggle(this.obj.inactiveButtonClass, !isValid);
        }

    _closeError = (input) => {
        const span = this.form.querySelector(`.${input.id}-error`);
            span.classList.remove(this.obj.errorClass);
            span.textContent = '';
            input.classList.remove(this.obj.inputErrorClass);
        }
    
    _openError = (input) => {
        const span = this.form.querySelector(`.${input.id}-error`);
        span.classList.add(this.obj.errorClass);
        span.textContent = input.validationMessage;
        input.classList.add(this.obj.inputErrorClass);
    }
}