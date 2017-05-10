
    $.getJSON('/items', function(results){

      for(let i = 0; i < 10; i ++) {
        const question = results[i].content;
        console.log(question);

        const htmlString = `<a href="#"><li>${question}</li><a/><br>`;      
        $('.question').append(htmlString);
      }
    });
    //will contain questions
    //will contain author
    //will contain title
    //will contain comments

    


//function getData(question) {
  //Need to get data from DB

  //Append to question UL  
  //let html = `<li>${question}</li>`;
 //// $('.question').append(html);

// function getQuestions() {
//   $.getJSON('https://reddit.com/r/relationships.json?limit=10', function(results) {
  
//     for(let i = 0; i < 10; i ++) {
//       const question = results.data.children[i].data.selftext;
//       const htmlString = `<a href="#"><li>${question}</li><a/><br>`;

//       // AdviceEntry
//       //   .insert(question);
//       $('.questions').append(htmlString);
//     }
//   });
// }
 

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

