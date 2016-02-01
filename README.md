## Code test for Slack

#### Spec:

Create a web page that shows a grid of photo thumbnails; when a thumbnail is clicked, the photo should be displayed in a lightbox view, with the ability to move to the next / previous photos and display the photo title. Use any public API that returns photos.

#### Required:

- The ability to access a public API and successfully retrieve data from it;
- The ability to display that data on a page;
- The ability to update the UI of a page without refreshing; and
- The ability to do all of the above using only native JavaScript (no libraries such as jQuery).

#### About

I chose to use the Flickr API `people.getPublicPhotos` method to fetch photos. The only issue with this API is that it can be very, very slow. I've waited 15+ seconds for a response! That said, sometimes it's fast, so hopefully you'll be lucky.

I decided to have a bit of fun with the assignment, so I gave myself a few other challenges:

1. Change which gallery is being viewed without inserting/removing any DOM elements.
2. Attach event handlers to the left/right arrows as well as buttons on the page for navigation.
3. Implement the images as a doubly linked list for more efficient previous/next navigation.

A live version can be viewed at [http://slack.blakewilliamturner.com](http://slack.blakewilliamturner.com).
