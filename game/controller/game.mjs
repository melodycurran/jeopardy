import { getClues } from "../model/getData.mjs";
import { formatCategories } from "../model/getData.mjs";
import { random } from "../model/getData.mjs";
import { getJson } from "../model/getData.mjs";

export const Game = {
    /*Facilitates the game */

    init() {
        this.createBoard();
        this.playerScore = 0;
    },

    async createBoard() {
        /* Main function */

        let divContainer = document.querySelector('#jeopardy-board__div');
        let main = document.querySelector('#jeopardy-board');
        let categories;
        let clues;


        //get the fomatted categories
        try {
            categories = await formatCategories();
            //Create a container for the uls and lis
        } catch {
            categories = await getJson();
        }

        categories.forEach(async element => {
            //Create ul for each category
            let ul = document.createElement('ul');
            ul.textContent = element.title;
            divContainer.append(ul);

            //Calling the clues API then cutting it down to the first 5 questions
            //I can't set the item limit to just 5 using search params, I guess it's defaulted to 100
            let randomNum = random(5);

            try {
                clues = (await getClues(element.id)).slice(0,5);
            } catch {
                clues = element.data;
            }
                
            clues.forEach((item, index) => {
                //Adding property of winning in each question object with increments of 100 to 500
                item.winning = (index + 1) * 100;

                //Create lis and buttons for each clues
                let li = document.createElement('li');
                let btn = document.createElement('button');

                btn.setAttribute('class', 'btns');
                btn.setAttribute('id', `#${item.id}`);
                li.setAttribute('class', 'jeopardy-board__li');
                btn.textContent = `$${item.winning}`;
                
                ul.append(li);
                li.append(btn);
                
                //add listener for each buttons clicked
                btn.addEventListener('click', (e) => {
                    this.manageClickedTiles(item.question, btn, main, item.answer, item.winning);
                });
            });
        });   
    },

    manageClickedTiles(question, btn, mainEl, correctAnswer, winning) {
        /*Shows the question tile pop up when the tile from the board is clicked */

        //when clicked, create these elements and add the questions inside
        let div = document.createElement('div');
        let x = document.createElement('button');
        let answerInput = document.createElement('input');
        let submitBtn = document.createElement('button');
        let p = document.createElement('p');

        div.setAttribute('class', 'questions');
        x.setAttribute('class', 'x-button');
        answerInput.setAttribute('class', 'answer-input');
        answerInput.setAttribute('type', 'text');
        submitBtn.setAttribute('class', 'answer-btn');

        p.textContent = question;
        x.textContent = 'X';
        submitBtn.textContent = 'Submit Answer';

        div.append(p);
        div.append(x);
        div.append(answerInput);
        div.append(submitBtn);
        mainEl.append(div);


        let id = btn.getAttribute('id');

        //This returns the button inside the li that contains the question
        let tileBtn = document.getElementById(id);

        //Listen when the submit button is clicked
        submitBtn.addEventListener('click', () => {
            this.evaluateAnswer(correctAnswer, winning);

            //Disable submit button once it's clicked
            answerBtn.disabled = true;
        });

        this.closeTile(tileBtn);

    },

    closeTile(tileBtn) {
        /* This function will close the question tile */

        let div = document.querySelector('.questions');
        let btn = document.querySelector('.x-button');

        //Run a timer that closes the tile when it reached 5 seconds
        setTimeout(close,10000);

        //Listen if the x-button is clicked then close
        btn.addEventListener('click', close);

        function close() {

            //Removes the whole question tile
            div.remove();

            //Removes the questions with its button container leaving only empty li
            tileBtn.remove();
        }
        
    },

    evaluateAnswer(playerAnswer, winning) {
        /* This evaluates if the player entered the correct answer or not */
        
        //Get the value of the input element
        let answer = document.querySelector('.answer-input').value;

        let msg = "";
        let earnedScore = 0;

        if (answer === playerAnswer) {
            console.log('correct');
            msg = `Correct`;
            earnedScore = winning;
        } else if (answer === undefined || answer === "" || answer === null){
            msg = `No answer entered`;
        } else {
            console.log('wrong');
            msg = `Wrong. The answer is ${playerAnswer}`;
            earnedScore = -winning
        } 
        
        this.confirmAnswer(msg);
        
        this.playerScore += earnedScore;

        //To make sure there's no negative score
        if (this.playerScore < 0) this.playerScore = 0;

        this.displayScore(this.playerScore);

        //Store score to localstorage
        window.localStorage.setItem('score', JSON.stringify(this.playerScore));

    },

    displayScore(score) {
        /*This renders and displays score to the page */

        let scoreHTML = document.querySelector('#score');
        let scoreSpan = scoreHTML.querySelector('span');

        //Remove previous element
        if (scoreSpan !== null) scoreSpan.remove();

        let span = document.createElement('span');
        
        scoreHTML.append(span);
        span.innerHTML = score
        
    },

    confirmAnswer(msg) {
        /*This displays if the player's answer is correct or not on the question tile */

        let div = document.querySelector('.questions');
        let msgP = div.querySelector('.confirmation-msg');

        //Remove previous element
        if (msgP !== null) {
            msgP.remove();
        }

        let p = document.createElement("p");
        p.setAttribute('class', 'confirmation-msg');
        p.textContent = msg;
        div.append(p);
    },

}