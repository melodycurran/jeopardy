import { getCategories } from "../model/getData";
import { getClues } from "../model/getData";


const Play = {
    date: new Date(),
    score: 0,

    init() {
        this.score;
        this.createBoard();
    },

    async createBoard() {
        let id;
        let categories = await getCategories();

        categories.forEach(async (element, index) => {
            if (element.clues_count < 5) {
                return categories.splice(index, 1);    
            }
        });
        console.log(categories);

        let newCat = categories.slice(0,6);
        console.log(newCat);

        newCat.forEach(async element => {
            let clues = (await getClues(element.id)).splice(0,5);
            console.log(clues);

            let main = document.querySelector('#jeopardy-board');
            let ul = document.createElement('ul');
            ul.textContent = element.title;
            main.append(ul);

            clues.forEach((item, index) => {
                item.winning = (index + 1) * 100;
                let btn = document.createElement('button');
                btn.setAttribute('class', 'btns');
                let li = document.createElement('li');
                let div = document.createElement('div');
                div.setAttribute('class', 'questions');
                div.setAttribute('id', `${item.id}`);
                div.textContent = item.question;

                ul.append(li);
                btn.textContent = `$${item.winning}`;
                li.append(btn);
                btn.append(div);

                let buttons = document.querySelectorAll('.btns');
                buttons.forEach(btn => btn.addEventListener('click', () => {
                    id = div.getAttribute('id');
                    // div.classList.replace('questions', 'show');
                }));
                console.log(id);
            });
        });


    },

}

Play.init();
let history = {date: Play.date, score: Play.score};
console.log(history);
export default history;