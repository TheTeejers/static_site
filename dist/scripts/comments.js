const ref = new Firebase("https://fenix-static-comments-tj.firebaseio.com");
const form = document.querySelector("form");

form.addEventListener("submit", postComment);

const timeStamp = () => {
  let options = {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute:'2-digit'
  };
  let now = new Date().toLocaleString('en-US', options);
  return now;
};

function postComment(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let comment = document.getElementById("comment").value;

  if (name && comment) {
    ref.push({
      name: name,
      email: email,
      comment: comment,
      time: timeStamp()
    });
    console.log("button clicked")
  }

  document.getElementById("name").value = '';
  document.getElementById("email").value = '';
  document.getElementById("comment").value = '';
};

ref.on("child_added", function(snapshot) {
  let comment = snapshot.val();
  addComment(comment.name, comment.comment, comment.time);
});

const addComment = (name, comment, timeStamp) => {
  let comments = document.getElementById("comments");
  comments.innerHTML = `<hr><h4>${name} said<date>${timeStamp}</date></h4><p>${comment}</p>${comments.innerHTML}`;
}
