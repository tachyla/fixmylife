$.getJSON('/api' + window.location.pathname, function(results) {
  $('.container-left').append(results);
});

$('.send').on('click', function() {
  const value = $('.user-comment').val();
  //insert value to database

  //append comment to post
  $('.post-comments').append(`<li>${value}</li>`);

  $.ajax({
    type: 'PUT',
    dataType: 'json',
    url: 'http://localhost:8080/items/:_id',
    data: '{"comment": value}',
  });

});
