import './sidebar';
import './style.css';

import Posts from './posts';


const sidebar = document.getElementById('sidedrawer'),
    accountinfo = sidebar.querySelector('#sign-div'),
    searchForm = document.getElementById('search-form'),
    searchInput = document.getElementById('search-input'),
    resultHeading = document.getElementById('result-heading'),
    postsContain = document.getElementById('posts-contain');



async function showPosts(){
    postsContain.innerHTML = await Posts.renderAllPosts();
}

showPosts()
