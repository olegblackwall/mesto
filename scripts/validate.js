function enableValidation (obj) {
    const forms = Array.from(document.querySelectorAll(obj.formSelector));

    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
        const button = form.querySelector(obj.submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                const isValid = checkValidity(inputs);
                inputValidityHandler(isValid, input, obj.errorClass, button, obj.inactiveButtonClass, obj.inputErrorClass, form);
                switchButton(button, obj.inactiveButtonClass, isValid);
            })
        })
    })
}

function checkValidity (inputList) {
    return inputList.every((input) => {
        return input.validity.valid
    })
  }

function inputValidityHandler (isValid, input, error, button, inactiveButtonClass, inputErrorClass, form) {
    if (input.validity.valid) {
        closeError(input, error, inputErrorClass, form);
    }
    else {
        openError(input, error, inputErrorClass, form);
    }
  }

const closeError = (input, error, inputErrorClass, form) => {
    const span = form.querySelector(`.${input.id}-error`);
        span.classList.remove(error);
        span.textContent = '';
        input.classList.remove(inputErrorClass);
  }

const openError = (input, error, inputErrorClass, form) => {
    const span = form.querySelector(`.${input.id}-error`);
    span.classList.add(error);
    span.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
}

  function switchButton(button, inactiveButtonClass, isValid) {
    button.disabled = !isValid;
    button.classList.toggle(inactiveButtonClass, !isValid);
  }