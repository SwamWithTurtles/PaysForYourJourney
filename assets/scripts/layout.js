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
        var doAnimate = false;
        var c1LeftTarget = (pageWidth / 2) - circleWidth / 2 - 90;
        var c2LeftTarget = ($(window).width() / 2) - circleWidth/2 + 90;


        //make them visible and lock the page to the correct size
        $("#circleContainer").css("display", "block");
        $("#circleContainer").css("width", pageWidth);

        $("#circle1").css("display","block");
        $("#circle2").css("display","block");

        //Don't animate except on homepage
        if (window.location.href.toString().split(window.location.host)[1] == '/'){
            doAnimate = true;
        }

        if (doAnimate) {

            $("#circle1").css("left",(0 - circleWidth));
            $("#circle2").css("left",$(window).width());

            $("#circle1").animate({
                left: c1LeftTarget
            }, 1500, function () {
                // Animation complete.
            });

            $("#circle2").animate({
                left: c2LeftTarget
            }, 1500, function() {
                // Animation complete.
            });
        }
        else {
            $("#circle1").css("left", c1LeftTarget);
            $("#circle2").css("left", c2LeftTarget);
        }






    }


});
