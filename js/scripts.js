let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
let navBar = document.querySelector(".navbar");
let body = document.querySelector("body");



menuBtn.onclick = function(){
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    navBar.classList.add("active");
    body.style.overflow = "hidden";
}

cancelBtn.onclick = function(){
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    navBar.classList.remove("active");
    body.style.overflow="auto";
}

// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let val;
window.onscroll = function(){
    if(document.documentElement.scrollTop > 20)
        nav.classList.add("sticky");
    else
        nav.classList.remove("sticky");

}

// Qaundo alguem clica num link do menu lateral
let navMenuLinks = document.querySelectorAll(".menu li a");
for(var i = 0; i < navMenuLinks.length; i++){
    navMenuLinks[i].addEventListener("click", ()=>{
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
        navBar.classList.remove("active");
        body.style.overflow="auto";
    });
}


// Quando algem clica downloadCV
let downloadCVBtn = document.querySelector(".download-cv");
downloadCVBtn.addEventListener("click", ()=>{
    alert("O CV não está disponível no momento. Por favor, tente novamente em breve.");
    //window.location.href = "cv.pdf";
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
