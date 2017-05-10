

$.getJSON('https://reddit.com/r/relationships.json', function(req, res) {
  res.json();
});

function getItems() {
  $('.container').append(data);
}

getItems();
