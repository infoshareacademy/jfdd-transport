/**
 * Created by anna on 13.01.16.
 */
$(document).ready(function() {
    $('.function1').click(function(){
        var div = $(this).attr('div');
        $('#opis1').load(div);
        return false
    });
});