$(function() {
  $('.del').click(function(evt) {
    var target = $(evt.target);
    var id = target.data('id');
    $.ajax({
      url: '/admin/movie/list?id=' + id,
      type: 'DELETE'
    })
    .done(function(data) {
      if (data.success) {
        var tr = $('.movie-id-' + id);
        if (tr.length > 0) {
          tr.remove();
        }
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  });
});