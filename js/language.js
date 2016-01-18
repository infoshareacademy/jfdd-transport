$(document).ready(function() {
    var selectLanguage = function(language) {
        selectedLanguage = language;
        if (language == "pl") {
            $('.pl').show();
            $('.en').hide();
        } else if (language == "en") {
            $('.pl').hide();
            $('.en').show();
        }

        // load form
        $('#formSection').load('templates/form_' + language + '.html', function() {
            initFormValidation();
        });

        $('html, body').animate({
            scrollTop: 0
        }, 300);
    };
    // set default language to pl
    selectLanguage('pl');


    $(".languageNavItem").click(function(){
        var self = $(this);
        var currentLanguage = self.data("lang");
        selectLanguage(currentLanguage);
    });
});

var selectedLanguage = null;
var getAppLanguage = function() {
    return selectedLanguage;
}
