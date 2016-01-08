$(document).ready(function () {
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
    var isHiddenFormFieldEmpty = false;

    var formFillingStartTimeInMilliseconds = null;
    var form = $('#form1');

    var inputsInContactForm = form.find('input');
    inputsInContactForm.bind('keypress change click', function () {
        if (!formFillingStartTimeInMilliseconds) formFillingStartTimeInMilliseconds = Date.now();
    });

    inputsInContactForm.bind("paste", function (e) {
        e.preventDefault();
    });

    form.submit(function (event) {
        var formFillingDurationInMilliseconds = Date.now() - formFillingStartTimeInMilliseconds;
        var formFieldValue = $("#formField").val();
        isHiddenFormFieldEmpty = formFieldValue == "";
        if (formFillingDurationInMilliseconds < minimumAcceptedFormFillingTime && !isHiddenFormFieldEmpty) {
            event.preventDefault();
            formFillingStartTimeInMilliseconds = null;
            console.log("Form submission prevented.");
        }

    });

    /* Every time the window is scrolled ... */
    $(window).scroll(function () {
        /* Check the location of each desired element */
        $('#functionsSection img, #form-div ').each(function (i) {

            var _100pxOfObject = $(this).offset().top + 100;
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if (bottom_of_window > _100pxOfObject) {
                $(this).removeClass('hide').addClass('animated transparent fadeInUpLite');
            }
        });
    });
});