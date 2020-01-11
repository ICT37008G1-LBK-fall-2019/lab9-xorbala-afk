//amocana 1
let userForm = document.querySelector("#user-search");
userForm.onsubmit = (event) => submitHandler(event);

function submitHandler(event) {
  event.preventDefault();

  let enteredId = event.target.querySelector("#user-id").value;
  let userPosts = document.querySelector("#user-posts");
  userPosts.innerHTML = "";

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${enteredId}`)
  .then(response => response.json())
  .then(json => json.map(post => {
    let title = document.createElement("td");
    title.innerHTML = post.title;  

    let content = document.createElement("td");
    content.innerHTML = post.body; 
 
    let button = document.createElement("button");
    button.innerHTML = "Show comments";
    let postId = document.createAttribute("data-post-id");
    postId.value = post.id;
    button.setAttributeNode(postId);
    button.onclick = (event) => showComments(event)

    let commentsBtn = document.createElement("td");
    commentsBtn.appendChild(button);

    let row = document.createElement("tr");
    row.appendChild(title);
    row.appendChild(content);
    row.appendChild(commentsBtn);
    userPosts.appendChild(row);
  }))
} 


//amocana 2
const axios = require('axios');

function showComments(event) {
  let postId = event.target.getAttribute("data-post-id");
  let postsTeble = event.target.closest("table");

  let active = postsTeble.querySelector(".active");

  if (active) {
    active.classList.remove("active");
    let commentsTable = document.querySelector(".post-comments");
    active.removeChild(commentsTable);
  }

  let currentPost = event.target.closest("tr");
  currentPost.classList.add("active");

  let commentsTable = document.createElement("table");
  commentsTable.classList.add("post-comments");
  currentPost.appendChild(commentsTable);
  let postComments = document.querySelector(".post-comments")
  
  axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  .then(response => response.data.map(
    item => {
      let name = document.createElement("td");
      let email = document.createElement("td"); 
      let comment = document.createElement("td"); 
  
      name.innerHTML = item.name;  
      email.innerHTML = item.email; 
      comment.innerHTML = item.body; 

      let row = document.createElement("tr");
      row.appendChild(name);
      row.appendChild(email);
      row.appendChild(comment);

      postComments.appendChild(row);
    }
  ))
  .catch(function (error) {
    console.log(error);
    alert("Something went wrong")
  });
}




