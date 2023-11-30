
export function user() {
    let playBtn = document.querySelector("#play");

    playBtn.addEventListener("click", (e) => {
        e.preventDefault()
       let username = document.querySelector('#username').value;
       location.assign('../view/play.html');

       return username;
    })
}
