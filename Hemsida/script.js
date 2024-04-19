async function news(searchQuery) {
    let apiKey = "25061337eed148e7bd9aed9c34ec64a1"
    var url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;
    let response = await fetch(url)
    let json = await response.json()
    return json
}

function displayNews(data) {
    console.log(data);
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    let articles = data.articles;

    articles.forEach((article) => {
        let node = document.createElement("div");
        node.innerHTML = `
        <p>Author:      ${article.author}</p>
        <p>description: ${article.description}</p>
        <p>Published:   ${article.publishedAt}</p>`;
        resultDiv.appendChild(node);
        let img = document.createElement("img")
        img.src = `${article.urlToImage}`
        resultDiv.appendChild(img)
    })
}

async function getAndDisplay() {
    const searchQuery = document.getElementById("textbar").value;
    const data = await news(searchQuery);
    displayNews(data);
}

document.getElementById("textbar").addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        getAndDisplay();
    }
});


document.getElementById("Home").addEventListener("click", ()=>{
    window.location.href="index.html"
})
