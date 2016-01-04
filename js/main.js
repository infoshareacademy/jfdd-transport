/**
 * Created by wprzebieracz on 15.12.15.
 */
$(document).ready(function(){
    /**
     * Minimum time that must take a user from initiating the form completion
     * to the form submission in order for the submission to completed.
     *
     * If the time to complete and submit the form is less than
     * minimumAcceptedFormFillingTime, the sumbission will be prevented.
     * @type {number}
     */
    var minimumAcceptedFormFillingTime = 100;

    /**
     * Hidden honeypot field.
     * If set to false, form submission will be prevented.
     * @type {boolean}
     */
    var isFormFieldEmpty = false;

    var formFillingStartTimeInMilliseconds= null;
    var form = $('#form1');

    var inputsInContactForm = form.find('input');
    inputsInContactForm.bind('keypress change click', function () {
        if (!formFillingStartTimeInMilliseconds) formFillingStartTimeInMilliseconds = Date.now();
    });

    inputsInContactForm.bind("paste",function(e) {
        e.preventDefault();
    });

    form.submit(function (event) {
        var formFillingDurationInMilliseconds = Date.now() - formFillingStartTimeInMilliseconds;
        var formFieldValue = $("#formField").val();
        isFormFieldEmpty = formFieldValue == "";
        if (formFillingDurationInMilliseconds < minimumAcceptedFormFillingTime && !isFormFieldEmpty ) {
            event.preventDefault();
            formFillingStartTimeInMilliseconds = null;
            console.log("Form submission prevented.");
        }

    });
});