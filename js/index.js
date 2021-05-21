import {showToastMsg}  from '/js/toast.js';

const nameEl = document.querySelector("#name");
const emailEl = document.querySelector("#email");
const messageEl = document.querySelector("#message");
const form = document.querySelector("form");
const button = form.querySelector("button");
const next = document.querySelector(".next");
const top = document.querySelector(".top");

button.disabled = true;
const height = window.height;
let page=0;

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
  }
})

emailEl.addEventListener("blur", ()=> {
  // check if valid email address
  if (!regexEmail.test(emailEl.value)){
    showToastMsg("Please enter a valid email address", "email", 0);
  }
})

messageEl.addEventListener("blur", ()=> {
  // check if not empty
  if(messageEl.value.length<1){
    showToastMsg("Please enter a message", "message", 0);
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

})

// email regex
export const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
