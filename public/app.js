$.getJSON('/items', function (results) {
  for (let i = 0; i < 10; i++) {
    const question = results[i].content;
    const topic_id = results[i]._id;
    const htmlString = `<a href="/topics/${topic_id}"><li>${question}</li><a/><br>`;
    $('.questions').append(htmlString);
  }
});
// console.log(window.location);
// $.getJSON('/api/topics/', function (results) {
//   console.log(results.content);
//   $('.container-left').append(results);
//  });
    //1-nedd to get the topic
    //2- render topic to appropriate container

$('.submit-post').on('click', function() {
  const value = $('.user-post-textarea').val();
  //insert value to database

  //append comment to post
  $('.post-comments').append(`<li>${value}</li>`);

  $.ajax({
    method: 'POST',
    dataType: 'json',
    url: '/items',
    data: '{"content": value}'
  });
});