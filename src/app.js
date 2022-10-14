import './sidebar';
import './style.css';

import Posts from './posts';


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

    // rendering
    postsContain.innerHTML = await Posts.filterAndRenderByModel(model);

    searchInput.value = '';
}



searchForm.addEventListener('submit', searchAndRenderByModel)


headerLogo.addEventListener('click', () => {
    showPosts()
})

window.addEventListener('DOMContentLoaded', () => {
    showPosts()
    resultHeading.innerHTML = '';
})

