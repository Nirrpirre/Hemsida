async function news(searchQuery, category) {
    let apiKey = "25061337eed148e7bd9aed9c34ec64a1";
    var url = `https://newsapi.org/v2/everything?q=${searchQuery}&category=${category}&apiKey=${apiKey}`;
    
    try {
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or handle the error appropriately
    }
}




async function getAndDisplay(category) {
    console.log("Category:", category); // Debug statement
    const searchQuery = document.getElementById("textbar").value;
    console.log("Search Query:", searchQuery); // Debug statement
    const data = await news(searchQuery, category);
    console.log("API Response:", data); // Debug statement
    displayNews(data);
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("header").addEventListener("click", function(event) {
        console.log("Clicked element:", event.target); // Debug statement
        if (event.target.classList.contains("category")) {
            const category = event.target.dataset.category;
            console.log("Selected category:", category); // Debug statement
            getAndDisplay(category);
        }
    });
});


function displayNews(data) {
    console.log(data);

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    if (data.articles && data.articles.length > 0) { // Check if data.articles exists and is not empty
        data.articles.forEach((article) => {
            let node = document.createElement("div");
            node.innerHTML = `
            <p>Author:      ${article.author}</p>
            <p>Description: ${article.description}</p>
            <p>Published:   ${article.publishedAt}</p>`;
            resultDiv.appendChild(node);
            let img = document.createElement("img")
            img.src = `${article.urlToImage}`
            resultDiv.appendChild(img);
        });
    } else {
        resultDiv.innerHTML = 'No articles found.';
    }
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
