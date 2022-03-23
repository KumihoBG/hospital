const URL = 'http://localhost:5000';

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

export async function getAllPatients() {
    try {
        const response = await fetch(`${URL}/patients`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function register(user) {
    const patients = await getAllPatients();
    console.log(patients);
    console.log(patients.filter(users => users.email === user.email || users.username === user.username));

    if (!patients.filter(users => users.email === user.email || users.username === user.username)) {
        alert('Username/email already taken.');
        return;
    } else {
        try {
            const response = await fetch(`${URL}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(user)
            });
            const data = await response.json();
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('password', data.id);
            window.location.replace('/login');
            // notification('Success', `Please, log in to your account.`);
            return data;
        } catch (error) {
            // notification('Ops', `Something went wrong: + ${error}`);
            console.error(error);
        }
    }
}

// export async function login(username, password) {
//     try {
//         // let user = await Parse.User.logIn(username, password);
//         const email = sessionStorage.getItem('email');
//         // if (user.get('emailVerified')) {
//         //     const currentUser = Parse.User.current();
//         //     const sessionToken = currentUser.getSessionToken();
//         //     localStorage.setItem('username', username);
//         //     localStorage.setItem('authToken', sessionToken);
//         //     localStorage.setItem('userId', currentUser.id);
//         //     localStorage.setItem('email', email);
//         //     localStorage.setItem('password', password);
//         // }
//     } catch (error) {
//         // Parse.User.logOut();
//         console.log('Wrong username or password');
//         return null;
//     }
// }

// export async function logout() {
//     try {
//         Parse.User.logOut();
//         localStorage.removeItem('username');
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('email');
//         localStorage.removeItem('password');
//         localStorage.removeItem('name');
//     } catch (error) {
//         notification('Ops','Something went wrong. Try again, please!');
//         console.error(error);
//     }
// }

export const getUser = () => {
    let username = localStorage.getItem('username');
    return username;
};

// export const isAuthenticated = () => {
//     return Boolean(getUser())
// };

// export const onDelete = async () => {
//     const userId = localStorage.getItem('userId');
//     const User = new Parse.User();
//     const query = new Parse.Query(User);
//     try {
//         let user = await query.get(userId);
//         try {
//             let response = await user.destroy();
//             localStorage.removeItem('username');
//             localStorage.removeItem('authToken');
//             localStorage.removeItem('userId');
//             localStorage.removeItem('email');
//             localStorage.removeItem('password');
//             localStorage.removeItem('name');
//             console.log('Deleted user', response);
//         } catch (error) {
//             console.error('Error while deleting user', error);
//         }
//     } catch (error) {
//         console.error('Error while retrieving user', error);
//     }
// }

// export async function getUserImage(userId) {
//     const User = new Parse.User();
//     const query = new Parse.Query(User);
//     try {
//         let user = await query.get(userId);
//         const currentUserImage = await user.get('image');
//         if (currentUserImage === undefined || currentUserImage === null) {
//             currentUserImage.src = "../images/user.png";
//         } else if (currentUserImage._url) {
//             currentUserImage.src = currentUserImage.url();
//         }
//         currentUserImage.src = refreshImage('user-image', currentUserImage.url());

//         function refreshImage(imgElement, imgURL) {
//             let timestamp = new Date().getTime();
//             let queryString = "?t=" + timestamp;
//             currentUserImage.src = imgURL + queryString;
//             return currentUserImage.src;
//         }
//         return currentUserImage.src;
//     } catch (error) {
//         console.error('Error while retrieving image', error);
//     }
// }