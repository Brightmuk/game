let chat_id=$("#chat_id").val()
console.log(chat_id)
$(() => {
var socket = io();
socket.on("message", addMessages)
    $("#send-button").click(()=>{
        event.preventDefault();
        let message={
            sent_message:$("#message").val(),
            chat_id:$("#chat_id").val(),
        }
        $.ajax({
            type:"post",
            url:'http://localhost:8000/send',
            data:{
               sent_message:$("#message").val(),
               chat_id:$("#chat_id").val(),
               
            },
            success: addMyMessages(message),
            error: console.log("Error occured ")
            
        })
        $('#message').val('')
        window.scrollTo(0,document.body.scrollHeight);
  
    })
    function addMyMessages(message){
        console.log("Message to be added")
       $("#messages").append(`
          <div class="my-message"> ${message.sent_message} </div>
          `)
       }  
function addMessages(message){
    console.log("Message to be added")
   $("#messages").append(`
      <div class="message"> ${message.sent_message} </div>
      `)
   }
   
function getMessages(){
  $.get('http://localhost:8000/messages'+chat_id, (data) => {
   data.forEach(addMessages);
   })
 }
 
})