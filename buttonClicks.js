const viewWorkButton = document.getElementById("viewWork");
const viewHomeButton = document.getElementById("homeNav")
const viewWorkButton2 = document.getElementById("workNav")
const viewContactButton = document.getElementById("contactNav")


const contactPosition = document.getElementById("Contact");


const workPosition = document.getElementById("mazeTitle");

viewWorkButton.addEventListener('click', function(){
    //const targetPosition = workPosition.offsetTop;
    workPosition.scrollIntoView({behavior: "smooth"});
});

viewWorkButton2.addEventListener('click', function(){
    //const targetPosition = workPosition.offsetTop;
    workPosition.scrollIntoView({behavior: "smooth"});
});
viewHomeButton.addEventListener('click', function(){
    //const targetPosition = workPosition.offsetTop;
    window.scrollTo({top: 0, behavior: "smooth"});
});
viewContactButton.addEventListener('click', function(){
    //const targetPosition = workPosition.offsetTop;
    contactPosition.scrollIntoView({behavior: "smooth"});
});