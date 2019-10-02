export class Cart {
  constructor(items = [], shipping = 5) {
    this.items = items;
    this.shipping = shipping;
  }

  get numItems() {
    return this.items.reduce((sum, item) => sum + item.quantity);
  };

  addItem(newItem) {
    this.items.reduce((acc, item) => {
      item.canMergeWith(newItem) ?
        newItem.quantity += item.quantity
        :
        acc.push(item)
      return acc
    }, []);
    this.items.push(newItem);

    this.save();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.save();
  }

  clearItems() {
    this.items = [];
    this.save();
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
    localStorage.setItem('shipping', JSON.stringify(this.shipping));
    this.update();
  }

  load() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
    this.shipping = JSON.parse(localStorage.getItem('shipping'));

    if (this.shipping === null) {
      this.shipping = 5;
    } else if (this.shipping === 0) {
      $('#local-check').prop('checked', true);
    }

    this.update();
    this.placeItems();
    placeOrder();
    console.log(describeCart());
  }

  update() {
    $(".cart-num").html(this.numItems);
    $(".cart-num").css("display", "inline");

    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  describeCart() {
    let desc = "";
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
    });
    return desc;
  }

  calculateSubtotal() {
    let subtotal = 0;
    this.items.forEach((item, i) => {
      subtotal += item.total;
      $(".cart-index:contains(" + i + ")")
        .parents(".cart-member")
        .find(".desktop-price")
        .html("$" + item.product.price + "  x  " + item.quantity + " = " + item.subtotal);
    });

    if (shipping === 0) {
      $('#cart-shipping').text('FREE');
    } else {
      $('#cart-shipping').text('$' + shipping);
    }
    subtotal += shipping;

    $("#subtotal > span").html("$" + subtotal);
    return subtotal;
  }

  placeItems() {
    if ($(".cart").length > 0) {
      //place html for each item in cart
      this.items.forEach((item, i) => {
        const product = item.product;

        var member =
          '<div class="cell small-11 large-7">' +
          '<div class="cart-member grid-x grid-margin-x">' +
          '<div class="cart-member-img cell small-4">' +
          '<a href="products/' + product.page + '">' +
          '<img src="assets/img/cart/' + product.photo + '">' +
          '</a>' +
          '</div>' +
          '<div class="cart-member-info cell small-6 large-4">' +
          '<div class="cart-member-name">' +
          '<span>' + product.name + '</span>' +
          '</div>' +
          '<div class="cart-member-menus">' +
          '<ul class="dropdown-menu">' +
          '<li class="size-0">' +
          '<span>' + item.size.toUpperCase() + '</span>' +
          '<img class="arrow" src="assets/img/cart/arrow-black.png">' +
          '<ul class="sub-menu size-menu">' +
          (product.sizes.reduce((prev, size) => prev += `<li class="size-1"><span>${size}</span></li>`)) +
          '</ul>' +
          '</li>' +
          '<li class="quantity-num">' +
          '<span>QUANTITY: ' + product.quantity + '</span>' +
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
          '<span class="mobile-price">$' + product.price + '</span>' +
          '<span class="desktop-price">$' + product.price + '  x  ' + product.quantity + ' = ' + product.total + '</span>' +
          '</div>' +
          '</div>' +
          '</div>';
        $(".cart").append(member);
      });
    }
    calculateSubtotal();
  }

  placeOrder() {
    //place html for each item in order
    if ($(".order").length > 0) {
      console.log("placing order");
      this.items.forEach((item, i) => {
        const product = item.product;

        var member =
          '<div class="cell grid-x grid-margin-x align-center">' +
          '<div class="cell small-7 large-3">' +
          '<div class="order-member grid-x grid-margin-x">' +
          '<div class="order-member-img cell small-4 large-3">' +
          '<a href="products/' + product.page + '">' +
          '<img src="assets/img/cart/' + product.photo + '">' +
          '</a>' +
          '</div>' +
          '<div class="order-member-info cell small-6 large-7">' +
          '<div class="order-member-name">' +
          '<span>' + product.name + '</span>' +
          '</div>' +
          '<div class="order-member-menus">' +
          '<ul class="dropdown-menu">';

        if (product.name != "FISH HEADS") {
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
          '<span>$' + product.price + '</span>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';

        $(".order").append(member);
      });
    }
    calculateSubtotal();
  }
}