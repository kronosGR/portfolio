import {showToastMsg, removeItemToastMsg}  from '/js/toast.js';

const nameEl = document.querySelector("#name");
const emailEl = document.querySelector("#email");
const messageEl = document.querySelector("#message");
const form = document.querySelector("form");
const button = form.querySelector("button");
const next = document.querySelector(".next");
const top = document.querySelector(".top");
const ghInfoBtn = document.querySelector("#gh-info");
const jswInfoBtn = document.querySelector("#jsw-info");
const csmInfoBtn = document.querySelector("#csm-info");
const closeJswBtn = document.querySelector(".jsw");
const closeGhBtn = document.querySelector(".gh");
const closeCsmBtn = document.querySelector(".csm");
const logo = document.querySelector(".logo");
const menuHome = document.querySelector("#menu-home");
const menuAbout = document.querySelector("#menu-about");
const menuProjects = document.querySelector("#menu-projects");
const menuContact = document.querySelector("#menu-contact");

const API_CONTACT = "https://kronos.kandz.me/wp/wp-json/contact-form-7/v1/contact-forms/5/feedback";

button.disabled = true;
let page=1;

let emailReady = false;
let nameReady = false;
let messageReady = false;

let innerHeight = window.innerHeight;

window.addEventListener("resize", ()=> {
  innerHeight = window.innerHeight;
})

// update the selected in menu while scrolling
document.addEventListener("scroll", (e)=> {
  page = Number((window.pageYOffset / innerHeight).toFixed(0))+ 1;
  updateMenu();
})

// update the page according to navigation selection START-->
menuHome.addEventListener("click", (e)=>{
  page=1;
  updateMenu();
})

menuAbout.addEventListener("click", (e)=>{
  page=2;
  updateMenu();
})

menuProjects.addEventListener("click", (e)=>{
  page=3;
  updateMenu();
})

menuContact.addEventListener("click", (e)=>{
  page=4;
  updateMenu();
})

logo.addEventListener("click", (e)=>{
  page=1;
  updateMenu();
})
// <--END update the page according to navigation selection

// updates the menu selection according to page number
function updateMenu(){
  switch(page){
    case 1:
      menuHome.classList.add("selected");
      menuAbout.classList.remove("selected");
      menuProjects.classList.remove("selected");
      menuContact.classList.remove("selected");
      break;
    case 2:
      menuHome.classList.remove("selected");
      menuAbout.classList.add("selected");
      menuProjects.classList.remove("selected");
      menuContact.classList.remove("selected");
      break;
    case 3:
      menuHome.classList.remove("selected");
      menuAbout.classList.remove("selected");
      menuProjects.classList.add("selected");
      menuContact.classList.remove("selected");
      break;    
    case 4:
      menuHome.classList.remove("selected");
      menuAbout.classList.remove("selected");
      menuProjects.classList.remove("selected");
      menuContact.classList.add("selected");
      break;
  }
}

// functions toggles the information modal windows START-->
jswInfoBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  document.querySelector(".jsw-cont").style="display:flex;";
})

closeJswBtn.addEventListener("click", () => {
  document.querySelector(".jsw-cont").style="display:none;";
})


ghInfoBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  document.querySelector(".gh-cont").style="display:flex;";
})

closeGhBtn.addEventListener("click", () => {
  document.querySelector(".gh-cont").style="display:none;";
})


csmInfoBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  document.querySelector(".csm-cont").style="display:flex;";
})

closeCsmBtn.addEventListener("click", () => {
  document.querySelector(".csm-cont").style="display:none;";
})
// <--END functions toggles the information modal windows

// scroll to top page
top.addEventListener("click", (e) => {
  page=1;
  e.preventDefault();
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  updateMenu();
})


// scroll to next page
next.addEventListener("click", (e)=> {
  e.preventDefault();
  window.scroll({
    top: innerHeight * page,
    left: 0,
    behavior: 'smooth'
  });
  page++;
  updateMenu();
})

// contact form validation START-->
nameEl.addEventListener("blur", () => {
  // check if not empty
      if (nameEl.value.length<1){
    showToastMsg("Please enter your name", "name", 0)
    nameReady = false;
  } else {
    removeItemToastMsg("name");
    nameReady = true;
  }
  checkForm();
})

emailEl.addEventListener("blur", ()=> {
  // check if valid email address
  if (!regexEmail.test(emailEl.value)){
    showToastMsg("Please enter a valid email address", "email", 0);
    emailReady = false;
  }else {
    removeItemToastMsg("email");
    emailReady = true;
  }
  checkForm();
})

messageEl.addEventListener("input", ()=> {
  // check if not empty
  if(messageEl.value.length<1){
    showToastMsg("Please enter a message", "message", 0);
    messageReady = false;
  }else {
    removeItemToastMsg("message");
    messageReady = true;
  }
  checkForm();
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let data = new FormData();
  data.append("your-name", nameEl.value);
  data.append("your-email", emailEl.value);
  data.append("your-subject", "Kronos Portfolio");
  data.append("your-message", messageEl.value);
  fetch(API_CONTACT, {
    method: "POST",
    body: data,
    redirect: "follow"
  })
  .then (res => res.json())
  .then (json => {
    showToastMsg(json.message, "contact", 1);
  })
  .catch(e => {
    showToastMsg("Something went wrong.", "contact", 0);
  })
})
// <--END contact form validation


/**
 * check if all form fields are valid and toggles the button
 */
function checkForm(){
  if (emailReady && messageReady && nameReady) button.disabled = false;
  else button.disabled = true;
}

// email regex
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
