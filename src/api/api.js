export async function getCovidStats() {
    const response = await fetch(`https://covid19-news-updates.p.rapidapi.com/news`, {
        headers: {
            'Content-Type': 'application/json',
            "x-rapidapi-host": "covid19-news-updates.p.rapidapi.com",
            "x-rapidapi-key": "cca90ad6bemshcfcec781d89f62cp129424jsnebee89952387"
        },
        method: 'GET',
    });
    const news = await response.json();
    console.log(news);
    return news;
}