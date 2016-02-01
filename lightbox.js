var Lightbox = function(image) {
  this.image = image;
  this.createElements();
  this.setContent();
  this.attachEvents();
};

Lightbox.prototype.createElements = function() {
  this.container = this.buildClassyDiv('lightbox');
  this.overlay = this.buildClassyDiv('overlay');

  [this.overlay, this.buildImgContainer()].forEach(function(elem) {
    this.container.appendChild(elem);
  }.bind(this));

  document.body.appendChild(this.container);
};

Lightbox.prototype.setContent = function() {
  this.titleElem.innerHTML = this.image.title;
  this.imgElem.setAttribute('src', this.image.src);

  this.toggleNavDisplay(this.image.prev, this.prevButton);
  this.toggleNavDisplay(this.image.next, this.nextButton);
};

Lightbox.prototype.attachEvents = function() {
  this.overlay.addEventListener('click', function(event) {
    document.body.removeChild(this.container);
  }.bind(this));

  this.prevButton.addEventListener('click', this.visitPrev.bind(this));
  this.nextButton.addEventListener('click', this.visitNext.bind(this));

  document.body.addEventListener('keydown', function(e) {
    var keyCode = e.keyCode || e.which,
    arrow = { left: 37, right: 39 };

    switch (keyCode) {
      case arrow.left:
        this.visitPrev.bind(this).call();
      break;
      case arrow.right:
        this.visitNext.bind(this).call();
      break;
    }
  }.bind(this));
};

Lightbox.prototype.toggleNavDisplay = function(obj, elem) {
  if (obj) {
    elem.className = elem.className.replace('hidden', '');
  } else {
    elem.className = elem.className + ' hidden';
  }
};

Lightbox.prototype.buildImgContainer = function(text, className) {
  var container = this.buildClassyDiv('image-container');
  var backdrop = this.buildClassyDiv('backdrop');

  this.imgElem = document.createElement('img');
  this.titleElem = document.createElement('p');
  this.prevButton = this.buildNavButton('<', 'prev');
  this.nextButton = this.buildNavButton('>', 'next');

  [this.imgElem, this.prevButton, this.nextButton, this.titleElem].forEach(function(elem) {
    backdrop.appendChild(elem);
  });

  container.appendChild(backdrop);

  return container;
};

Lightbox.prototype.buildClassyDiv = function(className) {
  var div = document.createElement('div');
  div.setAttribute('class', className);
  return div;
};

Lightbox.prototype.buildNavButton = function(text, className) {
  var navButton = document.createElement('a');
  navButton.setAttribute('href', '#');
  navButton.className = className;

  navButton.appendChild(document.createTextNode(text));
  return navButton;
};

Lightbox.prototype.visitPrev = function() {
  if (!this.image.prev) { return false; }
  this.image = this.image.prev;
  this.setContent();
};

Lightbox.prototype.visitNext = function() {
  if (!this.image.next) { return false; }
  this.image = this.image.next;
  this.setContent();
};
