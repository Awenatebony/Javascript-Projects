// const changeMe = document.getElementById('Login');
// const wrapper = document.getElementById("wrapper");

// changeMe.addEventListener("click", function(){
//    if(wrapper.classList.contains("coloCode")){
//     wrapper.style.backgroundColor = "blue";
//     wrapper.innerText.color = "red";
//    }      const changeMe = document.getElementById('Login');
const changeMe = document.getElementById('Login');
const wrapper = document.getElementById('wrapper');

// Add an event listener to toggle the "active" class on the wrapper
changeMe.addEventListener("click", function() {
    wrapper.classList.toggle("active");
});
