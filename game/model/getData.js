const categoriesURL = import.meta.env.VITE_GAME_URL_CATEGORIES;
const cluesURL = import.meta.env.VITE_GAME_URL_CLUES;
const categoryURL = import.meta.env.VITE_GAME_URL_CATEGORY;

async function getData(url) {
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

export async function getCategories() {
    //Create a random number from 0 - 100
    let randomNum = Math.floor(Math.random() * 100);
    //call the API category. Get at least 10 so we can remove objects
    return (await getData(categoriesURL + '?count=100')).splice(randomNum,20);

}

export async function getClues(element) {
    return await getData(cluesURL + `?category=${element}`);
}