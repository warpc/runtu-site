$(document).ready(function() {
    //DotDotDot Plugin
    $(".hdot").dotdotdot();
    $(".dot").dotdotdot({after: "a.readmore"});
    $('#myTab li a').click(function () {
        setTimeout(function () {
            $(window).resize();
        }, 100);
    });
    
    $('.more').click(function() {
        var id = $(this).attr('id');
        if ($(this).hasClass('hided')) {
            $(this).removeClass('hided');
            $(this).html('Cкрыть полный список включенного в состав дистрибутива программного обеспечения');
            $('#' + id + '-content').slideToggle(300);
        } else {
            $(this).addClass('hided');
            $(this).html('Раскрыть полный список включенного в состав дистрибутива программного обеспечения');
            $('#' + id + '-content').slideToggle(300);
        }
        return false;
    });
});
    //Styleable Select
$(function(){ 
    $('select').each(function(){ 
        var sel = new Select({ 
            el: this, className: $(this).attr('data-className'),
        }); 
        sel.on('change', function() {
            $(sel.target).addClass('RUNTU');
        });
        
    });
});
