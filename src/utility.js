export function createModal(title, content, close) {
    const modalEL = document.createElement('div');
    modalEL.classList.add('modal');
    modalEL.innerHTML = `<h1>${title}</h1>`;
    modalEL.innerHTML += content;
    mui.overlay('on', modalEL)
    document.body.className = '';
    if(close) {
        const closeBtn = document.createElement('button');
        const closeDiv = document.createElement('div');
        closeDiv.classList.add('closeDiv')
        closeDiv.appendChild(closeBtn);
        closeBtn.classList.add('closeBtn');
        closeBtn.textContent = 'Close'
        modalEL.appendChild(closeDiv);
        closeBtn.addEventListener('click', () => {
            mui.overlay('off', modalEL)
        })
    }
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
                <input type="text" name="carModel" class="carModel" required maxlength="20">
            </div>
            <div class="postSection">
                <div>
                    <label for="carYear"> Year</label>
                    <input type="number" name="carYear" class="carYear" required maxlength="4" minlength="4" min="1990">
                </div>
                <div>
                    <label for="carMilage">Milage</label>
                    <input type="number" name="carMilage" class="carMilage" required maxlength="10">
                </div>
            </div>
            <div class="postSection"> 
                <div>
                    <label for="imgUrl"><i class="fas fa-camera"></i> Image URL</label>
                    <input type="text" name="imgUrl" class="imgUrl">
                </div>
            </div>
            <div class="postSection">
                <div>
                    <label for="phone"> <i class="fas fa-phone"></i> Phone</label>
                    <input type="number" name="phone" class="phone" required minlength="6">
                </div>
                <div>
                    <label for="carCity">City</label>
                    <input type="text" name="carCity" class="carCity" required>
                </div>
            </div>
            <div>
                <label for="carPrice"> <i class="fas fa-dollar-sign"></i> Price</label>
                <input type="number" name="carPrice" class="carPrice">
            </div>
            <div>
                <label for="carDescription"> Description</label>
                <textarea id="carDescription" name="carDescription" class="carDescription" rows="3"></textarea>
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



export function errorMessage(message) {
    return `<h1 class="error">${message}</h1>`
}


export function sliderOn() {
    const slider = document.getElementById('slider');
    const sliderContain = document.getElementById('slider-contain');
    let id = 1;
    const resizeObserver = new ResizeObserver((entries) => {
        const width = entries[0].contentRect.width;
        slider.style.width = width * 3;
        
        [...slider.children].forEach(item => {
            item.style.width = sliderContain.offsetWidth;
        })
        slider.style.marginLeft = -((id - 1) * slider.offsetWidth / 3) + 'px';
    })

    resizeObserver.observe(sliderContain)
    
    setInterval(() => {
        console.log(slider.offsetWidth);
        if(id == 3 ) {
            id = 0
        }
        slider.style.marginLeft = -(id * slider.offsetWidth / 3) + 'px';
        id++;
    }, 8000)
}