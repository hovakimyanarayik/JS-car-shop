
const apiKey = 'AIzaSyDnAYR2omdMpoeeuv2LuoFHoAreSoLA6kA';

export function renderUserPage(email){
    return fetchUserByEmail(email)
    .then(user => {
        if(user) {
            return `
                    <p class="action-handler">Username: ${user.username}</p>
                    <p class="action-handler">Email: ${user.email}</p>
                    <p class="sign-in-btn" data-action="user-ads">See your add's</p>
                    <button class="mui-btn bg-lightred" data-action="sign-out" data-localId="${user.localId}">Sign Out</button>
                `
        } else {
            return `
                    <p class="action-handler">Sign up for post an add</p>
                    <button class="mui-btn bg-green" data-action="sign-up">Sign Up</button>
                    <p class="sign-in-btn" data-action="sign-in">Already have an account?</p>
                `
        }
    })
    
}


export function renderNoLoginedUserPage() {
    return `
                    <p class="action-handler">Sign up for post an add</p>
                    <button class="mui-btn bg-green" data-action="sign-up">Sign Up</button>
                    <p class="sign-in-btn" data-action="sign-in">Already have an account?</p>
                `
}




export function SignUpWithEmailAndPassword(email, password) {
    const user = {
        email,
        password,
        returnSecureToken: true
    }
    return  fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
}


export function signInWithEmailAndPassword(email, password) {
    const loginForm = {
        email,
        password,
        returnSecureToken: true
    }

    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginForm)
        })
        .then(response => response.json())
}


export function createUserPage(username, email, localId) {
    const user = {
        username,
        email,
        localId
    }
    const token = localStorage.getItem('token');

    return fetch(`https://carhouse-yerevan-default-rtdb.firebaseio.com/users.json?auth=${token}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
}


export function fetchUserByEmail(email) {
    return fetch(`https://carhouse-yerevan-default-rtdb.firebaseio.com/users.json`)
    .then(response => response.json())
    .then(users => {
        return Object.values(users).find(user => user.email == email);
    })
}

