function enableValidation (obj) {
    const forms = Array.from(document.querySelectorAll(obj.formSelector));

    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
        const button = form.querySelector(obj.submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                const isValid = checkValidity(inputs);
                inputValidityHandler(isValid, input, obj.errorClass, button, obj.inactiveButtonClass);
            })
        })
    })
}

function checkValidity (inputList) {
    return inputList.every((input) => {
        return input.validity.valid
    })
  }

function inputValidityHandler (isValid, input, error, button, inactiveButtonClass) {
    if (input.validity.valid) {
        closeError(input, error);
        disabledButton(button, inactiveButtonClass, isValid);
    }
    else {
        openError(input, error);
        disabledButton(button, inactiveButtonClass, isValid);
    }
  }

const closeError = (input, error) => {
    const span = document.querySelector(`.${input.id}-error`);
        span.classList.remove(error);
        span.textContent = '';
  }

const openError = (input, error) => {
    const span = document.querySelector(`.${input.id}-error`);
    span.classList.add(error);
    span.textContent = input.validationMessage;
}

  function disabledButton(button, inactiveButtonClass, isValid) {
    isValid ? button.classList.remove(inactiveButtonClass) : button.classList.add(inactiveButtonClass);
  }




// Когда идёт вызов функции func() -> смотрим где создаётся функция и как она работает