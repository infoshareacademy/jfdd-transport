$(document).ready(function() {

    var functionContainer = $('.functionContainer');
    functionContainer.hide();

    var oldSelection = null;

    var functionsContents = {
        busStop_pl: "Wybierz z listy swój przystanek i dowiedz się o aktualnej sytuacji.",
        delayStats_pl: "Informacje odnośnie opóźnień dla wybranego przystanku.",
        checkMap_pl: "Zlokalizuj swój pojazd na mapie.",
        busStop_en: "Choose your stop from a list and get all the current information you need.",
        delayStats_en: "Choose a stop and get all the information about delays.",
        checkMap_en: "Locate your bus or tram on the map."
    };

    $('nav a, .logo, .languageNavItem').click(function(){
        clearFunctionSelecion();
    });

    $('.function').click(function(){

        var self = $(this);

        if ($('#functionsSection').hasClass('functionActive')) {
            // check for selected function
            if (self.is(oldSelection)){
                clearFunctionSelecion();
            } else {
                oldSelection.removeClass('functionSelected');
                oldSelection = self;
                self.addClass('functionSelected');
                // animate to function sections
                //$('html, body').animate({
                //    scrollTop: $('#functionsSection').offset().top - 60
                //}, 100);

                if (window.innerWidth > 750) {$('html, body').animate({
                    scrollTop: $('#functionsSection').offset().top - 60
                }, 100);}
                else {{$('html, body').animate({
                    scrollTop: $('.additionalFunctionsSection').offset().top - 200
                }, 100);}}


                functionContainer.html(functionsContents[self.data('functionname') + '_' + getAppLanguage()])
            }
        }
        else {
            // show function
            $('#functionsSection').addClass('functionActive');
            oldSelection = self;
            self.addClass('functionSelected');
            // animate to function sections
           if (window.innerWidth > 750) {$('html, body').animate({
                scrollTop: $('#functionsSection').offset().top - 60
            }, 100);}
            else {{$('html, body').animate({
               scrollTop: $('.additionalFunctionsSection').offset().top - 200
           }, 100);}}

            // show additional functions
            $('.additionalFunctionsSection').slideUp(200);

            functionContainer.html(functionsContents[self.data('functionname') + '_' + getAppLanguage()])
            // show function container
            functionContainer.slideDown(200);
        }
    });
});

var clearFunctionSelecion = function() {

    if ($('#functionsSection').hasClass('functionActive')) {
        $('#functionsSection').removeClass('functionActive');
        // hide additional functions
        $('.additionalFunctionsSection').slideDown(200);
        // hide function container
        $('.functionContainer').slideUp(200);
        $('.functionSelected').removeClass('functionSelected');
    }
};