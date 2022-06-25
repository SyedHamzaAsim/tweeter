/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {


  /* const data = [
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ] */

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function (tweet) {
    const $tweet = $(`
  <article class="tweet">
    <header>
      <div class="avatarIcon">
      <img src="${tweet.user.avatars}" alt="${tweet.user.name}" class = "pfp">
      <span >${tweet.user.name}</span>
      </div>
      <span class="username">${tweet.user.handle}</span>
    </header>
    <main>
      ${escape(tweet.content.text)}
    </main>
    <footer >
      <span>${timeago().format(tweet.created_at)}</span>
      <div class="flags">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);

    return $tweet;
  }

  loadTweets();


  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
      .then((data) => {
        renderTweets(data);
      });

  }

  $('form').submit(async (event) => {
    event.preventDefault();
    const text = $("#tweet-text").val();

    $('.error-msg').slideUp;
    
    if (!text) {
      return $('.error-msg').text('Please enter text').slideDown();
    }

    if (text.length > 140) {
      return $('.error.msg').text('Too much, talk less pls').slideDown();
    }

    //const data = $(text).serialize();
    const data = $(this).find("#tweet-text");

    $.ajax({url: '/tweets', method: 'POST', data: data.serialize()})
      .then(() => {
        $("#tweet-text").val("");
        $('#tweets-container').empty();
        loadTweets();
      });
  });

});