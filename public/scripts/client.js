/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Escape certain characters in tweet text to prevent cross site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create new tweet
  const createTweetElement = function(tweetObject) {
    let $tweet = $(`<article class="tweet">
    <header>
    <div class="tweet-avatar">
      <img src=${tweetObject.user.avatars}>
      <p>${tweetObject.user.name}</p>
    </div>
    <p class="tweet-handle">${tweetObject.user.handle}</p>
  </header>
  <p class="tweet-text">${escape(tweetObject.content.text)}</p>
  <footer>
    <p>${timeago.format(tweetObject.created_at, 'en_US')}</p>
    <div class="tweet-icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
    </article>`);

    return $tweet;
  };

  // Display tweets on page - most recent first
  const renderTweets = function(tweetArray) {
    $(".tweet-list").empty();

    tweetArray.forEach(function(tweet) {
      let tweetElement = createTweetElement(tweet);
      $(".tweet-list").prepend(tweetElement);
    });
  };

  // Get tweets from psuedo database
  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.error("Error:", errorThrown);
    });
  };

  // Submit new tweet with validation
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();

    let tweetContent = $("#tweet-text").val();
    if (tweetContent === "" || tweetContent === null) {

      const errorMessage = $("#error-message");
      errorMessage.text('❗ Empty tweets cannot be tweeted. ❗');
      errorMessage.slideDown('slow');

      setTimeout(function() {
        errorMessage.slideUp('slow');
      }, 3000);

      return false;
    }

    if (tweetContent.length > 140) {

      const errorMessage = $("#error-message");
      errorMessage.text('❗ Maximum tweet length is 140 characters. Please shorten your tweet. ❗');
      errorMessage.slideDown('slow');

      setTimeout(function() {
        errorMessage.slideUp('slow');
      }, 3000);

      return false;
    }

    $.post("/tweets", $(this).serialize(), function(data) {
      let tweetObject = data;
      let tweetElement = createTweetElement(tweetObject);
      $(".tweet-list").prepend(tweetElement);
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.error("Error:", errorThrown);
    });

    $("#tweet-form")[0].reset();

  });

  // Display tweets on page when page loads
  loadTweets();
}
);