$.getJSON('/api' + window.location.pathname, function(results) {
  $('.container-left').append(results);
});

$('.send').on('click', function() {
  const value = $('.user-comment').val();
  //insert value to database

  //append comment to post
  //Needs to adjust schema

  $.ajax(
    method: 'PUT',
    contentType: 'application/json',
    url: 'api/items' + window.location.pathname,
    data: JSON.stringify({ comment: value }),
    success: function(response) {
      console.log(response);
      $('.put-comments').append(`<li>${value}</li>`);
    }
  });

});
