$.getJSON('/api' + window.location.pathname, function(results) {
  //results is the object
  const content = results.content;
  const comment = results.comment[];
  console.log(comment);
  $('.container-left').append(content);
});
const userComment = window.location.pathname;
$('.send').on('click', function() {
  const value = $('.user-comment').val();
  //value is the user input
  //console.log(value);
  //insert value to database

  fetch('/topics' + userComment, {
    method: 'PUT',
    body: { comment: value },
    success: 'Added comment to DB'
  });

  //This appends comments to the container-bottom
  //$('.container-bottom').append(value);
});
