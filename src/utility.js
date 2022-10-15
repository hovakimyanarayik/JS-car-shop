export function createModal(title, content) {
    const modalEL = document.createElement('div');
    modalEL.classList.add('modal');
    modalEL.innerHTML = `<h1>${title}</h1>`;
    modalEL.innerHTML += content;
    mui.overlay('on', modalEL)
    document.body.className = '';
}


export function getRegistrationForm() {
    return `
        <form class="mui-form" id="signUpForm">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="text" id="username" minlength="3">
                <label for="username">Username</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email">
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" minlength="6">
                <label for="passsword">Password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--raised bg-green" disabled>Create accout</button>
        </form>
    `
}


export function getSignInForm() {
    return `
        <form class="mui-form" id="signInForm">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="user-email">
                <label for="user-email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="user-password" minlength="6">
                <label for="user-passsword">Password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--raised bg-green" disabled>Sign In</button>
        </form>
    `
}


export function getPostAddForm() {
    return `
        <form id="postAddForm" class="post-add-form">
            <div>
                <label for="carModel"> <i class="fas fa-car"></i> Model</label>
                <input type="text" id="carModel" class="carModel" required autofocus maxlength="20">
            </div>
            <div class="postSection">
                <div>
                    <label for="carYear"> Year</label>
                    <input type="number" id="carYear" class="carYear" required maxlength="4" minlength="4" min="1990">
                </div>
                <div>
                    <label for="carMilage">Milage</label>
                    <input type="number" id="carMilage" class="carMilage" required maxlength="10">
                </div>
            </div>
            <div class="postSection"> 
                <div>
                    <label for="imgUrl"><i class="fas fa-camera"></i> Image URL</label>
                    <input type="text" id="imgUrl" class="imgUrl">
                </div>
            </div>
            <div class="postSection">
                <div>
                    <label for="phone"> <i class="fas fa-phone"></i> Phone</label>
                    <input type="number" id="phone" class="phone" required>
                </div>
                <div>
                    <label for="carCity">City</label>
                    <input type="text" id="carCity" class="carCity" required>
                </div>
            </div>
            <div>
                <label for="carPrice"> <i class="fas fa-dollar-sign"></i> Price</label>
                <input type="number" id="carPrice" class="carPrice">
            </div>
            <button type="submit">Post</button>
        </form>
    `
}



export function checkButtonAble(arr) {
    return arr.every(item => !!item)
}


export function tokenToLocalStorage(token) {
    localStorage.setItem('token', token)
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem('token')
}



export function createSuccessfulMessage(messege) {
    return `
        <h1 class="success">${messege}</h1>
    `
}

export function createFailedMessageFor3Second(el, message) {
    const errorMessage = `<p class="error">${message}</p>`;
    el.disabled = true
    el.insertAdjacentHTML('beforeBegin', errorMessage)
    setTimeout(() => {
        el.disabled = false;
        el.previousSibling.remove()
    }, 2500)
}


export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

export function localIdToLocalStorage(localId) {
    localStorage.setItem('localId', localId);
}


export function getLocalIdFromLocalStorage() {
    return localStorage.getItem('localId')
}


export function clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
}

