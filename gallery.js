var Gallery = function(apiKey, size, id) {
  this.apiKey = apiKey;
  this.size = size;
  this.id = id;

  this.activeAlbum = null;
  this.albumData = {};
  this.imageList = [];

  this.init();
};

Gallery.prototype.init = function() {
  var imageNode, prev;
  var galleryElement = document.getElementById(this.id);
  var fragment = document.createDocumentFragment();

  for(var i = 0; i < this.size; i++) {
    // Create [size] img tags
    var elem = document.createElement('img');
    fragment.appendChild(elem);

    // Use DOM element to build ImageNode object
    // ImageNodes make up a doubly linked list
    prev = this.imageList[i-1] || null;
    imageNode = new ImageNode(elem, prev, null, this);
    if (prev) { prev.next = imageNode; }
    this.imageList.push(imageNode);
  }

  galleryElement.appendChild(fragment);
};

Gallery.prototype.selectAlbum = function(id) {
  this.clearThumbs();
  this.activeAlbum = id;

  // Hit Cache first
  if (this.albumData[id]) {
    this.setContent();
  } else {
    // Get album data from Flickr API
    this.getAsync(this.URI(id), function(response) {
      this.albumData[id] = response;
      this.setContent();
    }.bind(this));
  }
};

Gallery.prototype.getAsync = function(uri, cb) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      cb(xmlHttp.responseText);
    }
  };
  xmlHttp.open("GET", uri, true); // true for async
  xmlHttp.send(null);
};

Gallery.prototype.setContent = function(id) {
  var data = JSON.parse(this.albumData[this.activeAlbum]).photos.photo;
  var photo, src;

  for(var i = 0; i < data.length; i++) {
    photo = data[i];
    src = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret;
    this.imageList[i].updateContent(src, photo.title);
  }
};

Gallery.prototype.clearThumbs = function(id) {
  for(var i = 0; i < this.imageList.length; i++) {
    this.imageList[i].clearThumb();
  }
};

Gallery.prototype.URI = function(id) {
  return "https://api.flickr.com/services/rest/" +
         "?method=flickr.people.getPublicPhotos&format=json&nojsoncallback=1&per_page=12" +
         '&api_key=' + this.apiKey + '&user_id=' + id;
};
