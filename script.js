$(document).ready(async function(){
  let questions=[];
  let actuelQuestion=0;
  let score=0;
  let categore=new URLSearchParams(window.location.search).get('cat'); // Récupère la valeur de la catégorie choisie depuis l'URL
  
  try {
    const res = await fetch("questions.json"); // Charger le fichier JSON
    const data = await res.json(); // Convertir en objet JS
    questions = data[categore]; // Récupérer les questions de la catégorie
  } catch (error) {
    console.error("Erreur lors du chargement du fichier JSON:", error);
  }
  
  afficheQustion();// Afficher la question

  $('#next-btn').click(function(){//passe a la question suivant
      $('#next-btn').addClass('disabled')//disactiver le button next 
      $('.choice').removeClass('disabled')//active click sur les choice
      actuelQuestion++;
      afficheQustion();
      })
  //les click sur les choises
  $('#choices').on('click','.choice',function(){
      $('.choice').addClass('disabled')//disactiver le click sur les choix
      $('#next-btn').removeClass('disabled')//activer le button :pour acceder a la question suivant
      if($(this).text()===questions[actuelQuestion].correct){//
          $(this).css('background-color','#6ee7b7')
          score+=10;
        }
      else{
        $(this).css('background-color','#fca5a5')
        score=Math.max(0,score-5); //diminue le score par 5 jusqua 0   
      }
      $('#score').text(`Score : ${score}`)
  })

    function afficheQustion(){
      $('#question').text(questions[actuelQuestion].question)//ajouter le question
      $('#choices').html('')//vider les choix précédent
    for(choix of questions[actuelQuestion].options){
      $('#choices').append(`<div class="choice">${choix}</div>`)//ajouter les choix
    }
  }
})
