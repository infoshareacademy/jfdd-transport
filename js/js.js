//Start form validation
var initFormValidation = function () {
        var form, userName, userEmail, userPhoneNumber, submitButton, isNameValid, isEmailValid, isPhoneValid;
        isNameValid = true;
        isEmailValid = true;
        isPhoneValid = true;

        var messages = {
            fullname_pl: 'To pole nie akceptuje cyfr ani znaków specjalnych.',
            fullname_en: 'This field does not accept numerals or special characters.',
            email_pl: 'Podaj adres e-mail w formacie użytkownik@example.com.',
            email_en: 'Enter your e-mail address in following format user@example.com',
            phone_pl: 'Podaj numer telefonu stacjonarnego lub komórkowego.',
            phone_en: 'Enter a mobile or home phone number.',
            submit_pl: 'Podaj adres e-mail lub numer telefonu.',
            submit_en: 'Enter your e-mail address or mobile number.'
        }

        //Disable HTML5 validation
        form = document.getElementById('form1');
        form.noValidate = true;

        //Validate user input
        userName = document.getElementById('name');
        userEmail = document.getElementById('email');
        userPhoneNumber = document.getElementById('phone');
        submitButton = document.getElementById('button-gray');

        userName.addEventListener('blur', checkName, false);
        userEmail.addEventListener('blur', checkEmail, false);
        userPhoneNumber.addEventListener('blur', checkPhone, false);

        function checkName() {
            debugger;
            isNameValid = true; //Used to reset the value back to true if user clears rejected input.
            clearValidationMessage(userName);

            if (!userName.value || (userName.value === userName.placeholder)) {
                return;
            }
            //Accept small and capital letters (including Polish diacritics),
            //spaces and hyphens (for hyphenated surnames)
            isNameValid = /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ \-]+$/.test(userName.value);

            if (!isNameValid) {
                createValidationMessage(messages['fullname_' + getAppLanguage()], userName);
            }
        }

        function checkEmail() {
            isEmailValid = true;
            clearValidationMessage(userEmail);
            clearValidationMessage(submitButton);

            if (!userEmail.value || (userEmail.value === userEmail.placeholder)) {
                return;
            }

            isEmailValid = /[^@]+@[^@]+/.test(userEmail.value);

            if (!isEmailValid) {
                createValidationMessage(messages['email_' + getAppLanguage()], userEmail);
            }
        }

        function checkPhone() {
            isPhoneValid = true;
            clearValidationMessage(userPhoneNumber);
            clearValidationMessage(submitButton);

            if (!userPhoneNumber.value || (userPhoneNumber.value === userPhoneNumber.placeholder)) {
                return;
            }
            //Accept Polish phone numbers, optionally with the area code of +48,
            //with optional spaces and/or hyphens between digits
            isPhoneValid = /^(\+48)? ?[1-9]( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?\d( |-)?/
                .test(userPhoneNumber.value);

            if (!isPhoneValid) {
                createValidationMessage(messages['phone_' + getAppLanguage()], userPhoneNumber);
            }
        }

        //When form is submitted, check whether either an email or a phone number has been provided
        form.addEventListener('submit', validateRequired, false);
        function validateRequired(e) {
            clearValidationMessage(submitButton);

            if (!isNameValid || !isEmailValid || !isPhoneValid) {
                e.preventDefault();
                return;
            }

            if ((!userEmail.value || (userEmail.value === userEmail.placeholder)) &&
                (!userPhoneNumber.value || (userPhoneNumber.value === userPhoneNumber.placeholder))) {
                createValidationMessage(messages['submit_' + getAppLanguage()], submitButton);
                e.preventDefault();
            } else {
                submitButton.setAttribute('disabled', 'disabled');
            }
        }

        //Helper functions for creating and removing validation messages
        function createValidationMessage(message, el) {
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
};
//End form validation
