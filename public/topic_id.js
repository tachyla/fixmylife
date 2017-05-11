 $.getJSON('/api' + window.location.pathname, function (results) {
      $('.container-left').append(results);
    });
