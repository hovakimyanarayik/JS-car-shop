
const apiKey = 'AIzaSyDnAYR2omdMpoeeuv2LuoFHoAreSoLA6kA';

export function renderUserPage(token){
    if(token) {
        return `
                <p class="action-handler">Username: Username</p>
                <p class="sign-in-btn" data-action="user-ads">See your add's</p>
                <button class="mui-btn bg-lightred" data-action="sign-out">Sign Out</button>
            `
    } else {
        return `
                <p class="action-handler">Sign up for post an add</p>
                <button class="mui-btn bg-green" data-action="sign-up">Sign Up</button>
                <p class="sign-in-btn" data-action="sign-in">Already have an account?</p>
            `
    }
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


export function createUserPage(username, email) {
    console.log(username, email);
}


