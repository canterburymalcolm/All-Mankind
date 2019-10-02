export class Album {
  constructor(panels, selected = 0) {
    this.panels = panels;
    this.selected = selected;

    shiftPanels = this.shiftPanels.bind(this);
  }

  get mainPhoto() {
    return this.panels[0];
  }

  place() {
    const album = this;

    //switch to panel image on click
    $(".panels").on('click', '.panel-img', () => {
      switch ($(this)[0]) {
        case ($('.panel-img:nth-of-type(2)')[0]):
          album.selected = 0;
          break;
        case ($('.panel-img:nth-of-type(3)')[0]):
          album.selected = 1;
          break;
        case ($('.panel-img:nth-of-type(4)')[0]):
          album.selected = 2;
          break;
        default:
          album.selected = 3;
          break;
      }

      $(".panel-img").addClass("opaque");
      $(this).removeClass("opaque");
      $(".main-img").find('img').attr("src", $(this).find('img').attr("src"));
    });

    //move panels when the panel arrows are clicked
    $('.panel-arrow').click(() => {
      if ($(this).hasClass("r-arrow")) {
        album.shiftPanels(false);
      } else {
        album.shiftPanels(true);
      }
    });

    //move main image when main arrows are clicked
    $('.main-arrow').click(() => {
      if ($(this).find('.main-right').length > 0) {
        album.shiftMainImage(true);
      } else {
        album.shiftMainImage(false);
      }
    });
  }

  onClick() {
    let selected = 3;

    this.selected = selected;
  }

  changeColor(regex, current) {
    this.panels.map(panel => panel.replace(regex, current));

    $('.main-img img').attr('src', $('.main-img img').attr('src').replace(regex, current));

    $('.panel-img').each(i => {
      $(this).children('img').attr('src', '../assets/img/' + this.panels[i]);
    });
  }

  placePanels() {
    const content = this.panels.reduce((acc, panel, i) => (
      acc + i >= 4 ? ''
        :
        '<div class="panel-img cell large-2">' +
        '<img src="../assets/img/' + panel + '">' +
        '</div>'
    ), '');
    $('.panel-arrow').first().after(content);

    $('.panel-img').addClass('opaque');
    $('.panel-img').first().removeClass('opaque');
  }

  //update which panel is opaque
  shiftSelected(toTheRight) {
    this.selected += toTheRight ? 1 : -1;
    if (this.selected < 0) {
      this.selected = this.panels.length - 1;
    } else {
      this.selected = index % this.panels.length;
    }

    $('.panel-img').addClass('opaque');
    if (this.selected < 5) {
      $(".panel-img:nth-of-type(" + (this.selected + 2) + ")").removeClass('opaque');
    }
  }

  //change the main image to the next image
  shiftMainImage(toTheRight) {
    this.shiftSelected(toTheRight);
    if (this.selected > 3) {
      this.shiftPanels(!toTheRight)
    }

    $('.main-img img')
      .attr('src', '../assets/img/' + this.panels[this.selected]);
  }

  //move all the panels in the given isIncrease
  shiftPanels(toTheRight) {
    const startIndex = toTheRight ? -1 : 1;
    let startPanels = this.panels.splice(startIndex);
    this.panels = startPanels.concat(this.panels);

    this.shiftSelected(toTheRight);

    $('.panel-img').each(function (i, obj) {
      $(this).children('img').attr('src', '../assets/img/' + this.panels[i]);
    });
  }
}