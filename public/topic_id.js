// console.log(window.location);
$.getJSON('/api/topics/:topic_id', function (results) {
  $('.container-left').append(results);
  // res.json(results.content);
  // const clickedTopic = results.content;
  // console.log(clickedTopic);
});