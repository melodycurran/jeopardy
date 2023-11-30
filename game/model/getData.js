

export async function getData (url) {
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