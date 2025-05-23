$(document).ready(function(){
let categore=new URLSearchParams(window.location.search).get('cat');
let questions=0;
let data;
let actuelReponse;
let score=0;
ajoutQ();//charger les questions
$('#next-btn').click(function(){//changer les questions
    $('#next-btn').prop('disabled',true)
    $('.choice').prop('disabled',false)
    actuelReponse.css('background-color','')
    questions++;
    ajoutQ();
     })

function ajoutQ(){
     fetch("questions.json")//renvoi promise
     .then(res=>res.json())
     .then(res=>{
     data=res[categore][questions]
     $('.question').first().text(data.question)
     for (let i=0;i<4;i++){
        $('.choice')[i].innerHTML=data.options[i]  }
      })
      .catch(error=>console.error("Error lors de chargement de fichier JSON:",error));
     }
//les evenement  de click sur choise
$('#choices').on('click','.choice',function(){
    $('.choice').prop('disabled',true)
    $('#next-btn').prop('disabled',false)
    actuelReponse=$(this)
     if(actuelReponse.text()===data.correct){
          actuelReponse.css('background-color','green')
          score+=10;
          $('#score').text(`Score : ${score}`)
      }
     else{
       actuelReponse.css('background-color','red')
       score=Math.max(0,score-5); 
       $('#score').text(`Score : ${score}`)  
       }
    })
})

