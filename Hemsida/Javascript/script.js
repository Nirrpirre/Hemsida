async function news(searchQuery, category, source) {
    let apiKey = "25061337eed148e7bd9aed9c34ec64a1"
    let categoryString = ""
    let sourceString = ""
    if (category) {
        categoryString = "&category=" + category;
    }
    if (source) {
        sourceString = "&sources=" + source;
    }
    var url = `https://newsapi.org/v2/everything?q=${searchQuery}${categoryString}${sourceString}&apiKey=${apiKey}`;
    let response = await fetch(url);
    let json = await response.json();
    return json;
}

function displayNews(data) {
    console.log(data);
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    let articles = data.articles;

    articles.forEach((article) => {
        if (article.author !== null && article.urlToImage !== null && article.urlToImage !== "") {
            let articleDiv = document.createElement("article");
            articleDiv.innerHTML = `
                <h2>${article.title}</h2>
                <p>Author: ${article.author}</p>
                <p>Description: ${article.description}</p>
                <p>Published: ${article.publishedAt}</p>
                <p>Source: ${article.source.name}</p>`;
            let img = document.createElement("img");
            img.src = `${article.urlToImage}`;
            img.alt = "article poster"
            articleDiv.appendChild(img);
            resultDiv.appendChild(articleDiv);
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



document.createElement("div").addEventListener("click", async()=> {
    const searchQuery = document.getElementById("textbar").value;

    if (searchQuery === "") {
        const data = await news(`${source.id}`);
        displayNews(data);
    }
    else {
        const data = await news(searchQuery, `${source.id}`);
        displayNews(data);
    }
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

