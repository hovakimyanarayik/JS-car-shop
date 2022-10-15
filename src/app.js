import './sidebar';
import './style.css';

import Posts from './posts';
import {renderUserPage, SignUpWithEmailAndPassword, signInWithEmailAndPassword, createUserPage} from './auth';
import {
    createModal, getRegistrationForm, checkButtonAble, 
    getTokenFromLocalStorage, createFailedMessageFor3Second , 
    tokenToLocalStorage, createSuccessfulMessage , getSignInForm,
    scrollToTop
} from './utility'

const sidebar = document.getElementById('sidedrawer'),
    accountinfo = sidebar.querySelector('#sign-div'),
    searchForm = document.getElementById('search-form'),
    resultHeading = document.getElementById('result-heading'),
    postsContain = document.getElementById('posts-contain'),
    headerLogo = document.getElementById('header-logo');



async function showPosts(){
    postsContain.innerHTML = await Posts.renderAllPosts();
}

async function searchAndRenderByModel(e) {
    e.preventDefault();
    const   searchInput = searchForm.querySelector('#search-input');
    const model = searchInput.value;
    if(!model) return;
    postsContain.innerHTML = await Posts.filterAndRenderByModel(model);
    resultHeading.textContent = postsContain.innerHTML ? `Search results for: ${model}` : `No results for: ${model}`;

    searchInput.value = '';
}





sidebar.addEventListener('click', (e) => {
    if(!e.target.dataset.action) return;
    
    // SIGN UP PROCESS
    if(e.target.dataset.action === 'sign-up') {
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

            SignUpWithEmailAndPassword(emailInp.value, passwordInp.value)
            .then(response => {
                if(response.error) {
                    if(response.error.message == 'EMAIL_EXISTS') {
                        createFailedMessageFor3Second(button, 'Email is already registered');
                        emailInp.value = '';
                        passwordInp.value = '';
                        return;
                    }
                    createFailedMessageFor3Second(button, 'Something gone wrong... Try again');
                    passwordInp.value = '';
                    return;
                }
                tokenToLocalStorage(response.idToken);
                signUpForm.innerHTML = createSuccessfulMessage('Account Created Successful')
            })
            .then(() => {
                createUserPage(usernameInp.value, emailInp.value);
                // accountinfo.innerHTML = renderUserPage(getTokenFromLocalStorage())
            })
        })
    }

    // SIGN IN PROCESS
    if(e.target.dataset.action === 'sign-in') {

        createModal('Sign In', getSignInForm());

        const signInForm = document.getElementById('signInForm'),
            emailInp = signInForm.querySelector('#user-email'),
            passwordInp = signInForm.querySelector('#user-password'),
            button = signInForm.querySelector('button');

        function buttonState() {
            button.disabled = !checkButtonAble([emailInp.value, passwordInp.value]);
        }

        emailInp.addEventListener('input', buttonState);
        passwordInp.addEventListener('input', buttonState);

        signInForm.addEventListener('submit', (e) => {
            e.preventDefault();

            signInWithEmailAndPassword(emailInp.value, passwordInp.value)
            .then(response => {
                console.log(response);
                if(response.error) {
                    if(response.error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
                        createFailedMessageFor3Second(button, 'Too many attempts... Try later');
                        passwordInp.value = '';
                        return
                    }
                    createFailedMessageFor3Second(button, 'Wrong email or password. Try again...');
                    passwordInp.value = '';
                    return;
                }
                tokenToLocalStorage(response.idToken);
                signInForm.innerHTML = createSuccessfulMessage('You have successfully logged in');
            })
            .then(() => {
                accountinfo.innerHTML = renderUserPage(getTokenFromLocalStorage())
            })
        })
    }
})

searchForm.addEventListener('submit', searchAndRenderByModel)


headerLogo.addEventListener('click', () => {
    resultHeading.innerHTML = '';
    showPosts()
    scrollToTop()
})

window.addEventListener('DOMContentLoaded', () => {
    resultHeading.innerHTML = '';
    showPosts();
    accountinfo.innerHTML = renderUserPage();
    localStorage.removeItem('token');
})

