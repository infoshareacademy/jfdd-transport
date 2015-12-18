//Start form validation
(function (){
    var form, userName, userEmail, userPhoneNumber, submitBtn, isNameValid, isEmailValid, isPhoneValid;
    isNameValid = true;
    isEmailValid = true;
    isPhoneValid = true;

    //Disable HTML5 validation
    form = document.getElementById('form1');
    form.noValidate = true;

    //Validate user input
    userName = document.getElementById('name');
    userEmail = document.getElementById('email');
    userPhoneNumber = document.getElementById('phone');
    submitBtn = document.getElementById('button-gray');

    userName.addEventListener('blur', checkName, false);
    userEmail.addEventListener('blur', checkEmail, false);
    userPhoneNumber.addEventListener('blur', checkPhone, false);

    function checkName() {
        isNameValid = true; //Used to reset the value back to true if user clears rejected input.
        clearValidationMessage(userName);

        if (!userName.value || (userName.value === userName.placeholder)) {
            return;
        }

        isNameValid = /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ \-]+$/.test(userName.value);

        if (!isNameValid) {
            createValidationMessage('To pole nie akceptuje cyfr ani znaków specjalnych.', userName);
        }
    }

    function checkEmail() {
        isEmailValid = true;
        clearValidationMessage(userEmail);
        clearValidationMessage(submitBtn);

        if (!userEmail.value || (userEmail.value === userEmail.placeholder)) {
            return;
        }

        isEmailValid = /[^@]+@[^@]+/.test(userEmail.value);

        if (!isEmailValid) {
            createValidationMessage('Podaj adres e-mail w formacie użytkownik@example.com.', userEmail);
        }
    }

    function checkPhone() {
        isPhoneValid = true;
        clearValidationMessage(userPhoneNumber);
        clearValidationMessage(submitBtn);

        if (!userPhoneNumber.value || (userPhoneNumber.value === userPhoneNumber.placeholder)) {
            return;
        }

        isPhoneValid = /^(\+48)? ?[1-9]( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?/
            .test(userPhoneNumber.value);

        if (!isPhoneValid) {
            createValidationMessage('Podaj numer telefonu stacjonarnego lub komórkowego.', userPhoneNumber);
        }
    }

    //When form is submitted, check whether either an email or a phone number has been provided
    form.addEventListener('submit', validateRequired, false);

    function validateRequired(e) {
        clearValidationMessage(submitBtn);

        if(!isNameValid || !isEmailValid || !isPhoneValid) {
            e.preventDefault();
            return;
        }

        if ((!userEmail.value || (userEmail.value === userEmail.placeholder)) &&
            (!userPhoneNumber.value || (userPhoneNumber.value === userPhoneNumber.placeholder))) {
            createValidationMessage('Podaj adres e-mail lub numer telefonu.', submitBtn);
            e.preventDefault();
        } else {
            submitBtn.setAttribute('disabled', 'disabled');
        }
    }

    //Helper functions for creating and removing validation messages
    function createValidationMessage(message, el){
        var messageEl, parentEl;
        messageEl = document.createElement('span');
        messageText = document.createTextNode(message);
        messageEl.appendChild(messageText);
        messageEl.className = 'validationTip';
        messageEl.id = el.id + 'validationMessage';
        parentEl = el.parentNode;
        parentEl.insertBefore(messageEl, parentEl.lastChild);
    }

    function clearValidationMessage(el) {
        var elId, element;
        elId = el.id + 'validationMessage';

        if (document.getElementById(elId)) {
            element = document.getElementById(elId);
            element.parentNode.removeChild(element);
        }
    }
}());
//End form validation
