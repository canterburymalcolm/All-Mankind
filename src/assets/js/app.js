import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

$(document).ready(function(){
    //store link for mobile landing page
    $("#store").click(function(){
        console.log("clicked");
        window.location.href = 'shop.html';
    });

    //click on header bubble to return to landing page
    $("#title").click(function(){
        window.location.href = '../landing.html';
    });

    //hamburg menu opening animation
    $("#hamburg").click(function(){
        console.log("hamburger");
        if ($(".menu").css("display") == "none") {
            $(".menu").css("display", "block");
            $("#hamburg").attr("src", "../assets/img/ham2.png");
        } else {
            $(".menu").css("display", "none");
            $("#hamburg").attr("src", "../assets/img/ham1.png");
        }
    });

    //explode snake's text bubble on hover
    $("#linkSnake").hover(
        function() {
            $("#storeSnake").attr("src", "../assets/img/snakeandbubble2.png");
        }, function() {
            $("#storeSnake").attr("src", "../assets/img/snakeandbubble.png");
        });

    //select the album image that was clicked
    $(".nail").click(function() {
        $(".nail").css("opacity", ".5");
        $(this).css("opacity", "1");
        $(".primary").attr("src", $(this).children('img').attr("src"));
    });

    //wait for all elements of product page to load before placing the teeth in the middle of the listing div and making them visible
    $(window).on("load", function() {
        $(".listing").each(function() {
            var topRad = ($(this).height() / 2) - 10; 
            var botRad = ($(this).height() / 2) - 65; 
            var rad = ($(this).height() / 2) * .89;
            $(this).find("#botImg").css("transform", "translateY(-"+ rad +"px)");
            $(this).find("#topImg").css("transform", "translateY("+ rad +"px)");
            $(this).find(".topMask").css("height", topRad);
            $(this).find(".bottomMask").css("height", botRad);
            $(this).find(".bottomTeeth, .topTeeth").css("display", "block");
            $(this).find(".item").css("opacity", "1");
        });    
    });
});


























