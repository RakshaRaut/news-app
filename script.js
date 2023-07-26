var articles=[];
let currentArticlesIndex = 0;
const articlesPerPage=10;

async function fetchNews() {
    const API_ENDPOINT = `https://newsapi.org/v2/everything?q=tesla&from=2023-06-26&sortBy=publishedAt&apiKey=${Api_Key}`;
    try{
const response = await fetch(API_ENDPOINT);
const data= await response.json();
articles=  data.articles;
return articles;
    }
    catch(e){
console.error(e);
return[];
    }
}
function updateNewsDisplay(news_articles){
    const mainElement= document.querySelector('main');
    mainElement.innerHTML = '';

    const currentArticles=news_articles.slice(currentArticlesIndex,currentArticlesIndex+articlesPerPage);

    currentArticles.forEach(article =>{
        const articleElement=document.createElement("div");

        articleElement.classList.add("article")
        const titleElement =document.createElement('h2');
        titleElement.textContent=article.title;

        const imageElement = document.createElement("img");
imageElement.src= article.urlToImage;
imageElement.alt= article.title;




        const descriptionElement = document.createElement("p");
        descriptionElement.textContent=article.descriptionElement;
        
        
        const linkedElement = document.createElement("a");
        linkedElement.href = article.url;
        linkedElement.textContent="Learm-More";
        linkedElement.classList.add("read-more");
        
        articleElement.appendChild(titleElement);
        articleElement.appendChild(imageElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(linkedElement);


        mainElement.appendChild(articleElement);
    });
    
    updatePagination(articles.length);

}
function updatePagination(totalArticles){
    const totalArticles= Math.ceil(totalArticles/articlesPerPage);

    const PaginationElement = document.querySelector(".pagination");
    PaginationElement.innerHTML='';

    for(let i=1;i<totalpages;i++){
        const pageButton=document.createElement("button");
        pageButton.textContent=i;

        pageButton.addEventListener("click",()=>{
            currentArticlesIndex=(i-1)*articlesPerPage;

         updateNewsDisplay(articles);

        })
        PaginationElement.appendChild(pageButton);

//         const maxVisibleButtons=Math.main(totalpages,5);
// PaginationElement.style.gridTemplateColumns = `repeat(${maxVisibleButtons},1fr)`;
    
}
const allButtons=document.querySelectorAll(".pagination buttom");
allButtons.forEach(button =>button.classList.remove("active"));
allButtons[currentArticlesIndex/articlesPerPage].classList.add("active");

const allButtons=document.querySelector(".prev-button");
const nextButton=document.querySelector(".next-butoon");
prevButton.addEventListener("click",()=>{
    if (currentArticlesIndex >0)currentArticlesIndex=currentArticlesIndex-1;
})
nextButton.addEventListener("click",()=>{
    if(currentArticlesIndex + articlesPerPage);
})
}


async function  loadnews(){
    const articlesData=await fetchNews();
    updateNewsDisplay(articlesData);

}
document.addEventListener("DOMContentLoaded",loadnews);
