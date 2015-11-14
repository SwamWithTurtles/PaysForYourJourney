/** Layout helper functions **/

define(["jquery"], function($) {


    //On ready do the animation
    $(document).ready(function() {

        AnimateCircles();

    });

    //On page resize reanimate the circles
    $(window).resize(function () {
        AnimateCircles();
    });

    //Animate the background circles
    function AnimateCircles(){
        var circleWidth = $("#circle1").width();
        var pageWidth = $(window).width();


        $("#circle1").css("left",(0 - circleWidth));

        $("#circle1").animate({
            left: (pageWidth / 2) - circleWidth/2 - 90
        }, 1500, function() {
            // Animation complete.
        });


        $("#circle2").css("left",$(window).width());

        $("#circle2").animate({
            left: ($(window).width() / 2) - circleWidth/2 + 90
        }, 1500, function() {
            // Animation complete.
        });
    }


});
