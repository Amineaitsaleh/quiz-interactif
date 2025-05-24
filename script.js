$(document).ready(function(){
let categore=new URLSearchParams(window.location.search).get('cat');
let questions=0;
let data;
let actuelReponse;
let score=0;
 //window.location.search: rucupere le text apre ? ex:quiz.html?cat=Informatique
    // URLSearchParams transformer ?cat=Informatique comme un objet ppour apliquee .get("cat") qui return la valeur de la cle cat 
getdata();//charger les questions
$('#next-btn').click(function(){//
    $('#next-btn').prop('disabled',true)//disactiver le button next 
    $('.choice').prop('disabled',false)//active click sur les choice
    actuelReponse.css('background-color','')//initialiser le color de reponce choisi
    questions++;
     getdata();
     })

async function getdata(){
    try{ 
    let cachedQuestion=null;// //utilise pour n'est pas chaque appele lire les donnes a vec fetch
      if(!cachedQuestion){
    const reponse =await fetch('questions.json'); //attend la reponse de requete
    cachedQuestion=await reponse.json(); //attend que le fichier json soit lu et converti
      }
      data=cachedQuestion[categore][questions]
    $('#question').text(data.question)//ajouter le question
     $('#choices').html('')//vider les choix précédent
  for(i of data.options){
   $('#choices').append(`<div class="choice">${i}</div>`)//ajouter les choix
  }
     }
   catch (error){
  console.error(error);
   }
  }

//les click sur les choises
$('#choices').on('click','.choice',function(){
    $('.choice').prop('disabled',true)//disactiver le click sur les choix
    $('#next-btn').prop('disabled',false)//activer le button :pour acceder a la question suivant
    actuelReponse=$(this)
     if(actuelReponse.text()===data.correct){//
          actuelReponse.css('background-color','green')
          score+=10;
          $('#score').text(`Score : ${score}`)
      }
     else{
       actuelReponse.css('background-color','red')
       score=Math.max(0,score-5); //diminue le score par 5 jusqua 0 
       $('#score').text(`Score : ${score}`)  
       }
    })
})
