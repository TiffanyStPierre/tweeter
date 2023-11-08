/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
    <p>${tweetObject.created_at}</p>
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

  renderTweets(tweetData);

  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    $.post("/tweets", $(this).serialize(), function(data) {
      $(".result").html(data);
    })
  })
}
);