var articles = [];
let currentArticleIndex = 0;
const articleperPage = 5;

async function fetchNews(){
    const API_ENDPOINT = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY}`;
    try{
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        articles = data.articles;
        return articles;
    }catch(e){
        console.error(e);
        return [];
    }
}

function updateNewsDisplay (news_articles){
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';

    const currentArticle = news_articles.slice(currentArticleIndex, currentArticleIndex + articleperPage );

    currentArticle.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("articles");

        const titleElement = document.createElement('h2');
        titleElement.textContent = article.title;

        const imageElement = document.createElement("img");
        imageElement.src = article.urlToImage;
        imageElement.alt = article.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = article.description;

        const linkElement = document.createElement("a");
        linkElement.href = article.url;
        linkElement.textContent = 'Learn More';
        linkElement.classList.add('read-more');
        linkElement.target = '_blank';

        articleElement.appendChild(titleElement);
        articleElement.appendChild(imageElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(linkElement);

        mainElement.appendChild(articleElement);
    });
    updatePagination(articles.length);
}

function updatePagination (totalArticles){
    const totalPages = totalArticles / articleperPage;
    const paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = '';

    for (let i = 1; i < totalPages; i++){
        const pageButton = document.createElement("button");
        pageButton.textContent = i;

        pageButton.addEventListener("click", () =>{
            currentArticleIndex = (i-1) * articleperPage;
            updateNewsDisplay(articles);
        })
        paginationElement.appendChild(pageButton);
    }

    const allButtons = document.querySelectorAll(".pagination button");
    allButtons.forEach(button => button.classList.remove("avtive"));
    allButtons[currentArticleIndex/articleperPage].classList.add("active");

    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    nextButton.addEventListener("click", () =>{
        if (currentArticleIndex + articleperPage < articles.length) {
            currentArticleIndex += articleperPage;
            updateNewsDisplay(articles);
        }   
    })
    prevButton.addEventListener("click", () =>{
        if (currentArticleIndex + articleperPage > articles.length){
            currentArticleIndex -= articleperPage;
            updateNewsDisplay(articles);
        }
        
    })

}

async function loadNews(){
    const articleData = await fetchNews();

    updateNewsDisplay(articleData);
}

document.addEventListener("DOMContentLoaded", loadNews);