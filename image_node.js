var ImageNode = function(elem, prev, next, gallery) {
  this.elem = elem;
  this.prev = prev;
  this.next = next;
  this.gallery = gallery;

  this.addClickHandler();
};

ImageNode.prototype.addClickHandler = function() {
  this.elem.addEventListener('click', function(event) {
    gallery.lighbox = new Lightbox(this);
  }.bind(this));
};

ImageNode.prototype.updateContent = function(src, title) {
  this.src = src + '.jpg';
  this.thumbSrc = src + '_q.jpg';
  this.title = title;
  this.renderThumb();
};

ImageNode.prototype.clearThumb = function() {
  this.elem.removeAttribute('src');
};

ImageNode.prototype.renderThumb = function(src, title) {
  this.elem.setAttribute('src', this.thumbSrc);
};
