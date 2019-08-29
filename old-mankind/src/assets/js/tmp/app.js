import $ from 'jquery';
import { Item } from 'item';
import { Cart } from 'cart';
import { getProductByName } from 'product';
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

$(document).foundation();

let cart = new Cart();
let curItem = new Item();

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

  //link from store to individual product pages
  $(".product-container").click(function () {
    window.location.href = $(this).find("a").attr("href");
  })

  //increment and decrement quantity
  $(".select-num .dec, .select-num .inc").click(function () {
    let num = parseInt($(".select-num .num").html());
    if ($(this).hasClass("inc")) {
      num += 1;
    } else if (num > 1) {
      num -= 1;
    }
    $(".select-num .num").html(num);

    curItem.quantity = num;
  });


  //color select-size buttons on click and set size of curItem
  $(".select-size .button").click(() => {
    $(this).css("background-color", "gainsboro");
    curItem.setSize = $(this).attr("id");
  });

  $(".select-color .button").click(() => {
    $(this).parent().find(".button").css("background-color", "white");
    curItem.setColor = this;
  });


  //add curItem to cart
  $(".add-to-cart .button").click(function () {
    let toCart = "none";
    if (curItem.isValid($(this).attr("id"))) {
      toCart = "block";
      cart.addItem(curItem);
    }
    $(".go-to-cart").css("display", toCart);
  })

  if (cart.numItems > 0) {
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
    if ($(this).find(".sub-menu").css("display") == "none") {
      $(this).find(".sub-menu").css("display", "block");
    } else {
      $(this).find(".sub-menu").css("display", "none");
    }
  })

  //update size of item in cart
  $(".size-1, .size-2, .size-3").click(function () {
    const index = parseInt($(this).parents(".cart-member-info").find(".cart-index").html());
    const selectedSize = $(this).find("span:first").html();
    cart.items[index].setSize = selectedSize.toLowerCase();
    cart.save();
    $(this).parents(".size-0").find("span:first").html(selectedSize);
  })

  //update quantity of item in cart
  $(".quantity-minus, .quantity-plus").click(function () {
    const index = parseInt($(this).parents(".cart-member-info").find(".cart-index").html());
    const quantityString = $(this).parents(".quantity-num").find("span:first").html();
    let num = parseInt(quantityString.charAt(quantityString.length - 1));
    if ($(this).is(".quantity-plus")) {
      num += 1;
    } else if (num > 1) {
      num -= 1;
    }

    cart.items[index].quantity = num;
    cart.save();
    $(this).parents(".quantity-num").find("span:first").html("QUANTITY: " + num);
    cart.calculateSubtotal();
  })

  //remove this item from the cart
  $(".cart-member-button > button").click(function () {
    const index = parseInt($(this).parents(".cart-member-info").find(".cart-index").html());
    cart.removeItem(index);
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
        cart.shipping = 0;
        $('#foreign-check').prop('checked', false);
      } else {
        cart.shipping = 30;
        $('#local-check').prop('checked', false);
      }
    } else {
      cart.shipping = 5;
    }
    cart.save();
    cart.calculateSubtotal();
  })

  //add checkout card to purchase
  if ($(".cart").length > 0) {
    var handler = StripeCheckout.configure({
      key: 'pk_test_3oUad6Xkn77ClYtyKHzDMljn',
      // key: 'pk_live_LXaZQTAbyTd8N3Zj4grVy2Wz00YvuIsPM1',
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

  //Clear cart when user leaves the confirmation page
  if ($(".confirm").length > 0) {
    $("#title, #cart, #store, #extras, #contact, #info, #lookbook, #navStore, #navExtras, "
      + "#navInfo, #navLook, #navContact, #order-button").click(function () {
        cart.clearItems();
      });
  }

  //fill in subtotal and total values
  $("#order-subtotal").text("$" + calculateSubtotal());
  if (cart.shipping === 5) {
    $("#order-shipping").text("$" + cart.shipping);
  }
  $("#order-total-val").text("$" + (calculateSubtotal()));

  //link order-button to store page
  $("#order-button").click(() => {
    window.location.href = "store.html";
  });

  //LookBook


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