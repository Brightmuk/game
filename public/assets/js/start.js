setTimeout( () => {
    document.getElementById('begin').style.display='none';
    document.getElementById('next').style.display='inline';
  }, 4600)
 

//generate random degree
function rotation(){
   
    //random for rotation
    var vals=[360,3600,720,1080,7200,1440,10800,2160,25200,2880,3240];
    var randomRotate=vals[Math.floor(Math.random() * vals.length)];
    console.log('Random rotation '+randomRotate)
    var min=1;
    var max=360;
    var randomNo=Math.round(Math.random()*(max-min)+min)
    console.log('Random no '+randomNo)

    //rotation
    var rotated=false;
    var div=document.getElementById('wheel');

    //multiply rotation by 100 to make it more realistic visually
    deg = rotated? 0:randomNo+randomRotate;
    console.log('degrees rotated '+deg)
    div.style.transition='5s'
    div.style.webkitTransform='rotate(-'+deg+'deg)';
    div.style.mozTransform='rotate(-'+deg+'deg)';
    div.style.msTransform='rotate(-'+deg+'deg)';
    div.style.oTransform='rotate(-'+deg+'deg)';
    div.style.transform='rotate(-'+deg+'deg)';
    div.style.transform='rotate(6 turn)';

     //render the chosen box
     function render(result,fate){
        setTimeout( () => {
        document.getElementById('result').innerHTML=result;  
        document.getElementById('spin').style.display="none";
        document.getElementById('fate').innerHTML=fate;

     
        }, 5700)
       }
    //getting value of result
    if(randomNo<360 && randomNo>324){
        console.log('got a 9')
        var result=9
        var fate="A royal born"
        render(result,fate)
    }else if(randomNo<324 && randomNo>288){
        console.log('got a 8')
        var result=8
        var fate="A high class born"
        render(result,fate)
     }else if(randomNo<288 && randomNo>252){
        console.log('got a 7')
        var result=7
         var fate="A middle class born"
        render(result,fate)
     }else if(randomNo<252 && randomNo>216){
        console.log('got a 6')
        var result=6
         var fate="A low class born"
        render(result,fate)
    }else if(randomNo<216 && randomNo>180){
        console.log('got a 5')
        var result=5
        var fate="A street child"
        render(result,fate)
    }else if(randomNo<180 && randomNo>144){
        console.log('got a 4')
        var result=4
        var fate="A royal born"
        render(result,fate)
    }else if(randomNo<144 && randomNo>108){
        console.log('got a 3')
        var result=3
        var fate="A high class born"
        render(result,fate)
    }else if(randomNo<108 && randomNo>72){
        console.log('got a 2')
        var result=2
        var fate="A middle class born"
        render(result,fate)
    }else if(randomNo<72 && randomNo>36){
        console.log('got a 1')
        var result=1
        var fate="A low class born"
        render(result,fate)
    }else if(randomNo<36 && randomNo>0){
        console.log('got a 0')
        var result='o'
        var fate="A street child"
        render(result,fate)
    }else{console.log('SPin again')
    var result="Your lucky, spin again"
    document.getElementById('lucky').innerHTML=result;
    }
       
  
    setTimeout( () => {
        // var s = document.getElementById('next').style; s.opacity = 1;
        // (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,400)})();
       
      }, 5700)
     
   
}

// var styles = `
// #boxes span{
//    display:none
// }

// `
//  var styleSheet = document.createElement("style")
//  styleSheet.type = "text/css"
//  styleSheet.innerText = styles
//  document.head.appendChild(styleSheet)