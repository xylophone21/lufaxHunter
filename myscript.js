function test() {
}

$('body').after('<div class=\"lufax_hunter\"> <input type=\"text\" id=\"hunter_threshold\"> <span id=\"hunter_counter\">0</span> <input type=\"checkbox\" id=\"hunter_switcher\"> LufanHunter </div>  ')
$(".lufax_hunter").css('top', '10px')
$(".lufax_hunter").css('right', '10px')
$(".lufax_hunter").css('position', 'fixed')

var hunt_count = 0;

function hunt() {
  
  var threshold = 10000;
  
  var input_threshold = $('#hunter_threshold').val();
  if (input_threshold.length > 0) {
    threshold = parseFloat(input_threshold)
  }

  enabled = $('#hunter_switcher').prop('checked');
  if (enabled) {
    
    var ajax = $.ajax('http://list.lufax.com/list/listing')
      .done(function (data) {
        table = $($.parseHTML(data)).find('#list-table');
        items = $.grep(table.find('.operate-status')
                       .not('.done-status')
                       .not('.preview-status'), function(item) {
                         node = $(item);
                         prev = node.prev();
                         cur = parseFloat(node.find('.cur:first').text().replace(',', ''));
                         auction = node.find('a.btn-auction');
                         new_user = prev.find('i.new-user-icon');
                         return cur <= threshold && auction.length == 0 && new_user.length == 0;
                       });
        links = $.map(items, function(item) {
          return $(item).find('a:first')[0].href
        });

        if (links.length > 0) {  
          $('#hunter_switcher').prop('checked', false);
          window.open(links[0], '_blank');
        }

      });

    hunt_count = hunt_count + 1;
    $('#hunter_counter').text(hunt_count);
  }  
  setTimeout(hunt, 2000);
}


function fill_pass() {
  chrome.storage.local.get({tradeCode: ''}, function(items) {
    $('#tradeCode').val(items.tradeCode);
  })
  $('#inputValid').select();
}


if (window.location.pathname.indexOf('list') == 1) {
  hunt();
}

if (window.location.pathname.indexOf('trading') == 1) {
  fill_pass();
}

