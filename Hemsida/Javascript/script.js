async function news(searchQuery, category) {
    let apiKey = "25061337eed148e7bd9aed9c34ec64a1"
    let categoryString = ""
    if (category) {
        categoryString = " AND " + category
    }
    var url = `https://newsapi.org/v2/everything?q=${searchQuery}${categoryString}&apiKey=${apiKey}`;
    let response = await fetch(url)
    let json = await response.json()
    return json
}

function displayNews(data, category) {
    console.log(data);
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    let articles = data.articles;

    articles.forEach((article) => {
        // Check if author is null or img src is invalid
        if (article.author !== null && article.urlToImage !== null && article.urlToImage !== "") {
            let node = document.createElement("div");
            node.innerHTML = `
            <p>Author: ${article.author}</p>
            <p>Description: ${article.description}</p>
            <p>Published: ${article.publishedAt}</p>`;
            resultDiv.appendChild(node);
            let img = document.createElement("img");
            img.src = `${article.urlToImage}`;
            resultDiv.appendChild(img);
        }
    });
}


async function getAndDisplay() {
    const searchQuery = document.getElementById("textbar").value;
    const data = await news(searchQuery);
    displayNews(data);
}


let menu = document.getElementById("menu")
let menu_icon = document.getElementById("menu-icon")
menu_icon.addEventListener("click", ()=>{
    if (menu.style.display == "block") {
        menu.style.display = "none"
    }else{
        menu.style.display = "block"
    }
})


document.getElementById("textbar").addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        getAndDisplay();
    }
});


document.getElementById("Home").addEventListener("click", ()=>{
    window.location.href="index.html"
})


document.getElementById("Politics").addEventListener("click", async ()=>{
    const searchQuery = document.getElementById("textbar").value;

    if (searchQuery === "") {
        const data = await news("politics");
        displayNews(data);
    } 
    else {
        const data = await news(searchQuery, "politics");
        displayNews(data);

    }
})

document.getElementById("Sports").addEventListener("click", async ()=>{
    const searchQuery = document.getElementById("textbar").value;

    if (searchQuery === "") {
        const data = await news("Sports");
        displayNews(data);
    } 
    else {
        const data = await news(searchQuery, "Sports");
        displayNews(data);

    }
})

document.getElementById("Health").addEventListener("click", async ()=>{
    const searchQuery = document.getElementById("textbar").value;

    if (searchQuery === "") {
        const data = await news("Health");
        displayNews(data);
    } 
    else {
        const data = await news(searchQuery, "Health");
        displayNews(data);

    }
})

