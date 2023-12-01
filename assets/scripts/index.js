'use strict';

import  Subscriber  from "./classes.js";
import  User  from "./classes.js";

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
  }
  
  // Get HTML element by id
  function getElement(selector, parent = document) {
    return parent.getElementById(selector);
  }
  
  // Select HTML element
  function select(selector, parent = document) {
    return parent.querySelector(selector);
  }
  
  // Get a (node) list of HTML elements as array
  function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  }
  
  // Print
  function print(arg) {
    console.log(arg);
  }
  
  // Sleep
  function sleep(duration) {
    return new Promise(resolve => {
      setTimeout(resolve, duration)
    });
  }
  
  // Generate random number between - and including - 'min' and 'max'
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  // Filter array
  function filterArray(array, callback) {
    return array.filter(callback);
  }
  
  // Create an HTML element
  function create(element, parent = document) {
    return parent.createElement(element);
  }

const defaultSubscriberGroups = [
  'Games',
  'Movies',
  'Photos'
]

const defaultSubscriberPages = [
  'Page1',
  'Page2',
  'Page3'
]
const defaultSubscriber = new Subscriber(1, "John Doe", "CoolJohn", "john.doe@gmail.com", defaultSubscriberGroups, defaultSubscriberPages, true);



const fileInput = select("#file");
const imageNaming = select(".image-naming");
const modalButton = select(".user-info-image");
const fileContent = select(".file-content");
const postZone = select(".posting");
const postButton = select(".post-button");
const postContainer = select(".post-container");
const modal = select(".modal");
const modalContent = select(".modal-content");
let selectFile = false;
let file;

function toggleModal() {
  modal.classList.toggle("modal");
}

function closeModal() {
  modal.classList.remove("modal");
}

function closeModalOnEsc(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

onEvent("click", modalButton, toggleModal);

onEvent("keyup", document, closeModalOnEsc);

function clearInput() {
  postZone.value = "";
  selectFile = false;
  fileInput.value = "";
  fileContent.innerHTML = "";
}

function newPictures(event) {
  selectFile = true;
  file = event.target.files[0];
  const selectFileText = create("p");
  selectFileText.textContent = `${file.name}`;
  fileContent.prepend(selectFileText);
}

function newPost() {
  let nPost = create("div");
  nPost.classList.add("post");

  const postHeader = create("div");
  postHeader.classList.add("post-header");
  nPost.appendChild(postHeader);

  let profileImage = create("div");
  profileImage.classList.add("post-header-image");
  postHeader.appendChild(profileImage);

  let postHeaderText = create("div");
  postHeaderText.classList.add("post-header-text");
  postHeader.appendChild(postHeaderText);

  let user = create("p");
  user.classList.add("user");
  user.textContent = defaultSubscriber.fullName;
  postHeaderText.appendChild(user);

  let date = create("p");
  date.classList.add("post-time");
  let options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  date.textContent = new Date().toLocaleDateString("en-CA", options).toString();
  postHeaderText.appendChild(date);

  let text = create("p");
  text.textContent = postZone.value;
  nPost.appendChild(text);

  if (selectFile) {
    let imageContainer = create("div");
    let image = create("img");

    imageContainer.classList.add("post-image");
    image.src = URL.createObjectURL(file);

    nPost.appendChild(imageContainer);
    imageContainer.appendChild(image);
  }

  postContainer.insertBefore(nPost, postContainer.firstChild);

  postZone.value = "";
}

function toggleFile() {
  fileContent.classList.toggle('visible');
}

function closeFile() {
  fileContent.classList.remove('visible');
}

function closeFileOnEsc(event) {
  if (event.key === "Escape") {
    closeFile();
  }
}

onEvent("keyup", document, closeModalOnEsc);

function handleKeyDown(event) {
  if (event.key === "Enter" && postZone.value.trim().length > 0) {
    event.preventDefault();
    newPost();
    postZone.focus();
    clearInput();
  } else if (event.key === "Enter") {
    event.preventDefault();
    postZone.focus();
  }
}

onEvent("keydown", postZone, handleKeyDown);

onEvent("click", postButton, () => {
  if (postZone.value.trim().length > 0 || selectFile) {
    newPost();
    postZone.focus();
    clearInput();
  } else {
    postZone.focus();
  }
});

onEvent("load", window, () => {
  postZone.focus();
});

const infoArray = defaultSubscriber.getInfo().split(", ");

const fullName = infoArray[1];
const userName = infoArray[2];
const email = infoArray[3];
const pagesIndex = infoArray.indexOf('Pages') + 1;
const groupsIndex = infoArray.indexOf('Groups') + 1;

const pages = infoArray.slice(pagesIndex, groupsIndex - 1).join(", ");
const groups = infoArray.slice(groupsIndex).join(", ");
const canMonetize = infoArray[infoArray.length - 1];

const row1 = create("p");
row1.textContent = `Full name: ${fullName}`;
modalContent.appendChild(row1);

const row2 = create("p");
row2.textContent = `Username: ${userName}`;
modalContent.appendChild(row2);

const row3 = create("p");
row3.textContent = `Email: ${email}`;
modalContent.appendChild(row3);

const row4 = create("p");
row4.textContent = `Pages: ${pages}`;
modalContent.appendChild(row4);

const row5 = create("p");
row5.textContent = `Groups: ${groups}`;
modalContent.appendChild(row5);

const row6 = create("p");

if (canMonetize === "false") {
  row6.textContent = `Sorry, you can't monetize your content yet`;
  modalContent.appendChild(row6);
} else {
  row6.textContent = `You can monetize your content`;
  modalContent.appendChild(row6);
}

onEvent("change", fileInput, newPictures);

onEvent("click", modalButton, toggleModal);

onEvent("click", fileContent, toggleModal);

onEvent("keyup", document, closeFileOnEsc);