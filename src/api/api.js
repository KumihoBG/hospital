export async function getCovidStats() {
    const response = await fetch(`http://localhost:8080/api/articles`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    });
    const news = await response.json();
    console.log(news);
    return news;
}