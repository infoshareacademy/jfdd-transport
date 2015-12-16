//Start form validation
(function (){
    var form, name, email, phoneNumber;

    //Disable HTML5 validation
    form = document.getElementById('form1');
    form.noValidate = true;

    //Validate user input
    name = document.getElementById('name');
    email = document.getElementById('email');
    phoneNumber = document.getElementById('phone');

    name.addEventListener('blur', checkName, false);
    email.addEventListener('blur', checkEmail, false);
    phoneNumber.addEventListener('blur', checkPhone, false);

    function checkName() {
        if (!name.value || (name.value === name.placeholder)) {
            return;
        }
        var isValid = /[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ -]+/.test(name.value);
        if (!isValid) {
            alert('To pole nie akceptuje cyfr ani znaków specjalnych.');
            //TODO Display tip for the user
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
        if ((!email.value || (email.value === email.placeholder)) &&
            (!phoneNumber.value || (phoneNumber.value === phoneNumber.placeholder))) {
            createValidationMessage('Podaj adres e-mail lub numer telefonu.', phoneNumber);
            e.preventDefault();

        } else {
            clearValidationMessage(phoneNumber.name);
            alert('Twoje dane zostały wysłane. Dziękujemy!');
        }
    }

    function createValidationMessage(message, el){
        var messageEl, parentEl;
        messageEl = document.createElement('span');
        messageText = document.createTextNode(message);
        messageEl.appendChild(messageText);
        messageEl.className = 'validationTip';
        messageEl.id = el.name;
        parentEl = el.parentNode;
        parentEl.insertBefore(messageEl, parentEl.lastChild);
    }

    function clearValidationMessage(id) {
        if(document.getElementById(id)) {
            var element = document.getElementById(id);
            element.parentNode.removeChild(element);
        }
    }
}());
//End form validation
