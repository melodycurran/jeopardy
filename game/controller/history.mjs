
export function addHistoryProperty() {
    /*Adds score to the playerData object */

    let playerData = JSON.parse(window.localStorage.getItem('so-player'));
    let score = window.localStorage.getItem('score');

    playerData.score = score;
    
    //Store to local storage
    window.localStorage.setItem('so-player', JSON.stringify(playerData));
}
