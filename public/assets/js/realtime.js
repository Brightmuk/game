var socket = io();
socket.on('message', addMessages)

function addMessages(message){
    console.log("Message to be added is: " +message)
   $("#messages").append(`
      <div class="message"> ${message.text} </div>
      `)
   }
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
            error: function (request, status, error) {
                alert(request.responseText);}
            
        })
        $('#message').val('');
      
        window.scrollTo(0,document.body.scrollHeight);
  
    })
    function addMyMessages(message){
       
       $("#messages").append(`
          <div class="my-message"> ${message.sent_message} </div>
          `)
       }  

   
function getMessages(){
    $.ajax({
        type:"GET",
        url:'http://localhost:8000/messages'+chat_id,
       
        success: function(res){
            console.log(res)
           res.forEach((message,index)=>{
               addMessages(message)
           })
        },
        error: function (request, status, error) {
            alert(request.responseText);}
        
    })
 }

})