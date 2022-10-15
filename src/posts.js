export default class Posts{
    static getPosts() {
        return fetch('https://carhouse-yerevan-default-rtdb.firebaseio.com/posts.json')
            .then(response => response.json())
            .then(toPostsArray)
    }

    static async renderAllPosts() {
        const posts =  await Posts.getPosts();

        return postsToHTML(posts);
    }

    static async filterAndRenderByModel(model) {
        let posts =  await Posts.getPosts();
        posts = posts.filter(post => post.model.toLowerCase() == model.toLowerCase());
        return postsToHTML(posts)
    }
    
}

function toPostsArray(posts) {
    for(let post in posts) {
        posts[post].id = post;
    }

    return Object.values(posts);
}

function postsToHTML(posts) {
    return posts.map(post => `
            <div class="post">
                <img src="${post.img || 'https://prestigemotorsport.com.au/wp-content/uploads/car_no_image_small.jpg'}" alt="image">
                <div class="car-info">
                    <p class="model">${post.model}</p>
                    <div>
                        <p class="price">$ ${post.price}</p>
                        <p class="year">Year: ${post.year}</p>
                        <p class="milage">Milage: ${post.milage} Mile</p>
                        <p class="city">City: ${post.city}</p>
                        <button class="mui-btn bg-green"><i class="fas fa-phone"></i> ${post.tel}</button>
                        
                    </div>
                </div>
            </div>
        `)
}