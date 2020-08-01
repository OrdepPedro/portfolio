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
    let typeSpeed = 300;

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

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;"
  );
});
