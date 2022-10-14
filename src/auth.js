import { createModal, getRegistrationForm, getSignInForm, checkButtonAble } from './utility';

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


export function signUpProcess() {
    createModal('Sign Up', getRegistrationForm());
        const signUpForm = document.getElementById('signUpForm');
        const usernameInp = signUpForm.querySelector('#username'),
            emailInp = signUpForm.querySelector('#email'),
            passwordInp = signUpForm.querySelector('#password'),
            button = signUpForm.querySelector('button');

            function buttonState() {
                button.disabled = !checkButtonAble([usernameInp.value, emailInp.value, passwordInp.value]);
            }

            usernameInp.addEventListener('input', buttonState)
            emailInp.addEventListener('input', buttonState)
            passwordInp.addEventListener('input', buttonState)

        signUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const user = {
                email: emailInp.value,
                password: passwordInp.value,
                returnSecureToken: true
            }
                fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                .then(response => response.json())
                .then(response => {
                    localStorage.setItem("localId", response.localId);
                    signUpForm.innerHTML = createSuccessfulSignUpMessage()
                    
                    // account creatic heto cankalia bacvi sign in-i modalken
                
            })

    })
}


export function signInProcess() {
    createModal('Sign In', getSignInForm());
    const signInForm = document.getElementById('signInForm');
        const emailInp = signInForm.querySelector('#user-email'),
            passwordInp = signInForm.querySelector('#user-password'),
            button = signInForm.querySelector('button');

    function buttonState() {
        button.disabled = !checkButtonAble([emailInp.value, passwordInp.value]);
    }

    emailInp.addEventListener('input', buttonState);
    passwordInp.addEventListener('input', buttonState);

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // fetch to sign in 
    })


}


function createSuccessfulSignUpMessage() {
    return `
        <h1 class="success">Account Created Successful</h1>
    `
}



// .then(response => {
            //     fetch(`https://carhouse-yerevan-default-rtdb.firebaseio.com/users.json/auth=${response.token}`, {
            //         method: "POST",
            //         headers: {
            //             "Content-type": "application/json",
            //         },
            //         body: JSON.stringify({
            //             username: usernameInp.value,
            //             email: response.email,
            //             localId: response.localId
            //         })
            //     })
            //     .then(response => response.json())
            //     .then(response => {
            //         console.log('>>>>>>>>>>>', response);
            //     })
            // })


            // const errormessege = '<p class="error">Something went wrong... Please try agein</p>'
            //         signUpForm.appendChild(errormessege)
                    // console.log(123);