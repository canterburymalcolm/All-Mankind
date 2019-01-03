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
var curItem = new Item("", "", "", 1);
var numItems = 0;
var cart = [];

function Item(name, size, color, quanity) {
    this.name = name;
    this.size = size;
    this.color = color;
    this.quanity = quanity;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart"));
    if (cart === null) {
        console.log("no cart found");
        cart = [];
    } else {
        cart.forEach(item => {
            numItems += item.quanity;
        });
        updateCart();
    }
}

function updateCart() {
    $(".cart-num").html(numItems);
    $(".cart-num").css("display", "inline");
}


$(document).foundation();

$(document).ready(function () {
    loadCart();

    //store link for mobile landing page
    $("#landing-mobile .cell img").click(function () {
        if ($(this).attr("id") == "store") {
            window.location.href = "shop.html";
        } else if ($(this).attr("id") == "extras") {
            window.location.href = "extras.html";
        } else if ($(this).attr("id") == "info") {
            window.location.href = "info.html";
        }
    });

    //click on header bubble to return to landing page
    $("#title").click(function () {
        window.location.href = '../landing.html';
    });

    //hamburg menu opening animation
    $("#hamburg").click(function () {
        console.log("hamburger");
        if ($(".menu").css("display") == "none") {
            $(".menu").css("display", "block");
            $("#hamburg").attr("src", "../assets/img/icons/ham2.png");
        } else {
            $(".menu").css("display", "none");
            $("#hamburg").attr("src", "../assets/img/icons/ham1.png");
        }
    });

    //explode snake's text bubble on hover
    $("#linkSnake").hover(
        function () {
            $("#storeSnake").attr("src", "../assets/img/store/snakeandbubble2.png");
        }, function () {
            $("#storeSnake").attr("src", "../assets/img/store/snakeandbubble.png");
        }
    );

    //select the album image that was clicked
    $(".nail").click(function () {
        $(".nail").css("opacity", ".5");
        $(this).css("opacity", "1");
        $(".primary").attr("src", $(this).children('img').attr("src"));
    });

    //increment and decrement quantity
    $(".select-num .dec, .select-num .inc").click(function () {
        var num = parseInt($(".select-num .num").html());
        if ($(this).hasClass("inc")) {
            num += 1;
        } else if (num > 1) {
            num -= 1;
        }
        $(".select-num .num").html(num);
        curItem.quanity = num;
    });

    //color select-size buttons on click and set size of curItem
    $(".select-size .button").click(function () {
        $(".select-size").find(".button").css("background-color", "white");
        $(this).css("background-color", "gainsboro");
        curItem.size = $(this).attr("id");
    })

    //add curItem to cart
    $(".add-to-cart .button").click(function () {
        if (curItem.size != "") {
            switch ($(this).attr("id")) {
                case "the-malcolm-atc":
                    curItem.name = "THE MALCOLM";
                    numItems += curItem.quanity;
                    var clone = $.extend(true, {}, curItem);
                    cart.push(clone);
                    saveCart();
                    break;
            }
        }
    })

    //change extras icons on hover
    $(".icon a").hover(
        function () {
            $(this).parent().find(".secondary").css("display", "inline");
            $(this).parent().find(".primary").css("display", "none");
        }, function () {
            $(this).parent().find(".secondary").css("display", "none");
            $(this).parent().find(".primary").css("display", "inline");
        }
    );

    //make extras icons clickable on mobile
    $(".icon .mobile").click(function () {
        window.location.href = $(this).parent().find("a").attr("href");
    })

    //link from store to individual product pages
    $(".product").click(function () {
        window.location.href = $(this).find("a").attr("href");
    })


});


//wait for all elements of product page to load before placing the teeth in the middle of the listing div and making them visible
$(window).on("load", function () {
    $(".listing").each(function () {
        if ($(this).find(".small-teeth").is(":visible")) {
            var rad = ($(window).height() / 2);
            $(window).scrollTop();
            var botOff = $(this).find("#small-bot-img").offset().top - rad - 23;
            var topOff = rad - $(this).find("#small-top-img").offset().top - 24;
            $(this).find("#small-bot-img").css("transform", "translateY(-" + botOff + "px)");
            $(this).find("#small-top-img").css("transform", "translateY(" + topOff + "px)");
            $(this).find(".small-top-mask").css("height", topOff + 24);
            $(this).find(".small-bottom-mask").css("height", botOff - 23);
            $(this).css("opacity", "1");
        } else {
            var rad = $(this).find(".desc-grid").height() / 2;
            var botOff = rad + 10;
            var topOff = rad + 15;
            $(this).find("#large-bot-img").css("transform", "translateY(-" + botOff + "px)");
            $(this).find("#large-top-img").css("transform", "translateY(" + topOff + "px)");
            $(this).find(".large-top-mask").css("height", topOff - 40);
            $(this).find(".large-bottom-mask").css("height", botOff - 23);
            $(this).css("opacity", "1");
        }
    });
});





















