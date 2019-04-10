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
//require('./lib/zoom-master/jquery.zoom');
var curItem = new Item("", "medium", "", 1);
var numItems = 0;
var cart = [];
var shipping = 5;
var panelImages = [];
var panelIndex = 0;

panelImages.push([
    "looks/zero/zero-crowd.jpg",
    "looks/zero/zero-black.jpg",
    "looks/zero/zero-booth.jpg",
    "looks/zero/zero-close.jpg",
    "looks/zero/zero-fence.jpg",
    "looks/zero/zero-leafs.jpg",
    "looks/zero/zero-loiter.jpg"
]);

panelImages.push([
    "looks/one/one-white.jpg",
    "looks/one/one-bars.jpg",
    "looks/one/one-gochu.jpg",
    "looks/one/one-face.jpg",
    "looks/one/one-rocky.jpg",
    "looks/one/one-laces.jpg",
    "looks/one/one-squat.jpg",
    "looks/one/one-squint.jpg",
    "looks/one/one-bus.jpg",
    "looks/one/one-holes.jpg",
    "looks/one/one-praise.jpg",
    "looks/one/one-cute.jpg",
    "looks/one/one-art.jpg",
    "looks/one/one-dark.jpg",
    "looks/one/one-rap.jpg",
    "looks/one/one-model.jpg",
    "looks/one/one-bench.jpg",
    "looks/one/one-light.jpg"
]);

panelImages.push([
    "products/fishHeads/fish-front.png",
    "products/fishHeads/fish-close.jpg",
    "products/fishHeads/fish-face.jpg",
    "products/fishHeads/fish-squat.jpg"
]);

panelImages.push([
    "products/theJohn/john-front.png",
    "products/theJohn/john-back.png",
    "products/theJohn/john-aglets.jpg",
    "products/theJohn/john-tag.jpg",
    "products/theJohn/john-face.jpg",
    "products/theJohn/john-stairs.jpg",
    "products/theJohn/john-vest.jpg"
]);

panelImages.push([
    "products/theMalcolm/mBack.png",
    "products/theMalcolm/mFront.png",
    "products/theMalcolm/mLeaf.jpg",
    "products/theMalcolm/mStreet.jpg"
]);

panelImages.push([
    "products/thumbUp/thumb-blue-front.png",
    "products/thumbUp/thumb-blue-back.png",
    "products/thumbUp/thumb-blue-front-close.jpg",
    "products/thumbUp/thumb-blue-back-close.jpg",
    "products/thumbUp/thumb-swiss.jpg",
    "products/thumbUp/thumb-stare.jpg"
]);

panelImages.push([
    "products/theMalcolmII/single-back.jpg",
    "products/theMalcolmII/cerb-front.jpg",
    "products/theMalcolmII/cerb-aglets.jpg",
    "products/theMalcolmII/forrest-low.jpg",
    "products/theMalcolmII/forrest-mid.jpg",
    "products/theMalcolmII/cerb-store.jpg",
    "products/theMalcolmII/cerb-snow.jpg",
    "products/theMalcolmII/cerb-face.jpg"
]);

panelImages.push([
    "products/bigHead/big-h-front.png",
    "products/bigHead/big-h-back.png",
    "products/bigHead/big-h-sit.png",
    "products/bigHead/big-h-crop.png",
    "products/bigHead/big-h-pole.jpg"
]);

panelImages.push([
    "products/sixHead/six-h-front.png",
    "products/sixHead/six-h-head.jpg",
    "products/sixHead/six-h-sit.png",
    "products/sixHead/six-h-stand.jpg"
]);

function Item(name, size, color, quantity, price, total) {
    this.name = name;
    this.size = size;
    this.color = color;
    this.quantity = quantity;
    this.price = price;
    this.total = total;
}

Item.prototype.sameItem = function (other) {
    return (this.name == other.name)
        && (this.size == other.size)
        && (this.color == other.color);
}

function addItem(name, price) {
    curItem.name = name;
    curItem.price = price;
    curItem.total = curItem.quantity * curItem.price;
    numItems += curItem.quantity;
    var clone = $.extend(true, {}, curItem);
    //only add item to cart if the same item has not already
    //been added otherwise just increase quantity of existing item
    var found = false;
    cart.forEach(item => {
        if (clone.sameItem(item) && !found) {
            item.quantity += clone.quantity;
            item.total += clone.total;
            found = true;
        }
    });
    if (!found) {
        cart.push(clone);
    }
    saveCart();
}

function describeCart() {
    var desc = "";
    cart.forEach(item => {
        desc += item.name + ' ' + '(';
        if (item.color != "") {
            desc += item.color + ' - ';
        }
        desc += item.size + ')';
        if (item.quantity > 1) {
            desc += ' x ' + item.quantity;
        }
        desc += '\n';
    })
    return desc;
}

function saveCart() {
    cart.forEach(item => {
        item.total = item.price * item.quantity;
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem('shipping', JSON.stringify(shipping));
    updateCart();
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart"));
    shipping = JSON.parse(localStorage.getItem('shipping'));
    if (cart === null) {
        cart = [];
    } else {
        cart.forEach(item => {
            numItems += item.quantity;
        });
        updateCart();
        placeCart();
        placeOrder();
    }

    console.log(shipping);
    if (shipping === null) {
        shipping = 5;
    } else if (shipping === 0) {
        console.log('checking box');
        $('#local-check').prop('checked', true);
    }

    console.log(describeCart());
}

function updateCart() {
    $(".cart-num").html(numItems);
    $(".cart-num").css("display", "inline");
}

function placeCart() {
    //place html for each item in cart
    if ($(".cart").length > 0) {
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            var page = "#";
            var image;
            switch (item.name) {
                case ("THE MALCOLM"):
                    page = "the-malcolm.html";
                    image = "mBack.png";
                    break;
                case ("THE JOHN"):
                    page = "the-john.html";
                    image = "johnBack.png";
                    break;
                case ("FISH HEADS"):
                    page = "fish-heads.html";
                    image = "fishFront.png";
                    break;
                case ("THUMB UP"): 
                    page = "thumb-up.html";
                    if (item.color === "blue") {
                        image = "thumbBlueBack.png";
                    } else {
                        image = "thumbPinkBack.png";
                    }
                    break;
                case ("THE MALCOLM II"): 
                    page = "the-malcolmII.html";
                    if (item.color === "cerberus") {
                        image = "three-back.jpg";
                    } else {
                        image = "single-back.jpg";
                    }
                    break;
                case ("THE BIG-HEAD"):
                    page = "big-head.html";
                    image = "big-h-front.png";
                    break;
                case ("THE 6-HEAD"):
                    page = "six-head.html";
                    image = "six-h-front.png";
                    break;
                default:
                    page = "six-head.html";
                    image = "six-h-front.png";
            }

            var member =
                '<div class="cell small-11 large-7">' +
                '<div class="cart-member grid-x grid-margin-x">' +
                '<div class="cart-member-img cell small-4">' +
                '<a href="products/' + page + '">' +
                '<img src="assets/img/cart/' + image + '">' +
                '</a>' +
                '</div>' +
                '<div class="cart-member-info cell small-6 large-4">' +
                '<div class="cart-member-name">' +
                '<span>' + item.name + '</span>' +
                '</div>' +
                '<div class="cart-member-menus">' +
                '<ul class="dropdown-menu">';

            if (item.name != "FISH HEADS" && item.name != "THE 6-HEAD") {
                member +=
                    '<li class="size-0">' +
                    '<span>' + item.size.toUpperCase() + '</span>' +
                    '<img class="arrow" src="assets/img/cart/arrow-black.png">' +
                    '<ul class="sub-menu size-menu">' +
                    '<li class="size-1"><span>SMALL</span></li>' +
                    '<li class="size-2"><span>MEDIUM</span></li>' +
                    '<li class="size-3"><span>LARGE</span></li>' +
                    '</ul>' +
                    '</li>';
            } else if (item.name === "THE 6-HEAD") {
                member +=
                    '<li class="size-0">' +
                    '<span>' + item.size.toUpperCase() + '</span>' +
                    '<img class="arrow" src="assets/img/cart/arrow-black.png">' +
                    '<ul class="sub-menu size-menu">' +
                    '<li class="size-1"><span>SMALL</span></li>' +
                    '<li class="size-2"><span>MEDIUM</span></li>' +
                    '<li class="size-3"><span>LARGE</span></li>' +
                    '<li class="size-3"><span>X-LARGE</span></li>' +
                    '</ul>' +
                    '</li>';

            }
            member +=
                '<li class="quantity-num">' +
                '<span>QUANTITY: ' + item.quantity + '</span>' +
                '<img class="arrow" src="assets/img/cart/arrow-black.png">' +
                '<ul class="sub-menu quantity-menu">' +
                '<li class="quantity-minus"><span>-</span></li>' +
                '<li class="quantity-plus"><span>+</span></li>' +
                '</ul>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '<div class="cart-member-button">' +
                '<button type="button" id="remove" class="button medium hollow">remove</button>' +
                '</div>' +
                '<span class="cart-index">' + i + '</span>' +
                '</div>' +
                '<div class="cart-member-price cell small-2 large-4">' +
                '<span class="mobile-price">$' + item.price + '</span>' +
                '<span class="desktop-price">$' + item.price + '  x  ' + item.quantity + ' = ' + item.total + '</span>' +
                '</div>' +
                '</div>' +
                '</div>';

            $(".cart").append(member);
        }
    }
    calculateSubtotal();
}

function placeOrder() {
    //place html for each item in order
    if ($(".order").length > 0) {
        console.log("placing order");
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            var page = "#";
            var image;
            switch (item.name) {
                case ("THE MALCOLM"):
                    page = "the-malcolm.html";
                    image = "mBack.png";
                    break;
                case ("THE JOHN"):
                    page = "the-john.html";
                    image = "johnBack.png";
                    break;
                case ("FISH HEADS"):
                    page = "fish-heads.html";
                    image = "fishFront.png";
                    break;
                case ("THUMB UP"): 
                    page = "thumb-up.html";
                    if (item.color === "blue") {
                        image = "thumbBlueBack.png";
                    } else {
                        image = "thumbPinkBack.png";
                    }
                    break;
                case ("THE MALCOLM II"): 
                    page = "the-malcolmII.html";
                    if (item.color === "cerberus") {
                        image = "three-back.jpg";
                    } else {
                        image = "single-back.jpg";
                    }
                    break;
                case ("THE BIG-HEAD"):
                    page = "big-head.html";
                    image = "big-h-front.png";
                    break;
                case ("THE 6-HEAD"):
                    page = "six-head.html";
                    image = "six-h-front.png";
                    break;
                default:
                    page = "six-head.html";
                    image = "six-h-front.png";
            }

            var member =
                '<div class="cell grid-x grid-margin-x align-center">' +
                '<div class="cell small-7 large-3">' +
                '<div class="order-member grid-x grid-margin-x">' +
                '<div class="order-member-img cell small-4 large-3">' +
                '<a href="products/' + page + '">' +
                '<img src="assets/img/cart/' + image + '">' +
                '</a>' +
                '</div>' +
                '<div class="order-member-info cell small-6 large-7">' +
                '<div class="order-member-name">' +
                '<span>' + item.name + '</span>' +
                '</div>' +
                '<div class="order-member-menus">' +
                '<ul class="dropdown-menu">';

            if (item.name != "FISH HEADS") {
                member +=
                    '<li class="size-0">' +
                    '<span>' + item.size.toUpperCase() + '</span>' +
                    '</li>';
            }
            member +=
                '<li class="quantity-num">' +
                '<span>QUANTITY: ' + item.quantity + '</span>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '<div class="order-member-price cell small-2 large-2">' +
                '<span>$' + item.price + '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';

            $(".order").append(member);
        }
    }
    calculateSubtotal();
}

function calculateSubtotal() {
    var subtotal = 0;
    for (var i = 0; i < cart.length; i++) {
        subtotal += cart[i].total;
        $(".cart-index:contains(" + i + ")")
            .parents(".cart-member")
            .find(".desktop-price").html("$" + cart[i].price + "  x  " + cart[i].quantity + " = " + cart[i].total);
    }

    if (shipping === 0) {
        $('#cart-shipping').text('FREE');
    } else {
        $('#cart-shipping').text('$' + shipping);
    }
    subtotal += shipping;

    $("#subtotal > span").html("$" + subtotal);
    return subtotal;
}

function getPanels() {
    var panels = [];
    if ($('.look').length > 0) {
        switch ($('.look-title').find('h1').text()) {
            case ('Drop Zero'):
                panels = panelImages[0];
                break;
            case ('Drop One'):
                panels = panelImages[1];
                break;
            default:
                panels = [];
                break;
        }
    } else {
        switch ($('.desc-grid .title').find('span').text()) {
            case ('FISH HEADS'):
                panels = panelImages[2];
                break;
            case ('THE JOHN'):
                panels = panelImages[3];
                break;
            case ('THE MALCOLM'):
                panels = panelImages[4];
                break;
            case ('THUMB UP'):
                panels = panelImages[5];
                break;
            case ('THE MALCOLM II'):
                panels = panelImages[6];
                break;
            case ('THE BIG-HEAD'):
                panels = panelImages[7];
                break;
            case ('THE 6-HEAD'):
                panels = panelImages[8];
                break;
            default:
                panels = [];
                break;
        }
    }

    return panels;
}

function placePanels() {
    var panels = getPanels();

    var content = '';
    for (var i = 0; i < 4; i++) {
        content +=
            '<div class="panel-img cell large-2">' +
            '<img src="../assets/img/' + panels[i] + '">' +
            '</div>';
    }
    $('.panel-arrow').first().after(content);

    $('.panel-img').addClass('opaque');
    $('.panel-img').first().removeClass('opaque');
}

//update which panel is opaque
function updateSelectedPanel(dir) {
    var panels = getPanels();

    console.log(panelIndex + " to ");

    if (dir) {
        if (panelIndex === (panels.length - 1)) {
            panelIndex = 0;
        } else {
            panelIndex++
        }
    } else {
        if (panelIndex === 0) {
            panelIndex = panels.length - 1;
        } else {
            panelIndex--;
        }
    }

    console.log("     : " + panelIndex);

    $('.panel-img').addClass('opaque');
    if (panelIndex < 5) {
        $(".panel-img:nth-of-type(" + (panelIndex + 2) + ")").removeClass('opaque');
    }
}

//change the main image to the next image in the given direction
function updateMainImage(dir) {
    var panels = getPanels();

    if ((panelIndex == 3 && dir) || (panelIndex == 0 && !dir)) {
        updatePanels(!dir);
        updateSelectedPanel(dir);
    } else {
        updateSelectedPanel(dir);
    }

    $('.main-img img')
        .attr('src', '../assets/img/' + panels[panelIndex]);
}

//move all the panels in the given direction
function updatePanels(dir) {
    var panels = getPanels();

    if (dir) {
        var last = panels[panels.length - 1];
        for (var i = panels.length - 2; i > -2; i--) {
            panels[i + 1] = panels[i];
        }
        panels[0] = last;
    } else {
        var first = panels[0];
        for (var i = 1; i < panels.length; i++) {
            panels[i - 1] = panels[i];
        }
        panels[panels.length - 1] = first;

    }

    updateSelectedPanel(dir);

    $('.panel-img').each(function (i, obj) {
        $(this).children('img').attr('src', '../assets/img/' + panels[i]);
    })
}

$(document).foundation();

$(document).ready(function () {
    loadCart();

    //ICONS

    //hamburg menu opening animation
    $("#hamburger-open, #hamburger-closed").click(function () {
        if ($(".hamburger").css("display") == "none") {
            $(".hamburger").css("display", "block");
            $("#hamburger-open").css("display", "block");
            $("#hamburger-closed").css("display", "none");
        } else {
            $(".hamburger").css("display", "none");
            $("#hamburger-open").css("display", "none");
            $("#hamburger-closed").css("display", "block");
        }
    });

    //close the hamburger menu when exit is pressed
    $("#exit").click(function () {
        $(".hamburger").css("display", "none");
        $("#hamburger-open").css("display", "none");
        $("#hamburger-closed").css("display", "block");
    })

    //color the navbar link for the current page
    if ($(".store").length > 0) {
        $("#navStore").css("color", "#1779ba");
    } else if ($(".info").length > 0) {
        $("#navInfo").css("color", "#1779ba");
    } else if ($(".extras").length > 0) {
        $("#navExtras").css("color", "#1779ba");
    } else if ($(".lookbook").length > 0) {
        $("#navLook").css("color", "#1779ba");
    } else if ($(".contact").length > 0) {
        $("#navContact").css("color", "#1779ba");
    }

    //STORE

    //explode snake's text bubble on hover
    $("#linkSnake").hover(
        function () {
            $("#storeSnake").attr("src", "../assets/img/store/snakeandbubble2.png");
        }, function () {
            $("#storeSnake").attr("src", "../assets/img/store/snakeandbubble.png");
        }
    );


    //PRODUCT PAGES

    //select the album image that was clicked
    $(".nail").click(function () {
        $(".nail").css("opacity", ".5");
        $(this).css("opacity", "1");
        $(".primary").attr("src", $(this).children('img').attr("src"));
    });

    //zoom into images on hover
    // $(".item-image").hover(function () {
    //     $(this).zoom({
    //         url: $(".primary").attr("src"),
    //         magnify: 1.5
    //     });
    // });

    //link from store to individual product pages
    $(".product").click(function () {
        window.location.href = $(this).find("a").attr("href");
    })

    //increment and decrement quantity
    $(".select-num .dec, .select-num .inc").click(function () {
        var num = parseInt($(".select-num .num").html());
        if ($(this).hasClass("inc")) {
            num += 1;
        } else if (num > 1) {
            num -= 1;
        }
        $(".select-num .num").html(num);
        curItem.quantity = num;
    });

    function setProductPics(old, current) {
        var panels = getPanels();
        var regex = new RegExp(old, "g");

        for (var i = 0; i < panels.length; i++) {
            panels[i] = panels[i].replace(regex, current)
        }

        $('.main-img img').attr('src', $('.main-img img').attr('src').replace(regex, current));

        $('.panel-img').each(function (i, obj) {
            $(this).children('img').attr('src', '../assets/img/' + panels[i]);
        })
    }


    //color select-size buttons on click and set size of curItem
    $(".select-size .button, .select-color .button").click(function () {
        $(this).parent().find(".button").css("background-color", "white");
        if ($(this).is("#pink")) {
            $(this).css("background-color", "#f6e8ed");
            $("#blue").css("background-color", "white");
            curItem.color = "pink";
            setProductPics("blue", "pink");
        } else if ($(this).is("#blue")) {
            $(this).css("background-color", "#bccce2");
            $("#pink").css("background-color", "white");
            curItem.color = "blue";
            setProductPics("pink", "blue");
        } else if ($(this).is("#three")) {
            $(this).css("background-color", "gainsboro");
            $("#single").css("background-color", "white");
            curItem.color = "cerberus";
            setProductPics("single", "three");
        } else if ($(this).is("#single")) {
            $(this).css("background-color", "gainsboro");
            $("#three").css("background-color", "white");
            curItem.color = "regular";
            setProductPics("three", "single");
        } else {
            $(this).css("background-color", "gainsboro");
            curItem.size = $(this).attr("id");
        }
    })

    //add curItem to cart
    $(".add-to-cart .button").click(function () {
        switch ($(this).attr("id")) {
            case "the-malcolm-atc":
                break;
            case "thumb-up-atc":
                if (curItem.color === "") {
                    curItem.color = "blue";
                }
                addItem("THUMB UP", 30);
                break;
            case "the-john-atc":
                addItem("THE JOHN", 50);
                break;
            case "fish-heads-atc":
                addItem("FISH HEADS", 12);
                break;
            case "the-malcolmII-atc":
                break;
            case "big-head-atc":
                addItem("THE BIG-HEAD", 35);
                break;
            case "six-head-atc":
                addItem("THE 6-HEAD", 20);
                break;
        }
        $(".go-to-cart").css("display", "block");
    })

    if (numItems > 0) {
        $(".go-to-cart").css("display", "block");
    }

    //enable continue to cart button
    $(".go-to-cart > button").click(function () {
        window.location.href = "../cart.html";
    });

    //EXTRAS

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

    //make extras icons clicpinke on mobile
    $(".icon .mobile").click(function () {
        if ($(this).parent().find("a").length > 0) {
            window.location.href = $(this).parent().find("a").attr("href");
        }
    })

    //CART

    //update dropdown menu values
    $(".cart").find(".size-0, .quantity-num").click(function () {
        console.log('dropdown');
        if ($(this).find(".sub-menu").css("display") == "none") {
            $(this).find(".sub-menu").css("display", "block");
        } else {
            $(this).find(".sub-menu").css("display", "none");
        }
    })

    //update size of item in cart
    $(".size-1, .size-2, .size-3").click(function () {
        var index = parseInt($(this).parents(".cart-member-info").find(".cart-index").html());
        var selectedSize = $(this).find("span:first").html();
        cart[index].size = selectedSize.toLowerCase();
        saveCart();
        $(this).parents(".size-0").find("span:first").html(selectedSize);
    })

    //update quantity of item in cart
    $(".quantity-minus, .quantity-plus").click(function () {
        var index = parseInt($(this).parents(".cart-member-info").find(".cart-index").html());
        var quantityString = $(this).parents(".quantity-num").find("span:first").html();
        var num = parseInt(quantityString.charAt(quantityString.length - 1));
        if ($(this).is(".quantity-plus")) {
            num += 1;
        } else if (num > 1) {
            num -= 1;
        }

        cart[index].quantity = num;
        saveCart();
        $(this).parents(".quantity-num").find("span:first").html("QUANTITY: " + num);
        calculateSubtotal();
    })

    //remove this item from the cart
    $(".cart-member-button > button").click(function () {
        var index = parseInt($(this).parents(".cart-member-info").find(".cart-index").html());
        cart = cart.filter(function (value, i, arr) {
            return i != index;
        })
        saveCart();
        location.reload();
    })

    //link cart members back to their product pages
    $(".cart-member-name > span").click(function () {
        window.location.href = $(this).parents(".cart-member").find("a").attr("href");
    })

    //enable continue shopping button
    $("#shopping-button > button").click(function () {
        window.location.href = "store.html";
    })

    //update shipping price when local shipping checkbox is clicked
    $('#local-check, #foreign-check').click(function () {
        if ($(this).prop('checked')) {
            if ($(this).is('#local-check')) {
                shipping = 0;
                $('#foreign-check').prop('checked', false);
            } else {
                shipping = 30;
                $('#local-check').prop('checked', false);
            }
        } else {
            shipping = 5;
        }
        saveCart();
        calculateSubtotal();
    })

    //add checkout card to purchase
    if ($(".cart").length > 0) {
        var handler = StripeCheckout.configure({
            key: 'pk_test_3oUad6Xkn77ClYtyKHzDMljn',
            //key: 'pk_live_m3BziyPDM16OwiITbfsy6kCr',
            image: 'https://allmankindisstupid.com/assets/img/icons/boyHead.png',
            description: describeCart(),
            locale: 'auto',
            billingAddress: true,
            shippingAddress: true,
            zipCode: true,
            token: function (token, args) {
                $.ajax({
                    method: "POST",
                    url: "assets/php/charge-request.php",
                    data:
                    {
                        stripeToken: token.id,
                        amount: (calculateSubtotal() * 100).toString(),
                        description: describeCart(),
                        email: token.email,
                        cart: JSON.stringify(cart),
                        args: args
                    }
                }).done(function (result) {
                    saveCart();
                    window.location.href = "confirmation.html";
                })
            }
        });

        $("#checkout-link").click(function (e) {
            handler.open({
                name: 'ALL Mankind Is Stupid',
                description: 'Checkout',
                amount: calculateSubtotal() * 100
            });

            e.preventDefault();
        })

        window.addEventListener('popstate', function () {
            handler.close();
        })
    }

    // $(".form-cell").append(
    //     '<form class="stripe-form" action="assets/php/charge-request.php"' +
    //     'method="POST" target="formDestination">' +
    //     '<input type="hidden" name="cart" value=""><br>' +
    //     '<input type="hidden" name="data-amount" value="10000"><br>' +
    //     '<script src="https://checkout.stripe.com/checkout.js" class="stripe-button" data-key="pk_test_3oUad6Xkn77ClYtyKHzDMljn"' +
    //     'data-amount="' + calculateSubtotal() + '00" data-name="All Mankind Is Stupid" data-description="Widget" data-image="https://stripe.com/img/documentation/checkout/marketplace.png"' +
    //     'data-locale="auto" data-shipping-address="true" data-billing-address="true" data-zip-code="true">' +
    //     '</script>' +
    //     '</form>');

    //Confirmation

    //Clear cart when user leaves the confirmation page
    if ($(".confirm").length > 0) {
        $("#title, #cart, #store, #extras, #contact, #info, #lookbook, #navStore, #navExtras, "
            + "#navInfo, #navLook, #navContact, #order-button").click(function () {
                cart = [];
                saveCart();
            });
    }

    //fill in subtotal and total values
    $("#order-subtotal").text("$" + calculateSubtotal());
    if (shipping === 5) {
        $("#order-shipping").text("$" + shipping);
    }
    $("#order-total-val").text("$" + (calculateSubtotal()));

    //link order-button to store page
    $("#order-button").click(() => {
        window.location.href = "store.html";
    });

    //LookBook

    //switch to panel image on click
    $(".panels").on('click', '.panel-img', function () {
        switch ($(this)[0]) {
            case ($('.panel-img:nth-of-type(2)')[0]):
                panelIndex = 0;
                break;
            case ($('.panel-img:nth-of-type(3)')[0]):
                panelIndex = 1;
                break;
            case ($('.panel-img:nth-of-type(4)')[0]):
                panelIndex = 2;
                break;
            default:
                panelIndex = 3;
                break;
        }
        $(".panel-img").addClass("opaque");
        $(this).removeClass("opaque");
        $(".main-img").find('img').attr("src", $(this).find('img').attr("src"));
    });

    //place panels when the page first loads
    if (($('.look').length > 0) || ($('.listing').length > 0)) {
        placePanels(false);
    }

    //move panels when the panel arrows are clicked
    $('.panel-arrow').click(function () {
        if ($(this).hasClass("r-arrow")) {
            updatePanels(false);
        } else {
            updatePanels(true);
        }
    });

    //move main image when main arrows are clicked
    $('.main-arrow').click(function () {
        if ($(this).find('.main-right').length > 0) {
            updateMainImage(true);
        } else {
            updateMainImage(false);
        }
    })

    //CONTACT

    //submit form without leaving page
    $('#contact-form').submit(function () {
        $.post($(this).attr('action'), $(this).serialize(), function (response) {
        }, 'json');

        alert("Your message was sent, we will get back to you as soon as possible");
        $(this).find('input[type=text], input[type=email], textarea').val('');

        return false;
    });
});

//wait for all elements of product page to load before 
//placing the teeth in the middle of the listing div and making them visible
$(window).on("load", function () {
    $(".listing").each(function () {
        if ($(this).find(".small-teeth").is(":visible")) {
            //mobile version
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
            //desktop version
            var rad = $(this).find(".desc-grid").height() / 2;
            var botOff = rad + 10;
            var topOff = rad + 15;
            $(this).find("#large-bot-img").css("transform", "translateY(-" + botOff + "px)");
            $(this).find("#large-top-img").css("transform", "translateY(" + topOff + "px)");
            $(this).find(".large-top-mask").css("height", topOff - 40);
            $(this).find(".large-bottom-mask").css("height", botOff - 23);
            $(this).css("opacity", "1");
        }
        $(this)
            .find(
                ".large-bottom-mask, " +
                ".large-top-mask, " +
                ".small-bottom-mask, " +
                ".small-top-mask"
            ).addClass("animate-mask");
        $(this)
            .find(
                "#large-bot-img, " +
                "#large-top-img, " +
                "#small-bot-img, " +
                "#small-top-img"
            ).addClass("animate-teeth");
    });
});

if ($('body').is('.checkout-body')) {
    console.log("on checkout");

    //Store
    function getOrderTotal() {
        loadCart();
        var total = 0;
        cart.forEach(item => {
            total += item.total;
        });
        return total;
    }

    //checkout


    const form = $("#payment-form")
    const submitButton = form.children("button");

    //Stripe client with test key
    const stripe = Stripe('pk_test_3oUad6Xkn77ClYtyKHzDMljn');

    //Instance of Elements
    const elements = stripe.elements();

    //style for our Elements
    const style = {
        base: {
            iconColor: '#666ee8',
            color: '#31325f',
            fontWeight: 400,
            fontFamily:
                '"Pragati Narrow", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '15px',
            '::placeholder': {
                color: '#aab7c4',
            },
            ':-webkit-autofill': {
                color: '#666ee8',
            },
        },
    };

    //Card Element
    const card = elements.create('card', { style });

    //Mount Card Element on page
    card.mount('#card-element');

    //TODO: watch Card Element to display errors

    //create payment request
    const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
            label: 'Total',
            amount: getOrderTotal(),
        },
        requestShipping: true,
        requestPayerEmail: true,
        shippingOptions: [
            {
                id: 'free',
                label: 'Free Shipping',
                detail: 'Delivery within 5 days',
                amount: 0,
            },
        ],
    });

    //TODO: callbacks on creation of a Source and change of shipping address

    //Create the Payment request Button
    const paymentRequestButton = elements.create('paymentRequestButton', {
        paymentRequest,
    });

    //TODO: only mount if payment request is available

    //mount paymentRequest
    const paymentRequestSupport = paymentRequest.canMakePayment();
    if (paymentRequestSupport) {
        //paymentRequestButton.mount('#payment-request-button');
    }

    //handle form submission

    //listen to changes in the country selection
    form
        .querySelector('select[name=country')
        .addEventListener('change', event => {
            event.preventDefault();
            //TODO: add functionality to display
            //      country specific payment information
            //selectCountry(event.target.value);
        });


    //handle submission of payment form
    form.addEventListener('submit', event => {
        event.preventDefault();

        //Retrieve user information
        const payment = form.querySelector('input[name=payment]:checked').value;
        const name = form.querySelector('input[name=name]').value;
        const country = form.querySelector('select[name=country] option:checked').value;
        const email = form.querySelector('input[name=email]').value;
        const shipping = {
            name,
            address: {
                line
            }
        }
    });


}
