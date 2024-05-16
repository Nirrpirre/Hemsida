async function news(searchQuery, category, source) {
    let apiKey = "25061337eed148e7bd9aed9c34ec64a1";
    let url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;
    
    if (category) {
        url += `&category=${category}`;
    }
    if (source) {
        url += `&sources=${source}`;
    }
    
    try {
        let response = await fetch(url);
        let json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching news:", error);
        return { articles: [] };
    }
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
                <p>Source: <a class="source-link" href="index.html?source=${article.source.id}">${article.source.name}</a></p>`;
            let img = document.createElement("img");
            img.src = `${article.urlToImage}`;
            img.alt = "article poster";
            articleDiv.appendChild(img);
            resultDiv.appendChild(articleDiv);
        }
    });
}

async function getAndDisplay() {
    const searchQuery = document.getElementById("textbar").value;
    const searchParams = new URLSearchParams(window.location.search);
    const source = searchParams.get("source");
    const data = await news(searchQuery, null, source);
    displayNews(data);
}

let menu = document.getElementById("menu");
let menu_icon = document.getElementById("menu-icon");
menu_icon.addEventListener("click", () => {
    if (menu.style.display == "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});

function toggleSearchBar() {
    const searchBar = document.getElementById("textbar");
    const searchIcon = document.getElementById("search-icon");

    if (searchBar.style.display === "block") {
        searchBar.style.display = "none";
    } else {
        searchBar.style.display = "block";
        searchBar.focus();
        searchIcon.style.display = "none";
    }
}

document.getElementById("search-icon").addEventListener("click", toggleSearchBar);



document.getElementById("textbar").addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        getAndDisplay();
    }
});

let searchParams = new URLSearchParams(window.location.search);
let source = searchParams.get("source");
if (source) {
    getAndDisplay();
}

document.getElementById("Politics").addEventListener("click", async () => {
    const searchQuery = document.getElementById("textbar").value;

    if (searchQuery === "") {
        const data = await news("politics");
        displayNews(data);
    } else {
        const data = await news(searchQuery, "politics");
        displayNews(data);
    }
});

document.getElementById("Sports").addEventListener("click", async () => {
    const searchQuery = document.getElementById("textbar").value;

    if (searchQuery === "") {
        const data = await news("Sports");
        displayNews(data);
    } else {
        const data = await news(searchQuery, "Sports");
        displayNews(data);
    }
});

document.getElementById("Health").addEventListener("click", async () => {
    const searchQuery = document.getElementById("textbar").value;

    if (searchQuery === "") {
        const data = await news("Health");
        displayNews(data);
    } else {
        const data = await news(searchQuery, "Health");
        displayNews(data);
    }
});
