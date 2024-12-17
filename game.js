let buttonColours = ["red", "green", "yellow", "blue"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

//gestione evento pressione pulsante tastiera
$(document).keypress(function(){
    //se il gioco non è ancora cominciato lo faccio partire
    if(!started){
        started = true;
        $("#level-title").text("level " + level);
        nextLevel();
    }
});

//gestisco l'input del giocatore
$(".btn").click(function(){
    //rilevo il colore premuto dal giocatore
    let userChoosenColor = $(this).attr("id");
    //aggiungo il colore premuto al pattern dell'utente
    userClickedPattern.push(userChoosenColor);
    //metto il suono
    playSound(userChoosenColor);

    animatePress(userChoosenColor);

    //controlliamo il risultato attuale
    check(userClickedPattern.length-1);
});

//funzione di check
function check(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //se sono all'ultimo livello devo andare al prossimo
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextLevel();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("game over, FROCIONE");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        startOver();
    }
}

//funzione che emette l'effetto sonoro ad ogni click sul pulsante
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 150);
}


//funzione di reset di stato del gioco
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

//funzione che genera il livello successivo
function nextLevel(){
    //azzero il pattern del giocatore 
    userClickedPattern = [];
    //aumento il livello
    level++;
    //aggiorno il testo a video
    $("#level-title").text("level " + level);
    //genero randomicamente un numero 
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColours[randomNumber];
    //aggiungo il colore estratto al pattern del game
    gamePattern.push(randomColor);
    //animazione del colore estratto dall'IA
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}