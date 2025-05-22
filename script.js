$(function(){
    let questions=[];
    //window.location.search: rucupere le text apre ? ex:quiz.html?cat=Informatique
    // URLSearchParams transformer ?cat=Informatique comme un objet ppour apliquee .get("cat") qui return la valeur de la cle cat 
    let category = new URLSearchParams(window.location.search).get("cat");

    $.getJSON('questions.json',function(data){//chargee tous les donnee contenent dans le fichier questions.json
        questions=data[category]//stocke les question uniqment de la category choiser

        let questionActuel=-1;//indice de la question actuel
        let score=0;

        afficheQuestion();//chargee le question avece les choix

        $('#next-btn').click(function(){//pour passer a la question suivant
            afficheQuestion();
            $('.choice').removeClass('disabled')// activer le clique sur les choix
            $('#next-btn').addClass('disabled')// desactiver le bouton next
        })

        $('#choices').on('click', '.choice', function(){

            $('.choice').addClass('disabled')// desactiver le clique sur les choix
            $('#next-btn').removeClass('disabled')// activer le bouton next

            if($(this).text()===questions[questionActuel].correct){
                $(this).addClass('correct'); // marquer la reponse comme correcte
                score+=10
            }else{
                $(this).addClass('incorrect ');
                score= Math.max(0, score - 5);//duminue le score jusqu a 0
            }
            $('#score').text(`Score : ${score}` )// mise a jour du score
        })

        function afficheQuestion(){
            questionActuel++;
            $('#question').text(questions[questionActuel].question)//remplacer la question precedent par le nouvelle question
            $('#choices').html("");//supprimer le choix prcedent
            for(option of questions[questionActuel].options){
                $('#choices').append(`<button class="choice">${option}</button>`)//ajoute les nouvaue choix
            }
        }
    })
})
