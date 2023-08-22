document.addEventListener('DOMContentLoaded', function () {

    const colors = ["red", "blue", "green", "yellow", "teal", "cyan", "grey", "pink"];
    const colorsPickList = [...colors, ...colors]; //double the array
    let flippedCards = [];
    let matchedColors = 0;
    // shuffling Colors
    const shufColors = colorsPickList.sort(() => 0.5 - Math.random());  // for randomly select colors
    const cardContainer = document.querySelector('.cards');

    //creating gameboard
    function gameBoard() {
        for (let i = 0; i < colorsPickList.length; i++) {
            let box = document.createElement('div');
            // box.className = 'card';
            box.style.backgroundColor = shufColors[i];
            box.setAttribute('data-color', shufColors[i]);
            box.classList.add('backcard');
            box.classList.add('active');
            cardContainer.append(box);
            box.addEventListener('click', flipCard);

        }
    }
    function flipCard() {
        if (flippedCards.length < 2) {
            let cardColor = this.getAttribute('data-color');
            flippedCards.push(this);
            this.classList.remove('backcard');
            this.style.backgroundColor = colors['data-color'];
            if (flippedCards.length == 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }
    function checkMatch() {
        const firstColor = flippedCards[0].getAttribute('data-color');
        const secondColor = flippedCards[1].getAttribute('data-color');
        console.log(secondColor);
        console.log(firstColor);
        if (firstColor === secondColor) {
            flippedCards[0].removeEventListener('click', flipCard);
            flippedCards[1].removeEventListener('click', flipCard);

        } else {
            flippedCards[0].classList.add('backcard');
            flippedCards[1].classList.add('backcard');

        }
        flippedCards = [];
    }
    gameBoard();

});


