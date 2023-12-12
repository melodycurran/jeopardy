const categoriesURL = import.meta.env.VITE_GAME_URL_CATEGORIES;
const cluesURL = import.meta.env.VITE_GAME_URL_CLUES;

async function sendRequest(url) {
    /* Fetches the random jeopardy data*/
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }

    const res = await fetch(url, options);
    const data = res.json();
    return data;
}

async function getCategories() {
    /*calls the category API.  */
    
    //Creates a random number from 0 - 100
    let randomNum = Math.floor(Math.random() * 100);

    //Gets at least 20 so if the clues are less than 5
    //no need to call the API again, just remove objects from the list
    let cat = (await sendRequest(categoriesURL + '?count=100')).slice(randomNum,20);
    console.log(cat);
    return cat;

}


export async function getClues(element) {
    /*Calls the clues API */
    return await sendRequest(cluesURL + `?category=${element}`);
}


export async function formatCategories() {
    let categories = await getCategories();

    categories.forEach(async (element, index) => {
        //Removing all the categories that only have less than 4 clues
        if (element.clues_count < 5) {
            return categories.splice(index, 1);    
        }
    });

    //Cutting down the array to the first 6 categories;
    let formattedCat = categories.splice(0,6);
    console.log(formattedCat);
    return formattedCat;
}

export function random(number) {
    /*Creates random number */
    return Math.floor(Math.random() * number);
}