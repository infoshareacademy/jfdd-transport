//Start form validation
(function (){
    var form, userName, userEmail, userPhoneNumber;

    //Disable HTML5 validation
    form = document.getElementById('form1');
    form.noValidate = true;

    //Validate user input
    userName = document.getElementById('name');
    userEmail = document.getElementById('email');
    userPhoneNumber = document.getElementById('phone');

    userName.addEventListener('blur', checkName, false);
    userEmail.addEventListener('blur', checkEmail, false);
    userPhoneNumber.addEventListener('blur', checkPhone, false);

    function checkName() {
        if (!userName.value || (userName.value === userName.placeholder)) {
            return;
        }
        var isValid = /[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ -]+/.test(userName.value);
        if (!isValid) {
            createValidationMessage('To pole nie akceptuje cyfr ani znaków specjalnych.', userName, userName);
        } else {
            clearValidationMessage(userName);
        }
    }

    function checkEmail() {
        //TODO
    }

    function checkPhone() {
        //TODO
    }

    //When form is submitted, check whether either an email or a phone number has been provided
    form.addEventListener('submit', validateRequired, false);
    function validateRequired(e) {
        clearValidationMessage(userPhoneNumber);
        if ((!userEmail.value || (userEmail.value === userEmail.placeholder)) &&
            (!userPhoneNumber.value || (userPhoneNumber.value === userPhoneNumber.placeholder))) {
            createValidationMessage('Podaj adres e-mail lub numer telefonu.', userPhoneNumber, userPhoneNumber);

            e.preventDefault();
        } else {
            alert('Twoje dane zostały wysłane. Dziękujemy!');
            //TODO disable the submit button on send
        }
    }

    function createValidationMessage(message, el, newId){
        var messageEl, parentEl;
        messageEl = document.createElement('span');
        messageText = document.createTextNode(message);
        messageEl.appendChild(messageText);
        messageEl.className = 'validationTip';
        messageEl.id = newId;
        parentEl = el.parentNode;
        parentEl.insertBefore(messageEl, parentEl.lastChild);
    }

    function clearValidationMessage(idToClear) {
        if(document.getElementById(idToClear)) {
            var element = document.getElementById(idToClear);
            element.parentNode.removeChild(element);
        }
    }
}());
//End form validation
