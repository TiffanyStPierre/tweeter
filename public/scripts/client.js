/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweetObject) {
    let $tweet = $(`<article class="tweet">
    <header>
    <div class="tweet-avatar">
      <img src=${tweetObject.user.avatars}>
      <p>${tweetObject.user.name}</p>
    </div>
    <p class="tweet-handle">${tweetObject.user.handle}</p>
  </header>
  <p class="tweet-text">${tweetObject.content.text}</p>
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

  const renderTweets = function(tweetArray) {
    tweetArray.forEach(function(tweet) {
      let tweetElement = createTweetElement(tweet);
      $(".tweet-list").append(tweetElement);
    });
  };

  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();

    let tweetContent = $("#tweet-text").val();
    if (tweetContent === "" || tweetContent === null) {
      alert('Empty tweets cannot be tweeted!');
      return false;
    }

    if (tweetContent.length > 140) {
      alert('Maximum tweet length is 140 characters. Please shorten your tweet.');
      return false;
    }

    $.post("/tweets", $(this).serialize(), function(data) {
      $(".result").html(data);
    })

    $("#tweet-form")[0].reset();

    loadTweets();
  })

  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    })
  };

  loadTweets();
}
);