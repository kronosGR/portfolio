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

const API_CONTACT = "https://kronos.kandz.me/wp/wp-json/contact-form-7/v1/contact-forms/5/feedback";

button.disabled = true;
let page=0;

let emailReady = false;
let nameReady = false;
let messageReady = false;

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


top.addEventListener("click", (e) => {
  page=0;
  e.preventDefault();
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})

next.addEventListener("click", (e)=> {
  page++;
  e.preventDefault();
  window.scroll({
    top: innerHeight * page,
    left: 0,
    behavior: 'smooth'
  });
})

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

/**
 * check if all form fields are valid and toggles the button
 */
function checkForm(){
  if (emailReady && messageReady && nameReady) button.disabled = false;
  else button.disabled = true;
}

// email regex
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
