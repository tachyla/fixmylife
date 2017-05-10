console.log('hello');

const data = AdviceEntry.find();

function getItems() {
  $('.container').append(data);
}

getItems();
