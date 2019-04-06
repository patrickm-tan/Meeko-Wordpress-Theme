function fetchNews() {
  var apiKey = "efe99d204b6d47bba0016dca71dac4b8";
  var url =
    "https://newsapi.org/v2/top-headlines?" +
    "country=us" +
    "&category=technology" +
    "&apiKey=" +
    apiKey;

  $.ajax({
    url: url,
    dataType: "json",
    success: function(newsList) {
      for (var i = 0; i < 10; i++) {
        var newsPost = {
          author: checkValue(newsList.articles[i].author, 0),
          articleTitle: checkValue(newsList.articles[i].title, 0),
          articleDesc: checkValue(newsList.articles[i].description, 0),
          articleUrl: checkValue(newsList.articles[i].url, 0),
          articleImage: checkValue(newsList.articles[i].urlToImage, 1)
        };

        //Index the class [0] for the first element that has class named entry-content
        document.getElementsByClassName(
          "entry-content"
        )[0].innerHTML += createNewsBlock(newsPost);
      }
    }
  });
}

function checkValue(item, attribute) {
  //Checks whether the value from the JSON object is null and replaces it with N/A
  if (attribute == 0) {
    if (item == null) {
      return "N/A";
    } else {
      return item;
    }
  } else {
    if (item == null) {
      return "http://ccit356.firebird.sheridanc.on.ca/wp-content/uploads/unavailable.png";
    } else {
      return item;
    }
  }
}

function createNewsBlock(newsPost) {
  //Creates the DOM content for the JSON data (articles) so it can be implemented into WP dyanmically

  //This creates the media post from the Gutenberg Editor
  var mediaPost =
    '<div class="wp-block-media-text alignwide has-media-on-the-right">';
  //This creates the figure that accompanies the media post (as mentioned above)
  var figurePost = '<figure class="wp-block-media-text__media">';
  //Creates image for the figure
  var imgPost =
    '<img src="' +
    newsPost.articleImage +
    '" sizes="(max-width: 1024px) 100vw, 1024px"> </figure>';
  //Combines the inner HTML above for right side content
  var rightContent = figurePost + imgPost;

  //This creates the media post text
  var divPost = '<div class="wp-block-media-text__content">';
  //These create the word Content of the media post
  var hPost =
    '<a href="' +
    newsPost.articleUrl +
    '" target=_blank>' +
    "<h2>" +
    newsPost.articleTitle +
    "</h2></a>";
  var pPost = "<p>" + newsPost.articleDesc + "</p></div></div>";
  //Combines the inner HTML above for left side content
  var leftContent = divPost + hPost + pPost;

  return mediaPost + rightContent + leftContent;
}

fetchNews();
