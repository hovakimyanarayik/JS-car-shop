import './sidebar';
import './style.css';

import Posts from './posts';
import {renderUserPage, signUpProcess, signInProcess} from './auth';
// import { createModal, getRegistrationForm, checkButtonAble } from './utility';


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

    postsContain.innerHTML = await Posts.filterAndRenderByModel(model);
    resultHeading.textContent = postsContain.innerHTML ? `Search results for: ${model}` : `No results for: ${model}`;

    searchInput.value = '';
}





sidebar.addEventListener('click', (e) => {
    if(!e.target.dataset.action) return;
    
    if(e.target.dataset.action === 'sign-up') {
        signUpProcess();
    }
    if(e.target.dataset.action === 'sign-in') {
        signInProcess();
    }
})

searchForm.addEventListener('submit', searchAndRenderByModel)


headerLogo.addEventListener('click', () => {
    resultHeading.innerHTML = '';
    showPosts()
})

window.addEventListener('DOMContentLoaded', () => {
    resultHeading.innerHTML = '';
    showPosts();
    accountinfo.innerHTML = renderUserPage(localStorage.getItem('token'))
})

