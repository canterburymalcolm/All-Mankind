import { Album } from 'Album';

export class Product {
  constructor(name, sizes, price, photos, page, colors = []) {
    this.name = name;
    this.sizes = sizes;
    this.price = price;
    this.album = new Album(photos);
    this.page = page;
    this.colors = colors;
  }

  get photo() {
    this.album.mainPhoto;
  }

  placeAlbum() {
    this.album.place();
  }

  changeColor(old, current) {
    var regex = new RegExp(old, "g");
    this.album.changeColor(regex, current);
  }

  hasSize(size) {
    return this.sizes.includes(size);
  }
}

export function getProductByName(name) {
  products.forEach(product => {
    if (product.name === name) {
      return product;
    }
  });
}

const products = [
  new Product("THE JOHN", [], 50, "the-john",
    [
      "products/theJohn/john-front.png",
      "products/theJohn/john-back.png",
      "products/theJohn/john-aglets.jpg",
      "products/theJohn/john-tag.jpg",
      "products/theJohn/john-face.jpg",
      "products/theJohn/john-stairs.jpg",
      "products/theJohn/john-vest.jpg"
    ]
  ),
  new Product("FISH HEADS", [], 12, "fish-heads",
    [
      "products/fishHeads/fish-front.png",
      "products/fishHeads/fish-close.jpg",
      "products/fishHeads/fish-face.jpg",
    ]
  ),
  new Product("THUMB UP", [], 30, "thumb-up",
    [
      "products/thumbUp/thumb-blue-front.png",
      "products/thumbUp/thumb-blue-back.png",
      "products/thumbUp/thumb-blue-front-close.jpg",
      "products/thumbUp/thumb-blue-back-close.jpg",
      "products/thumbUp/thumb-swiss.jpg",
      "products/thumbUp/thumb-stare.jpg"
    ],
    [COLOR.BLUE, COLOR.PINK]
  ),
  new Product("THE MALCOLM II", [], 50, "the-malcolmII",
    [
      "products/theMalcolmII/single-back.jpg",
      "products/theMalcolmII/cerb-front.jpg",
      "products/theMalcolmII/cerb-aglets.jpg",
      "products/theMalcolmII/forrest-low.jpg",
      "products/theMalcolmII/forrest-mid.jpg",
      "products/theMalcolmII/cerb-store.jpg",
      "products/theMalcolmII/cerb-snow.jpg",
      "products/theMalcolmII/cerb-face.jpg"
    ]
  ),
  new Product("THE BIG HEAD", [], 35, "big-head",
    [
      "products/bigHead/big-h-front.png",
      "products/bigHead/big-h-back.png",
      "products/bigHead/big-h-sit.png",
      "products/bigHead/big-h-crop.png",
      "products/bigHead/big-h-pole.jpg"
    ]
  ),
  new Product("DOKKAEBI", [], 25, "dokkaebi",
    [
      "products/dokkaebi/dok-back.png",
      "products/dokkaebi/dok-front.png",
      "products/dokkaebi/dok-glow.jpg",
      "products/dokkaebi/dok-rail.jpg",
      "products/dokkaebi/dok-art.jpg",
      "products/dokkaebi/dok-food.jpg"
    ]
  ),
  new Product("EL CIPITÍO", [], 25, "el-cipitio",
    [
      "products/elCipitio/cipitio-back.png",
      "products/elCipitio/cipitio-front.png",
      "products/elCipitio/cipitio-plant.jpg",
      "products/elCipitio/cipitio-slide.jpg",
      "products/elCipitio/cipitio-window.jpg",
      "products/elCipitio/cipitio-art.jpg",
      "products/elCipitio/cipitio-squat.jpg"
    ]
  ),
  new Product("AMIS X ZOOHILL", [SIZE.XLARGE], 25, "zoohill",
    [
      "products/zoohill/zoo-back.png",
      "products/zoohill/zoo-front.png",
      "products/zoohill/zoo-pair.jpg",
      "products/zoohill/zoo-stare.jpg",
      "products/zoohill/zoo-rock.jpg",
    ]
  ),
  new Product("CENSORED", [SIZE.XLARGE], 25, "censored",
    [
      "products/censored/cen-front.png",
      "products/censored/cen-close.jpeg",
      "products/censored/cen-drop.jpg",
      "products/censored/cen-walk.jpg",
      "products/censored/cen-stand.jpg",
      "products/censored/cen-fall.jpg",
    ]
  )
];