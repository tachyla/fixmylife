

$.getJSON('https://reddit.com/r/relationships.json?limit=10', function(results) {
  const questions = results.data.children[0].data.selftext;
  // const template = '<li>';
  // const html = questions.forEach(question => { template + question.data.selftext + '</li>'; });
  // console.log(html);
  //$('.questions').append(html);
  const htmlString = `<li>${questions}</li>`;
  //console.log(htmlString);
  $('.questions').append(htmlString);
  //console.log(results.data.children[0].data.selftext);
});

// $.getJSON(
//         "http://www.reddit.com/r/pics.json?jsonp=?",
//         function foo(data)
//         {
//           $.each(
//             data.data.children.slice(0, 10),
//             function (i, post) {
//               $("#reddit-content").append( '<br>' + post.data.title );
//               $("#reddit-content").append( '<br>' + post.data.url );
//               $("#reddit-content").append( '<br>' + post.data.permalink );
//               $("#reddit-content").append( '<br>' + post.data.ups );
//               $("#reddit-content").append( '<br>' + post.data.downs );
//               $("#reddit-content").append( '<hr>' );
//             }
//           )
//         }
//       )
// function getItems() {
//   $('.container').append(data);
// }

// getItems();
