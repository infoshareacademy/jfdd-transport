$(document).ready(function() {

    var functionContainer = $('.functionContainer');
    functionContainer.hide();

    var oldSelection = null;

    var functionsContents = {
        busStop: "Wybierz z listy swój przystanek i dowiedz się o aktualnej sytuacji.",
        delayStats: "Informacje o opóźnieniach dla wybranego przystanku.",
        checkMap: "Zlokalizuj swój pojazd na mapie."
    };

    $('nav a, .logo').click(function(){
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
                $('html, body').animate({
                    scrollTop: $('#functionsSection').offset().top - 60
                }, 100);

                functionContainer.html(functionsContents[self.data('functionname')])
            }
        }
        else {
            // show function
            $('#functionsSection').addClass('functionActive');
            oldSelection = self;
            self.addClass('functionSelected');
            // animate to function sections
            $('html, body').animate({
                scrollTop: $('#functionsSection').offset().top - 60
            }, 100);
            // show additional functions
            $('.additionalFunctionsSection').slideUp(200);

            functionContainer.html(functionsContents[self.data('functionname')])
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