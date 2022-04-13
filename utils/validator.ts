import textForApp from '../constants/translate';

const checkPasswordInput = (e, lang) => {
    let message = '';

    if (!e.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
        message = `${textForApp[lang].message[1]}`;
    }

    e.target.setCustomValidity(message);
};

const checkForEmptiness = (inputId, lang, isForSignUp) => {
    const nameInput = document.getElementById(`${inputId}-name`) as HTMLTextAreaElement;
    const passwordInput = document.getElementById(`${inputId}-password`) as HTMLTextAreaElement;
    const confirmInput = document.getElementById(`${inputId}-confirm`) as HTMLTextAreaElement;
    if (nameInput?.value === '') {
        nameInput?.setCustomValidity(textForApp[lang].message[0]);
        nameInput?.reportValidity();

        return false;
    }

    if (passwordInput?.value === '') {
        passwordInput?.setCustomValidity(textForApp[lang].message[0]);
        passwordInput?.reportValidity();

        return false;
    }

    if (isForSignUp && confirmInput?.value === '') {
        confirmInput.setCustomValidity(textForApp[lang].message[0]);
        confirmInput.reportValidity();

        return false;
    }

    return true;
};

const checkConfirm = (el, password, lang) => {
    if (el.target.value !== password) {
        el.target.setCustomValidity(textForApp[lang].message[2]);
    } else {
        el.target.setCustomValidity('');
    }
};

const checkNumber = (number, inputValue, maxLength) => {
    let cows = 0;
    let bulls = 0;
    for (let i = 0; i < maxLength; i += 1) {
        if (inputValue[i] === number[i]) {
            bulls += 1;
        } else if (number.includes(inputValue[i])) {
            cows += 1;
        }
    }

    return { cows, bulls };
};

export {
    checkNumber,
    checkPasswordInput,
    checkForEmptiness,
    checkConfirm,
};
