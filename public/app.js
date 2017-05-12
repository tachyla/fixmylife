//document ready
$(document).ready(function() {
  $.getJSON('/api/topics', function(results) {
    //FIRST APPENDED topicHTML to the dom
    $('.topicScreen').append(topicHTML);
    for (let i = 0; i < 10; i++) {
      const question = results[i].content;
      const topic_id = results[i]._id;
      const questionHTML = `<a href="/topics/${topic_id}"><li>${question}</li><a/><br>`;
      //then append the questions to the question class
      $('.questions').append(questionHTML);
    }
  });
  $.getJSON('/api' + window.location.pathname, function(results) {
    $('.one-topic').append(topic_idHTML);
    //results is the object
    const content = results.content;
    //const comment = results.comment;
    $('.container-left').append(content);
  });

  $('.delete').on('click', function() {
    fetch('http://localhost:8080/topics' + commentID, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      return res.json();
    });
  });
});

const commentID = window.location.pathname;
$('.posting').on('click', function() {
  const myAuthor = $('.my-author').val();
  const myTitle = $('.my-title').val();
  const myContent = $('.my-content').val();

  console.log(myAuthor, myTitle, myContent);
  $.ajax({
    url: '/topics',
    data: JSON.stringify({
      author: myAuthor,
      title: myTitle,
      content: myContent,
    }),
    type: 'POST',
    contentType: 'application/json',
  });
});


$(document).on('click', '.send', function() {
    //event.preventDefault();
  const userComment = $('.user-comment').val();
  const userAuthor = $('.user-comment').val();
  const userTitle = $('.user-comment').val();
    //console.log('this button is clicked');
    //value is the user input
    //insert value to database
    //http://localhost:8080/topics/5915000734418f3dc4398ee4
    //http://localhost:8080/topics/5915000734418f3dc4398ee4
  fetch('http://localhost:8080/topics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      author: userAuthor,
      title: userTitle,
      content: userComment,
    }),
  }).then(res => {
    return res.json();
  });

});

//on click of create button
//anchor tag links user to the post.html page
//target class on html page to append postHTML
$('.create-btn').on('click', function() {
  const postHTML = `<input type="textarea" class="user-post-textarea">
                          <button name="submit-post">SUBMIT</button>`;
  $('.createScreen').append(postHTML);
});

$('.submit-post').on('click', function() {
  const value = $('.user-post-textarea').val();
  //insert value to database

  //append comment to post
  $('.post-comments').append(`<li>${value}</li>`);

  fetch({
    method: 'POST',
    dataType: 'json',
    url: 'http://localhost:8080/topics',
    data: '{"content": value}',
  });
});

const loginHTML = `<div class="login-container">
                  <form class="form-signin">
                    <h2 class="form-signin-heading">Please sign in</h2>
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" value="remember-me"> Remember me
                      </label>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                  </form>
                </div>`;

const topicHTML = `  <div class="container">
                        <div class="jumbotron">
                          <h1>Fix My Life</h1>
                        <ul class="questions"></ul>
                        <a href="/post"><button class="create-btn">CREATE</button></a>
                      </div>`;

const topic_idHTML = `<div class="row">
                      <div class="container-left col-md-8"></div>
                      <div class="container-right col-md-4">
                      <button class="delete">DELETE</button>
                        <section class="comments-section">
                          <h1>Comments</h1>
                          <input type="textarea" class="user-author"placeholder="enter your name...">
                          <input type="textarea" placeholder="enter the title"class="user-title">
                          <input type="textarea" class="user-comment"placeholder="enter your comment">
                          <input type="submit" value="submit" class="send"></input>
                        </section>
                      </div>
                    </div>
                    <div class="container-bottom row">
                      <ul class="post-comments">
                      </ul>
                    </div>`;
