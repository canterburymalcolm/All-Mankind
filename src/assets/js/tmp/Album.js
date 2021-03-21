export class Album {
  constructor(panels, selected = 0) {
    this.panels = panels;
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