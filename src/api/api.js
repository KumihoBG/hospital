export async function getCovidStats() {
    const response = await fetch(`http://localhost:8080/api/articles`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
    });
    const news = await response.json();
    return news;
}


// export const isAuthenticated = () => {
//     return Boolean(getUser())
// };