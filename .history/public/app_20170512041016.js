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
//UPDATE and DELETE**********************************************************************************************************
  //http://localhost:8080/topics/5914cbd4096e8c0db8e49ad1
  $.getJSON(`/api` + window.location.pathname, function(results) {
    $(`.one-topic`).append(topic_idHTML);
    //results is the object
    const content = results.content;
    const comment = results.comment;
    $(`.container-left`).append(content);
  });

  //CAPTURES USERS POST*******************************************************************************************************
  const commentID = window.location.pathname;
  const URL = 'http://localhost:8080/topics';
  $(document).on(`click`, `#create`, function(event) {
    event.preventDefault();
    const userPost = $(`.user-post-textarea`).val();
    const userTitle = $(`.user-title-textarea`).val();
    const userAuthor = $(`.user-author-textarea`).val();

    $.ajax({
      url: URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: JSON.stringify({
        author: userAuthor,
        title: userTitle,
        content: userPost
      }),
      type: 'POST'
    })
  });

});
// $('.submit-post').on('click', function() {
//   const value = $('.user-post-textarea').val();
//   //insert value to database

//   //append comment to post
//   $('.post-comments').append(`<li>${value}</li>`);

//   fetch({
//     method: 'POST',
//     dataType: 'json',
//     url: 'http://localhost:8080/topics',
//     data: '{"content": value}',
//   });
// });

const topicHTML = `  <div class="container1">
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
                          <h1>Comasdfments</h1>
                          <input type="textarea" class="user-comment">
                          <input type="submit" value="submit" class="send"></input>
                        </section>
                      </div>
                    </div>
                    <div class="container-bottom row">
                      <ul class="post-comments">
                      </ul>
                    </div>`;
