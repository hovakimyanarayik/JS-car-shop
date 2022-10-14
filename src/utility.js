export function createModal(title, content) {
    const modalEL = document.createElement('div');
    modalEL.classList.add('modal');
    modalEL.innerHTML = `<h1>${title}</h1>`;
    modalEL.innerHTML += content;
    mui.overlay('on', modalEL)
}


export function getRegistrationForm() {
    return `
        <form class="mui-form" id="signUpForm">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="text" id="username">
                <label for="username">Username</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email">
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password">
                <label for="passsword">Password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--raised bg-green" disabled>Create accout</button>
        </form>
    `
}



export function checkButtonAble(arr) {
    return arr.every(item => !!item)
}