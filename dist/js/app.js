// ES6 Class
class TypeWritter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = ""; //
    this.wordIndex = 0; //In the array
    this.wait = parseInt(wait, 10); //It is a integer and 10 based number
    this.type(); //main method
    this.isDeleting = false; //the present states
  }

  type() {
    //Current index of word
    const current = this.wordIndex % this.words.length;
    //Full text
    const fullTxt = this.words[current];
    //Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<div class="text">${this.txt}</div>`;

    // Initial type speed
    let typeSpeed = 200;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    //If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait; //pause in the end
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed); // Pace of typewritting
  }
}

// Init on dom load
document.addEventListener("DOMContentLoaded", init);
// Init app
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init Typewritter
  new TypeWritter(txtElement, words, wait);
}

const cursor = document.querySelector("body > .cursor");
const btns = document.querySelectorAll(".btn");

const animateIt = function (e) {
  const span = this.querySelector("span");
  const { offsetX: x, offsetY: y } = e,
    { offsetWidth: width, offsetHeight: height } = this,
    move = 20,
    xMove = (x / width) * (move * 2) - move,
    yMove = (y / height) * (move * 2) - move;

  span.style.transform = `translate(${xMove}px, ${yMove}px)`;

  if (e.type === "mouseleave") span.style.transform = "";
};

const editCursor = (e) => {
  const { clientX: x, clientY: y } = e;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
};

btns.forEach((b) => b.addEventListener("mousemove", animateIt));
btns.forEach((b) => b.addEventListener("mouseleave", animateIt));

window.addEventListener("mousemove", editCursor);

// Modal
const openModalButton = document.querySelector("#openModal");
const closeModalButton = document.querySelector("#closeModal");
const modal = document.querySelector(".modal");

// Event Listeners
openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);
// window.addEventListener("click", outsideClick);

// Open Function
function openModal() {
  modal.classList.add("active");
}

// Close Function
function closeModal() {
  modal.classList.remove("active");
}

// // Outside Click Function
// function outsideClick(e) {
//   if (e.target == modal) {
//     modal.classList.remove("active");
//   }
// }
