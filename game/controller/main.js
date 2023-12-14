import { music } from "/controller/playMusic";
import { createPlayer } from "./register.mjs";

//This file works with homepage
    // music();
    //Listen for user's username submission
    document.querySelector("#play").addEventListener("click", async (e) => {

        e.preventDefault()
        
        //Get the value of the input which is the player's supplied username
        let username = document.querySelector('#username').value;

        //Call the CreatePlayer constructor function to create player object
        let player = new createPlayer(username);

        //Store the player object into the localstorage
        window.localStorage.setItem('so-player', JSON.stringify(player));

        //Direct player to the game page
        location.assign('./game/view/play');
});



