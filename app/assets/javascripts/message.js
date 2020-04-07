$(function(){
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main-chat__messages__lists1">
       </div>
       <div class="message" data-message-id="${message.id}">
        <div class="main-chat__messages__lists1__group">
          <div class="main-chat__messages__lists1__group__member-name">
            ${message.user_name}
          </div>
        <div class="main-chat__messages__lists1__group__date">
          ${message.created_at}
        </div>
        </div>
          <div class="main-chat__messages__lists1__text">
            <p class="main-chat__messages__lists1__text">
              ${message.content}
            </p>
            <img src="${message.image}" calss="lower-message__image">
          </div>
        </div>
       `
     return html;
   } else {
     var html =
      `<div class="main-chat__messages__lists1">
      </div>
       <div class="message" data-message-id="${message.id}">
        <div class="main-chat__messages__lists1__group">
          <div class="main-chat__messages__lists1__group__member-name">
            ${message.user_name}
          </div>
        <div class="main-chat__messages__lists1__group__date">
          ${message.created_at}
        </div>
        </div>
          <div class="main-chat__messages__lists1__text">
            <p class="main-chat__messages__lists1__text">
              ${message.content}
            </p>
          </div>
        </div>
       `
     return html;
   };
  }
 $('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-chat__messages').append(html);
    $('form')[0].reset();
    $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
    $('.form__submit').removeAttr('disabled');
  })
  .fail(function(){
    alert("メッセージ送信に失敗しました");
  })
 })

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-chat__messages').append(insertHTML);
      $('.main-chat__messages').animate({ scrollTop: $('.main-chat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
   };
   if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});