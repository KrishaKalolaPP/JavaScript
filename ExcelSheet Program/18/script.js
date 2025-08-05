const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

let staticJSON = [
  { id: 1, title: "Krisha", body: "Loves coding" },
  { id: 2, title: "Krishna", body: "Enjoys UI design" }
];

function sendHttpRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let response;

        // Simulate error if wrong endpoint used
        if (!url.startsWith('/posts')) {
          throw new Error(" Invalid URL or route");
        }

        if (method === 'GET') {
          response = staticJSON;
        } else if (method === 'POST') {
          const newPost = { ...data };
          staticJSON.push(newPost);
          response = newPost;
        } else if (method === 'DELETE') {
          const exists = staticJSON.some(post => post.id === data.id);
          if (!exists) throw new Error("Post not found");
          staticJSON = staticJSON.filter(post => post.id !== data.id);
          response = { success: true };
        } else {
          throw new Error("Unsupported method");
        }

        resolve(response);
      } catch (err) {
        reject(err);
      }
    }, 200);
  });
}

async function fetchPosts() {
  try {
    const posts = await sendHttpRequest('GET', '/posts');

    if (posts.length === 0) {
      listElement.innerHTML = 'No data found';
    } else {
      listElement.innerHTML = '';
      for (const post of posts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title;
        postEl.querySelector('p').textContent = post.body;
        postEl.querySelector('li').id = post.id;
        postEl.querySelector('li').dataset.id = post.id;
        listElement.append(postEl);
      }
    }
  } catch (error) {
    alert("Fetch Failed: " + error.message);
  }
}

async function createPost(title, content) {
  const post = {
    id: staticJSON.length !== 0 ? staticJSON[staticJSON.length - 1].id + 1 : 0,
    title: title,
    body: content
  };

  try {
    await sendHttpRequest('POST', '/posts', post);
    fetchPosts();
  } catch (err) {
    alert("Post Failed: " + err.message);
  }
}

fetchButton.addEventListener('click', fetchPosts);

form.addEventListener('submit', event => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;
  createPost(enteredTitle, enteredContent);
  event.currentTarget.reset();
});

postList.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    const postId = +event.target.closest('li').dataset.id;

    sendHttpRequest('DELETE', `/posts/${postId}`, { id: postId })
      .then(() => fetchPosts())
      .catch(err => alert("Delete Failed: " + err.message));
  }
});

fetchPosts();
