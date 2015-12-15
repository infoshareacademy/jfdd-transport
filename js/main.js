/**
 * Created by wprzebieracz on 15.12.15.
 */
$(document).ready(function(){
    /**
     * Minimum time that must take a user from initiating the form completion
     * to the form submission in order for the submission to completed.
     *
     * If the time to complete and submit the form is less than
     * formFillingTimeThreshold, the sumbission will be prevented.
     * @type {number}
     */
    var formFillingTimeThreshold = 100;

    /**
     * Hidden honeypot field.
     * If set to true, form submission will be prevented.
     * @type {boolean}
     */
    var isFormFieldEmpty = false;

    var formFillingStartTimeInMilliseconds= null;

    console.log(formFillingStartTimeInMilliseconds);

    $('#form1 input').bind('keypress change click', function () {
        if (!formFillingStartTimeInMilliseconds) formFillingStartTimeInMilliseconds = Date.now();
        console.log(formFillingStartTimeInMilliseconds);
    });

    $('#form1 input').bind("paste",function(e) {
        e.preventDefault();
    });

    $('#form1').submit(function (event) {
        var formFillingDurationInMilliseconds = Date.now() - formFillingStartTimeInMilliseconds;
        var formFieldValue = $("#formField").val();
        isFormFieldEmpty = formFieldValue == "" ? true : false;
        if (formFillingDurationInMilliseconds < formFillingTimeThreshold && !isFormFieldEmpty ) {
            event.preventDefault();
            formFillingStartTimeInMilliseconds = null;
            console.log("Form submission prevented.");
        }

    });
});