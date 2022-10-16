export default class Posts{
    static getPosts() {
        return fetch('https://carhouse-yerevan-default-rtdb.firebaseio.com/posts.json')
            .then(response => response.json())
            .then(toPostsArray)
    }

    static async renderAllPosts() {
        const posts =  await Posts.getPosts();
        console.log("POSTS" , posts);
        return postsToHTML(posts);
    }

    static async filterAndRenderByModel(model) {
        let posts =  await Posts.getPosts();
        posts = posts.filter(post => post.model.toLowerCase().includes(model.toLowerCase()));
        return postsToHTML(posts)
    }

    static createPost(carModel, carYear, carMilage, imgUrl, phone, carCity, carPrice, carDescription) {
        const post = {
            model: carModel,
            img: imgUrl,
            price: carPrice,
            milage: carMilage,
            city: carCity,
            tel: phone,
            year: carYear,
            description: carDescription,
            owner: localStorage.getItem('localId'),
        }

        return  fetch(`https://carhouse-yerevan-default-rtdb.firebaseio.com/posts.json?auth=${localStorage.getItem('token')}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(response => response.json())
    }
    

    static getUserPosts() {
        if(!localStorage.getItem('localId')) return;

        const localId = localStorage.getItem('localId');

        return Posts.getPosts()
        .then(response => {
            let userPosts = response.filter(post => post.owner == localId);
            return postsToHTML(userPosts, 'user')
        })

    }
}

function toPostsArray(posts) {
    for(let post in posts) {
        posts[post].id = post;
    }

    return Object.values(posts).reverse();
}

function postsToHTML(posts, user) {
    return posts.map(post => `
            <div class="post">
                <img src="${post.img || 'https://prestigemotorsport.com.au/wp-content/uploads/car_no_image_small.jpg'}" alt="image">
                <div class="car-info">
                    <p class="model">${post.model}</p>
                    <div>
                        <p class="price">$ ${post.price || 'Contractual'}</p>
                        <p class="year">Year: ${post.year}</p>
                        <p class="milage">Milage: ${post.milage} Mile</p>
                        <p class="city">City: ${post.city}</p>
                        <p>Description: ${post.description ? post.description : ''}</p>
                        ${user ? '' : `<button class="mui-btn bg-green"><i class="fas fa-phone"></i> ${post.tel}</button>`}
                    </div>
                    ${user ? `<button class="remove-btn" data-action="remove-ad" data-id="${post.id}">Remove</button>`: ''}
                </div>
            </div>
        `).join('')
}