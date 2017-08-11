$(document).ready(function() {
  $.getJSON('/api/topics', function(results) {
    $('.topicColumn').append(topicHTML);
    for (let i = 0; i < 10; i++) {
      const question = results[i].content;
      const topic_id = results[i]._id;
      const questionHTML = `<a href="/topics/${topic_id}"><li class="list-group-item">${question}</li><a/>`;
      $('.questions').append(questionHTML);
    }
  });
  //UPDATE and DELETE**********************************************************************************************************
  //http://localhost:8080/topics/5914cbd4096e8c0db8e49ad1
  $.getJSON('/api' + window.location.pathname, function(results) {
    //results object
    $.getJSON('/api/comments', function(advice) {
    for(let i = 0; i < advice.length; i++) {
      const comment = `<li>${advice[i].comment}</li>`;
      $('.post-comments').append(comment);
    }
  });

    $('.one-topic').append(topic_idHTML);

    const topicID = results._id;
    const updatedAuthor= results.author;
    const updatedTitle = results.title;
    const content = results.content;

    $('.topic-container').append(content);
//****UPDATE**********
    $('.update').on('click', function() {
      const updatedTopic = $('.updating').val();
      console.log(updatedTopic);
      $('.topic-container').text(updatedTopic);

      $.ajax({
        url: URL +'/'+ topicID,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: JSON.stringify({
          author: updatedAuthor,
          title: updatedTitle,
          content: updatedTopic
        }),
        type: 'PUT',
      });
    });
//((((((((DELETE))))))))
    $('.delete').on('click', function() {
      alert('Are you sure you want to delete this post?');
      $.ajax({
        url: URL+'/'+topicID,
        type: 'DELETE'
      });
    });
//(((((((((DELETE)))))))))

    const commentID = window.location.pathname;

  });

  //CAPTURES USERS POST
  const URL = 'http://localhost:8080/topics';
  $.getJSON('/api' + window.location.pathname, function(results) {
  //tk-targeting the document, on the click of #create id, run event prevent default and to the ajax call on line 82
  $(document).on('click', '#create', function(event) {
    event.preventDefault();
    const userPost = $('.user-post-textarea').val();
    const userTitle = $('.user-title-textarea').val();
    const userAuthor = $('.user-author-textarea').val();

    $.ajax({
      url: URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: JSON.stringify({
        author: userAuthor,
        title: userTitle,
        content: userPost,
      }),
      type: 'POST',
    });
  });
});

});//End of document ready>>>>>>>>>>>>>>>>

//CAPTURES USER ADVICE 
$(document).on('click', '.send', function(data) {
  //console.log('This is giving advice.');
  commentID = window.location.pathname;
  let advice = $('.user-comment').val();
  comment = `<li class="advice">${advice}</li>`;
  $('.post-comments').prepend(comment);
  $('#commentField').val('');

  //const commentURL = 'http://localhost:8080//comments'
  $.ajax({
    url: 'http://localhost:8080/comments',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    data: JSON.stringify({
        //Need to pass the required fields
        comment: advice
      }),
    type: 'POST'
  }).catch(err => console.error(err));
});

const num = Math.floor(Math.random() * 20);

const topicHTML = `<div class="container1">
                    <div class="topic-header">
                      <div class="jumbotron">
                        <h1>Fix My Life</h1>
                        <p>We've all got problems, share the solutions!</p>
                        <form id="post-container">
                        <input type="textarea" id="userPost" class="user-post-textarea" placeholder="Share your Issue"><br>
                        <input type="textarea" id="userAuthor" class="user-author-textarea" placeholder="Name"><br>
                        <input type="textarea" id="userTitle" class="user-title-textarea" placeholder="Title"><br>
                      <button id="create" class="btn btn-lg btn-primary">REAL</button>
                    </form>
                    </div>

                    <ul class="questions"></ul>
                  </div>`;

const postHTML = `<div class="container2">
                      <div>
                        
                    </div>
                  </div>`;

                  //////
                  //////
//FOCUS on a single topic**********************************************
const topic_idHTML = `<div class="row">
                      <div class="topic-container"></div>
                      <div class="advice-container">
                        <section class="comments-section">
                          <h1>Give Advice</h1>
                          <input type="textarea" placeholder="enter advice here" id="commentField" class="user-comment">
                          <input type="submit" value="submit" class="send"></input>
                        </section>
                      </div>
                    </div>
                    <div class="container-bottom row">
                      <ul class="post-comments">
                      </ul>
                    </div>`;
