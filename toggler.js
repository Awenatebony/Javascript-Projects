const toggleMe = document.getElementById("check"); // Target the checkbox
const body = document.body; // Get the body element

toggleMe.addEventListener("change", function() {
    body.classList.toggle("toggleMe"); // Toggle background color when checkbox is checked/unchecked
});
