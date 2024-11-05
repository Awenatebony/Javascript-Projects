const checkButton = document.getElementById("check");
const body = document.body

checkButton.addEventListener('change', function(){
  body.classList.toggle("checkButton");
});