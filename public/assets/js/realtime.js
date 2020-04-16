let chat_id=$("#chat_id").val()
console.log(chat_id)
$(() => {
var socket = io();
socket.on("message", addMessages)
    $("#send-button").click(()=>{
        $.ajax({
            type:"post",
            url:'http://localhost:8000/send',
            data:{
               sent_message:$("#message").val(),
               chat_id:$("#chat_id").val(),
               
            },
            success:console.log("sent")
            
        
        })
  
    })
    
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