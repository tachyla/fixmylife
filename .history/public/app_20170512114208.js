$(document).ready(function() {
  $.getJSON(`/api/topics`, function(results) {
    //First append topicHTML to the first column
    //Second append postHTML to the second column
    $(`.topicColumn`).append(topicHTML);
    $(`.postColumn`).append(postHTML);
    for (let i = 0; i < 10; i++) {
      const question = results[i].content;
      const topic_id = results[i]._id;
      const questionHTML = `<a href="/topics/${topic_id}"><li>${question}</li><a/><br>`;
      //Third append  questions to the question class
      $(`.questions`).append(questionHTML);
    }
  });
  $.getJSON('/api/comments', function(advice) {
    //console.log(advice[0]);

    for(let i = 0; i < advice.length; i++) {
      const comment = `<li>${advice[i].comment}</li>`;
      //console.log(comment);
      $('.user-comments').append(comment);
    }
  })
  //UPDATE and DELETE**********************************************************************************************************
  //http://localhost:8080/topics/5914cbd4096e8c0db8e49ad1
  $.getJSON(`/api` + window.location.pathname, function(results) {
    //results is entire object

    //one-topic is entire DOM
    $(`.one-topic`).append(topic_idHTML);

    const topicID = results._id;
    const updatedAuthor= results.author;
    const updatedTitle = results.title;
    const content = results.content;

    $(`.container-left`).append(content);
//****UPDATE**********
    $('.update').on('click', function() {
      const updatedTopic = $('.updating').val();
      console.log(updatedTopic);
      $('.container-left').text(updatedTopic);

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

  //CAPTURES USERS POST*******************************************************************************************************
  const URL = 'http://localhost:8080/topics';
$.getJSON(`/api` + window.location.pathname, function(results) {
  $(document).on(`click`, `#create`, function(event) {
    event.preventDefault();
    const userPost = $(`.user-post-textarea`).val();
    const userTitle = $(`.user-title-textarea`).val();
    const userAuthor = $(`.user-author-textarea`).val();

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
////////USER ADVICE//////////////******************************* */
$(document).on('click', '.send', function(data) {
  //console.log('This is giving advice.');
  commentID = window.location.pathname;
  let comment = $('.user-comment').val();
  comment = `<li class="advice">${comment}</li>`;
  $('.post-comments').append(comment);

  //const commentURL = 'http://localhost:8080//comments'
  $.ajax({
      url: URL+'/'+commentID,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: JSON.stringify({
        //Need to pass the required fields
        comments: comment
      }),
      type: 'POST'
    }).catch(err => console.error(err));
});

const topicHTML = `<div class="container1">
                        <div class="jumbotron">
                          <h1>Trending Topics</h1>
                        <ul class="questions"></ul>
                      </div>`;

const postHTML = `<div class="container2">
                      <div class="jumbotron">
                        <h1>Post A Topic</h1>
                      <form id="post-container">
                        <input type="textarea" id="userPost" class="user-post-textarea" placeholder="Write your question"><br>
                        <input type="textarea" id="userAuthor" class="user-author-textarea" placeholder="Who are you"><br>
                        <input type="textarea" id="userTitle" class="user-title-textarea" placeholder="Give me a title"><br>
                      <button id="create" class="btn btn-primary">CREATE</button>
                    </form>
                    </div>
                  </div>`;
//FOCUS on a single topic**********************************************
const topic_idHTML = `<div class="row">
                      <div class="container-left col-md-8"></div>
                      <div class="container-right col-md-4">
                        <section class="comments-section">
                          <h1>Give Advice</h1>
                          <input type="textarea" class="user-comment">
                          <input type="submit" value="submit" class="send"></input>
                        </section>
                      </div>
                    </div>
                    <div class="container-bottom row">
                      <ul class="post-comments">
                      </ul>
                    </div>`;
