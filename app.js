// Replace with your own News API key
const apiKey = '9988ad3ffb2f4c9693a6abba980b09a2';
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

// Fetch news articles from News API
async function fetchNews(query = '') {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
}

// Display news articles on the webpage
function displayNews(articles) {
    newsContainer.innerHTML = '';  // Clear previous news
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news found.</p>';
        return;
    }
    
    articles.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.classList.add('news-article');

        const newsImage = article.urlToImage
            ? `<div class="news-image"><img src="${article.urlToImage}" alt="News image"></div>`
            : '';

        newsArticle.innerHTML = `
            ${newsImage}
            <div class="news-content">
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `;
        newsContainer.appendChild(newsArticle);
    });
}

// Add event listener to the search button
searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    fetchNews(query);
});

// Fetch default news on page load
fetchNews('latest');
