

window.addEventListener('DOMContentLoaded', () => {

    const cells = document.getElementsByClassName("cell");
    const reset = document.getElementById("reset");
    let currentPlayer = document.querySelector(".player");
    let winningPlayer = document.querySelector(".winner");

    let turnPlayer = "X" //implementare scelta casuale
    let numberTurns = 1;
    let checkWin = [];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function changeTurn(){
        numberTurns++;
        if(turnPlayer === "X"){
            turnPlayer = "O";
            currentPlayer.innerText = turnPlayer;
        }
        else{
            turnPlayer = "X";
            currentPlayer.innerText = turnPlayer;
        }
    }

    function winner(isTie){
        winningPlayer.style.display = "block";

        if(isTie === "TIE")
            winningPlayer.innerText = `Players tied`;
        else{
            winningPlayer.innerText = `Player ${turnPlayer} Won in ${numberTurns} rounds`;
            for(i=0; i<cells.length; i++){
                cells[i].style.pointerEvents="none";
            }
        }  
    }

    function checkWinner(){

        for(i=0; i<winningConditions.length; i++){
            //ciclo i tre valori dentro ogni winningCondition
            for(let j=0; j<3; j++){
                checkWin.push (cells[winningConditions[i][j]]);
            } 
            
            let a = checkWin[0].innerText;
            let b = checkWin[1].innerText;
            let c = checkWin[2].innerText;
             
            if((a === b && b === c) &&( a!="" && b!="" && c!="")){
                winner("");
                break;
            }
            if(numberTurns === 9){
                winner("TIE");
            }

            checkWin =[];
        }
            
    }

    function turn(ev){
        ev.innerText = turnPlayer;
        ev.style.pointerEvents="none";
               
        if(numberTurns >= 5)
            checkWinner();

        changeTurn();
    }

    for(i=0; i<cells.length; i++){
        cells[i].addEventListener("click", function() {
            turn(this);
        });

        cells[i].addEventListener("keypress", function(event) {
            if (event.key === "Enter"){
                turn(this);
            }
        });

    }

    reset.addEventListener("click", ()=>{
        for(i=0; i<cells.length; i++){
            cells[i].innerText="";
            cells[i].style.pointerEvents="auto";
        }
        numberTurns = 1;
        winningPlayer.style.display = "none";

        //qui generare player casuale
    })
});