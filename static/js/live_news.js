document.addEventListener("DOMContentLoaded", function () {
    fetchNews();
});

// Simulated function to fetch live news
function fetchNews() {
    let newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "<p>🔴 Earthquake in Northern India - 6.2 Magnitude</p><p>⚠️ Heavy flooding reported in Assam</p>";
}
