//document ready
$(document).ready(function() {
  $.getJSON('/items', function(results) {
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
//http://localhost:8080/topics/59147ebfaea5b80bec56063d
//http://localhost:8080/topics/59147ebfaea5b80bec56063d
  $.getJSON('/api'+ window.location.pathname, function(results) {
    $('.one-topic').append(topic_idHTML);
    //results is the object
    const content = results.content;
    const comment = results.comment;
    $('.container-left').append(content);
  });

  debugger;
  //const userComment = window.location.pathname;
  $('.send').on('click', function() {
    //event.preventDefault();
    debugger;
    console.log('button was clicked');
    const value = $('.user-comment').val();
    //value is the user input
    console.log(value);
    //insert value to database

    fetch('/topics' + userComment, {
      method: 'PUT',
      body: { comment: value },
      success: 'Added comment to DB'
    });

    //This appends comments to the container-bottom
    $('.container-bottom').append(value);
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
                        <a href="../post.html"><button class="create-btn">CREATE</button></a>
                      </div>`;

const topic_idHTML = `<div class="row">
                      <div class="container-left col-md-8"></div>
                      <div class="container-right col-md-4">
                        <section class="comments-section">
                          <h1>Comments</h1>
                          <input type="textarea" class="user-comment">
                          <input type="submit" value="submit" class="send"></input>
                        </section>
                      </div>
                    </div>
                    <div class="container-bottom row">
                      <ul class="post-comments">
                      </ul>
                    </div>`;
