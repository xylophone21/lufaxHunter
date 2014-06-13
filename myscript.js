function test() {
}

$('body').after('<div class=\"lufax_hunter\"> <input type=\"text\" id=\"hunter_threshold\" value="100000"> <span id=\"hunter_counter\">0</span> <input type=\"checkbox\" id=\"hunter_switcher\"> LufanHunter </div>  ')
$(".lufax_hunter").css('top', '10px')
$(".lufax_hunter").css('left', '0px')
$(".lufax_hunter").css('position', 'fixed')

function notify(title,msg) {
  console.log("notify...");
  chrome.runtime.sendMessage({ event:"notify", message:msg, title:title });
}

var hunt_count = 0;

function hunt() {
  
  var threshold = 10000;
  
  var input_threshold = $('#hunter_threshold').val();
  if (input_threshold.length > 0) {
    threshold = parseFloat(input_threshold)
  }

  enabled = $('#hunter_switcher').prop('checked');
  if (enabled) {
    
    var ajax = $.ajax(window.location)
      .done(function (data) {
        table = $($.parseHTML(data)).find('#list-table');
        items = $.grep(table.find('.operate-status')
                       .not('.done-status')
                       .not('.preview-status'), function(item) {
                         node = $(item);
                         prev = node.prev();
                         cur = parseFloat(node.find('.cur:first').text().replace(',', ''));//最低投资金额
                         auction = node.find('a.btn-auction');//竞拍按钮
                         new_user = prev.find('i.new-user-icon');//新客按钮
                         return cur <= threshold && auction.length == 0 && new_user.length == 0;
                       });
        links = $.map(items, function(item) {
          return $(item).find('a:first')[0].href
        });

        if (links.length > 0) {  
          $('#hunter_switcher').prop('checked', false);
          notify("通知","可以购买了！抓紧时间!");
          window.open(links[0], '_blank');
        }

      });

    hunt_count = hunt_count + 1;
    $('#hunter_counter').text(hunt_count);
  }  
  setTimeout(hunt, 2000);
}

//似乎是初期的代码,购买要交易码?交易前暂不删除
function fill_pass() {
  chrome.storage.local.get({tradeCode: ''}, function(items) {
    $('#tradeCode').val(items.tradeCode);
  })
  $('#inputValid').select();
}


if (window.location.pathname.indexOf('list') == 1) {
  hunt();
}
//暂未实现
//else if (window.location.pathname.indexOf('/list/productDetail') == 1) {
//  fill_pass();
//}

