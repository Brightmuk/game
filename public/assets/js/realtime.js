var server = "http://localhost:8000";
var socket = io(server);
let chat_id=$("#chat_id").val()

socket.emit("join-chat",chat_id)

socket.on("new_message", function (message) {
	addMessages(message)
});


function addMessages(message){
   $("#messages").append(`
      <div class="message"> ${message.sent_message} </div>
      `)
      window.scrollTo(0,document.body.scrollHeight);
   }



    $("#send-button").click(()=>{
        event.preventDefault();

        let message={
            sent_message:$("#message").val(),
            chat_id:$("#chat_id").val(),
        }
        if(message.sent_message.length<1){
            console.log("No message")
        }else{

        $.ajax({
            type:"post",
            url:'http://localhost:8000/send',
            data:{
               sent_message:$("#message").val(),
               chat_id:$("#chat_id").val(),
               
            },
            success: addMyMessages(message),
            error: function (request, status, error) {
               console.log(error);}
            
        })
    }
        $('#message').val('');
      
  
    })
    function addMyMessages(message){
        socket.emit('new_message', message,chat_id)
       $("#messages").append(`
          <div class="my-message"> ${message.sent_message} </div>
          `)
          window.scrollTo(0,document.body.scrollHeight);
         
       }  



