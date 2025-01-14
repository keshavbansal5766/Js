function makeHttpRequest(method, url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";

  const promise = new Promise((resolve, reject) => {
    xhr.addEventListener("load", () => {
      resolve(xhr.response);
    });

    xhr.addEventListener("error", () => {
      reject('request failed');
    });
  });

  xhr.open(method, url);
  xhr.send();

  return promise;
};

makeHttpRequest("GET", "https://dummyjson.com/users")
  .then((usersData) => makeHttpRequest('GET', `https://dummyjson.com/posts/user/${usersData.users[0].id}`))
  .then((postsData) => makeHttpRequest('GET', `https://dummyjson.com/comments/post/${postsData.posts[0].id}`))
  .then((commentsData) => makeHttpRequest('GET', `https://dummyjson.com/users/${commentsData.comments[0].id}`))
  .then((userData) => console.log(userData))
  .catch((err) => console.log(err));
