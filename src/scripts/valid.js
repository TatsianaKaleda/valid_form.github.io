let isFormValid = false;

document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('form');
    form.addEventListener("blur", function (event) {
        validateForm(event.target.name, event.target.value);
    }, true);

    form.addEventListener('submit', function (event) {
        submitForm(event);
    }, true)
});

function validateForm(formFieldName, formFieldValue) {
    if (formFieldName !== 'submit') {
        let domElementByName = document.getElementsByName(formFieldName)[0];
        let parentDomElementByName = domElementByName.parentElement;
        if (!isFieldValid(formFieldName, formFieldValue)) {
            isFormValid = false;
            domElementByName.classList.add('control-error');
            if (!isHasErroMessage(formFieldName)) {
                let fieldError = document.createElement('P');
                let fieldErrorValue = document.createTextNode("ERROR");
                fieldError.appendChild(fieldErrorValue);
                fieldError.setAttribute('id', formFieldName + '-error');
                fieldError.setAttribute('class', 'error');
                parentDomElementByName.appendChild(fieldError);
            }
        } else {
            domElementByName.classList.remove('control-error');
            if (isHasErroMessage(formFieldName)) {
                let errorHint = document.getElementById(formFieldName + '-error');
                errorHint.remove();
            }
        }
    }
}

function isFieldValid(formFieldName, formFieldValue) {
    return isFieldEmpty(formFieldValue) && isValid(formFieldName, formFieldValue);
}

function isFieldEmpty(formFieldValue) {
    return !!formFieldValue;
}

function isValid(formFieldName, formFieldValue){
    switch (formFieldName) {
        case 'email':
            return isEmailValid(formFieldValue);
            break;
        case 'siteurl':
            return isUrlValid(formFieldValue);
            break;
        default:
            return true;
    }
}


function isHasErroMessage(formFieldName) {
    return !!document.getElementById(formFieldName + '-error');
}


function isEmailValid(formFieldValue) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return formFieldValue.match(regexp);
}

function isUrlValid(formFieldValue) {
    const regexp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    return formFieldValue.match(regexp);
}

function submitForm(event) {
    isFormValid = true;

    let formItems = document.getElementsByClassName('form-control');
    for (let i = 0; i < formItems.length; i ++) {
        let formFieldName = formItems[i].name;
        let formFieldValue = formItems[i].value;
        validateForm(formFieldName, formFieldValue);
    }

    if (!isFormValid) {
        event.preventDefault();
        document.getElementsByClassName('control-error')[0].focus();
    }
}