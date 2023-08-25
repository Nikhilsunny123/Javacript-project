document.addEventListener('DOMContentLoaded', function () {

    // https://www.youtube.com/watch?v=bznJPt4t_4s&t=742s

    const colors = ["red", "blue", "green", "yellow", "teal", "cyan", "grey", "pink"];
    const colorsPickList = [...colors, ...colors]; //double the array
    const moves = document.querySelector('#no-of-moves');
    let flippedCards = [];
    let matchedColors = 0;
    let timerElement = document.getElementById("timer");

    // Code with Ania Kubów

    const shufColors = colorsPickList.sort(() => 0.5 - Math.random());  // for randomly select colors
    const cardContainer = document.querySelector('.cards');

    //creating gameboard
    // https://www.youtube.com/watch?v=HCIFLBUldW8&t=2050s

    function gameBoard() {
        for (let i = 0; i < colorsPickList.length; i++) {
            //creating 16 div to the page
            let box = document.createElement('div');
            // giving colors to the div            
            box.style.backgroundColor = shufColors[i];
            box.setAttribute('data-color', shufColors[i]);
            // adding a class backcard
            box.classList.add('backcard');
            cardContainer.appendChild(box);
            box.addEventListener('click', flipCard);
        }
    }

    //fliping cards (clicking cards to show the color)
    function flipCard() {
        // checking the number of clicked cards are less than 2
        if (flippedCards.length < 2) {
            this.getAttribute('data-color');
            // adding the clicked cards to flippedCards array
            flippedCards.push(this);
            this.classList.remove('backcard');
            this.style.backgroundColor = colors['data-color'];
            // checking the number of clicked cards are equal to 2 and making a break 300 miliiseconds to view
            if (flippedCards.length == 2) {
                setTimeout(checkMatch, 300);
            }
        }
    }

    // checking matching colors

    function checkMatch() {

        //taking the attribute of data-color to two variables
        const firstColor = flippedCards[0].getAttribute('data-color');
        const secondColor = flippedCards[1].getAttribute('data-color');
        // check first color and second color are same
        // and checking the same card clicks twice

        if ((firstColor === secondColor) && (flippedCards[0] != flippedCards[1])) {

            //remove the click events for the same color card
            flippedCards[0].removeEventListener('click', flipCard);
            flippedCards[1].removeEventListener('click', flipCard);
            matchedColors++;
            checkGameOver();

        } else {
            // both cards going back to the class backcard
            flippedCards[0].classList.add('backcard');
            flippedCards[1].classList.add('backcard');

        }
        //empty the flippedCards array
        flippedCards = [];

        // counting the moves function for each pair
        addMove();
    }

    // counting the moves
    let movescount = 0;
    moves.innerHtml = 0;
    function addMove() {
        movescount++;
        moves.innerHTML = movescount;
    }
    //time settings
     let currentTime=null
    setInterval(function () {

       currentTime = timerElement.innerHTML;
        currentTime++;
        timerElement.innerHTML = currentTime;
    }, 1000);


    // checking game is over
    function checkGameOver() {
        //checking the numbers of matchedColors and colors array length 
        if (matchedColors == colors.length) {
            cardContainer.innerHTML = 'you won';
            //removing the container class and adding new class won
            cardContainer.classList.remove('game-container');
            cardContainer.classList.add('won');
            let puasedTimer=currentTime
            timerElement.innerHTML = puasedTimer;
           
        }
    }
    gameBoard();

});


