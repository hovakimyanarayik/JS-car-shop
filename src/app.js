import './sidebar';
import './style.css';
import './mui.min.js';
import './mui.min.css';

import Posts from './posts';
import {renderUserPage, SignUpWithEmailAndPassword, signInWithEmailAndPassword, createUserPage, renderNoLoginedUserPage} from './auth';
import {
    createModal, getRegistrationForm, checkButtonAble, 
    createFailedMessageFor3Second , 
    tokenToLocalStorage, createSuccessfulMessage , getSignInForm,
    scrollToY, localIdToLocalStorage, getLocalIdFromLocalStorage,
    clearLocalStorage , getPostAddForm, errorMessage, sliderOn
} from './utility'

const sidebar = document.getElementById('sidedrawer'),
    accountinfo = sidebar.querySelector('#sign-div'),
    searchForm = document.getElementById('search-form'),
    resultHeading = document.getElementById('result-heading'),
    postsContain = document.getElementById('posts-contain'),
    headerLogo = document.getElementById('header-logo');


// render all posts to post container
async function showPosts(){
    postsContain.innerHTML = await Posts.renderAllPosts();
}



// listener to sidebar
sidebar.addEventListener('click', (e) => {
    if(!e.target.dataset.action) return;
    
    const actionType = e.target.dataset.action;
    // SIGN UP PROCESS
    if(actionType === 'sign-up') {
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
                        return 'rejected';
                    }
                    createFailedMessageFor3Second(button, 'Something gone wrong... Try again');
                    passwordInp.value = '';
                    return 'rejected';
                }
                tokenToLocalStorage(response.idToken);
                localIdToLocalStorage(response.localId);
                createModal('Sign Up', createSuccessfulMessage('Account Created Successful'), 'close')
            })
            .then((response) => {
                if(response == 'rejected') return;
                createUserPage(usernameInp.value, emailInp.value, localStorage.getItem('localId'))
                .then(() => {                    
                    return renderUserPage(emailInp.value)
                })
                .then(response => {
                    accountinfo.innerHTML = response;
                })
                
            })
        })
    }

    // SIGN IN PROCESS
    if(actionType === 'sign-in') {

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
                if(response.error) {
                    if(response.error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
                        createFailedMessageFor3Second(button, 'Too many attempts... Try later');
                        passwordInp.value = '';
                        return 'rejected';
                    }
                    createFailedMessageFor3Second(button, 'Wrong email or password. Try again...');
                    passwordInp.value = '';
                    return 'rejected';
                }
                tokenToLocalStorage(response.idToken);
                localIdToLocalStorage(response.localId);
                createModal('Sign In', createSuccessfulMessage('You have successfully logged in'), 'close')
            })
            .then((response) => {
                if(response == 'rejected') return 'rejected';
                
                return renderUserPage(emailInp.value);
            })
            .then(response => {
                if(response == 'rejected') {
                    accountinfo.innerHTML = renderNoLoginedUserPage();
                    return;
                }
                accountinfo.innerHTML = response;
            })
        })
    }


    // SIGN OUT
    if(actionType == 'sign-out') {
        clearLocalStorage();
        accountinfo.innerHTML = renderNoLoginedUserPage()
    }


    // POST ADD
    if(actionType == 'post-add') {
        if(!getLocalIdFromLocalStorage()) {
            createFailedMessageFor3Second(e.target, 'Please sign in to post an add');
            accountinfo.innerHTML = renderNoLoginedUserPage();
            return;
        }
        const localId = getLocalIdFromLocalStorage();
        createModal('Ad a car for sale', getPostAddForm());

        const postForm = document.getElementById('postAddForm');
            
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();

            Posts.createPost(
                postForm.carModel.value, postForm.carYear.value, postForm.carMilage.value, 
                postForm.imgUrl.value, postForm.phone.value, 
                postForm.carCity.value, postForm.carPrice.value, postForm.carDescription.value
            )
            .then(response => {
                if(response.error) {
                    createModal('Failed', errorMessage('You don"t have a token... Please try agein'), 'close')
                    accountinfo.innerHTML = renderNoLoginedUserPage();
                    return;
                }
                createModal('Ad a car for sale', createSuccessfulMessage('Your ad has been successfully posted!'), 'close')
                showPosts();
            })
        })
        
        
    }


    // See user adds
    if(actionType == 'user-ads') {
        Posts.getUserPosts()
        .then(response => {
            if(!response) {
                createModal("Notification", createSuccessfulMessage("You don't have an ad yet"), 'close')
                return;
            }
            if(response == 'rejected') {
                createModal('Error', errorMessage('You are sign outed'), 'close');
                accountinfo.innerHTML = renderNoLoginedUserPage();
                return;
            }
            resultHeading.textContent = "Your ads"
            postsContain.innerHTML = response;
            scrollToY(resultHeading.offsetTop - 100)
            postsContain.addEventListener('click', (e) => {
                if(!e.target.dataset.action) return;
                const removePostId = e.target.dataset.id;
                Posts.removePostById(removePostId)
                .then(response => {
                    if( response == 'rejected') {
                        createModal('Error', errorMessage('Please try later...'), 'close')
                    }
                    createModal('Message', createSuccessfulMessage('The statement was successfully deleted'), 'close');
                    showPosts();
                    resultHeading.textContent = '';
                })
            })
        })
        
    }

})


// search by model
async function searchAndRenderByModel(e) {
    e.preventDefault();
    
    const   searchInput = searchForm.querySelector('#search-input');
    const model = searchInput.value;
    if(!model) return;
    scrollToY(searchForm.offsetTop - 100);
    postsContain.innerHTML = await Posts.filterAndRenderByModel(model);
    resultHeading.textContent = postsContain.innerHTML ? `Search results for: ${model}` : `No results for: ${model}`;

    searchInput.value = '';
}

searchForm.addEventListener('submit', searchAndRenderByModel)

// fixed header logo listener onclick scroll to top and render home page
headerLogo.addEventListener('click', () => {
    resultHeading.innerHTML = '';
    showPosts()
    scrollToY(0)
})


// on DOMContentLoaded render home page
window.addEventListener('DOMContentLoaded', () => {
    resultHeading.innerHTML = '';
    showPosts();
    accountinfo.innerHTML = renderNoLoginedUserPage();
    clearLocalStorage()
    sliderOn();
})

