import { Album } from 'Album';

export class LookBook {
  constructor(title, page, photos) {
    this.title = title;
    this.page = page;
    this.album = new Album(photos);
  }

  placeAlbum() {
    this.album.place();
  }
}

export function getLookByTitle(title) {
  LOOKS.forEach(look => {
    if (look.title === title) {
      return look;
    }
  });
}

const LOOKS = [
  new LookBook('Drop Zero', 'zero.html',
    [
      "looks/zero/zero-crowd.jpg",
      "looks/zero/zero-black.jpg",
      "looks/zero/zero-booth.jpg",
      "looks/zero/zero-close.jpg",
      "looks/zero/zero-fence.jpg",
      "looks/zero/zero-leafs.jpg",
      "looks/zero/zero-loiter.jpg"
    ]
  ),
  new LookBook('Drop One', 'one.html',
    [
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
    ]
  )
];
