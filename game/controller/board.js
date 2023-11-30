import { getData } from "../model/getData";
const categoryURL = import.meta.env.VITE_GAME_URL_CATEGORIES;

export function createBoard() {

    //Request 6 categories from jeopardy API
    const data = getData(categoryURL + '?count=6');
    console.log(data);

    let table = document.createElement('table');
    table.setAttribute('id', 'jeopardy-table');

    //Create 6 headers with 5 td each
    for (let i = 0; i < 6; i++) {
        let th = document.createElement('th');
        table.append(th);
        for (let j = 0; j < 5; j++) {
            let td = document.createElement('td');
            th.append(td);
        }
    }

    let div = document.querySelector('#jeopardy-board');
    console.log(div);
    div.append(table);

    console.log(table);
    return table;
}

createBoard();
