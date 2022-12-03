let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getCards(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => renderCard(toy))
  })
      
  }

getCards();

function renderCard(toy){
  
  let toyCollection = document.getElementById("toy-collection");
  let div = document.createElement("div");
  div.className = "card";
  toyCollection.append(div);
  let h2 = document.createElement("h2");
  h2.textContent = toy.name;
  let image = document.createElement("img");
  image.className = "toy-avatar";
  image.src = toy.image ;
  image.alt ="Sorry, no image today!"
  let p = document.createElement("p");
  p.className = "number-of-likes";
  p.textContent = `${toy.likes} likes`
  let btn = document.createElement("button");
  btn.className = "like-btn";
  btn.setAttribute("id", toy.id);
  btn.textContent = `like ❤️`;
  btn.addEventListener("click", () => updateLikes(toy.id,p))
  div.append(h2, image, p, btn);

}

let form = document.querySelector(".add-toy-form");
form.addEventListener("submit", e => addToys(e));

function addToys(e){
  e.preventDefault();
  let name = document.querySelector(".input-text").value;
  let image = document.querySelectorAll(".input-text")[1].value;

  fetch("http://localhost:3000/toys", {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({name: name},
      {image: image} 
    )
  })
  .then(res => res.json())
  .then(data => renderCard(data))
}



function updateLikes(id,p){
  let numberOfLikes = p.textContent.split(" ")[0];
  likes = ++numberOfLikes;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({likes: likes})
  })
  .then(res =>res.json())
  .then(data => {
    p.textContent = `${data.likes} likes`
  })


}