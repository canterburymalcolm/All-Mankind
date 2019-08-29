import { COLOR } from 'constants';
import { this.product = getProductByName } from 'Product';

export class Item {
  constructor(product, size, color, quantity) {
    this.product = product;
    this.size = size;
    this.color = color;
    this.quantity = quantity;
    //subtotal
  }

  get subtotal() { return this.product.price * this.quantity };

  set setSize(size) {
    if (this.product.hasSize(size)) {
      this.size = size;
    }
  }

  set setColor(btn) {
    const id = $(btn).attr("id");
    switch (id) {
      case "pink":
        this.color = COLOR.PINK;
        this.product.changeColor("blue", "pink");
        break;
      case "blue":
        this.color = COLOR.BLUE;
        this.product.changeColor("pink", "blue");
        break;
      case "three":
        this.color = COLOR.CERBERUS;
        this.product.changeColor("single", "three");
        break;
      default:
        this.color = COLOR.DEFAULT;
        this.product.changeColor("three", "single");
        break;
    }
    $(btn).css("background-color", this.color.code);
  }

  isValid(atc) {
    switch (atc) {
      case "thumb-up-atc":
        this.product = getProductByName("THUMB UP");
        break;
      case "fish-heads-atc":
        this.product = getProductByName("FISH HEADS");
        break;
      case "big-head-atc":
        this.product = getProductByName("THE BIG HEAD");
        break;
      case "dokkaebi-atc":
        this.product = getProductByName("DOKKAEBI");
        break;
      case "cipitio-atc":
        this.product = getProductByName("EL CIPITÍO");
        break;
      case "zoohill-atc":
        this.product = getProductByName("AMIS X ZOOHILL");
        break;
      case "censored-atc":
        this.product = getProductByName("CENSORED SHIRT");
        break;
      default:
        return false;
    }
    return true;
  }

  canMergeWith = item => (
    (this.product.name === item.product.name)
    && (this.size === item.size)
    && (this.color === item.color)
  );
}