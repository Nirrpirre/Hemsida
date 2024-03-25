async function news(newsString) {
    let apiKey = "25061337eed148e7bd9aed9c34ec64a1"
    var url = `https://newsapi.org/v2/everything?q=technology&sources=${newsString}&apiKey=${apiKey}`;
    let response = await fetch(url)
    let json = await response.json()
    return json
}


function displayNews(data) {
    console.log(data);
    let resultDiv = document.getElementById("result");

    let articles = data.articles;

    articles.forEach((article) => {
        let node = document.createElement("div");
        node.innerHTML = `
        <p>Author:      ${article.author}</p>
        <p>Description: ${article.description}</p>
        <p>Published:   ${article.publishedAt}</p>`;
        resultDiv.appendChild(node);
    })
}

async function getAndDisplay() {
    const data = await news("CNN");
    displayNews(data);
}

getAndDisplay();