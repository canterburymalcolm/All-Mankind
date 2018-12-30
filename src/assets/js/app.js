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

    $("#sneakyLink").click(function(){
        window.location.href = 'landing.html';
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

    $("#linkSnake").hover(
        function() {
            $("#storeSnake").attr("src", "../assets/img/snakeandbubble2.png");
        }, function() {
            $("#storeSnake").attr("src", "../assets/img/snakeandbubble.png");
        });
});
