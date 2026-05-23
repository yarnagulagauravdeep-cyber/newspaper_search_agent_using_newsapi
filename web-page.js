const searchinput= document.querySelector(".input-search-bar");
const button=document.querySelector(".search-button");
const main=document.querySelector("main");
async function fetchdata(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    }
    catch(error){
        console.error(error);
    }
}
button.addEventListener("click",async()=>{
    const query = searchinput.value;
    const URL = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=72593f081a8a40c6be84b4b52a90770c`;
    if (query!==""){
        try{
            const articles = await fetchdata(URL);
            main.innerHTML="";
            displayarticles(articles);
        }
        catch(error){
            console.log("there is an error while fetching the data",error);
        }
    }
    
});
function displayarticles(articles){
    articles.forEach((article) => {

        const card = document.createElement("div");
        card.classList.add("blog-card");

        card.innerHTML = `
        
            <div class="blog-img-box">
                <img 
                    src="${article.urlToImage}"
                    alt="news-image" 
                    class="blog-img"
                />
            </div>

            <div class="article-title">
                <h2>${article.title}</h2>
            </div>

            <div class="article-description">
                ${article.description || "No description available"}
            </div>

        `;

        main.appendChild(card);
        card.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        });
    });


}