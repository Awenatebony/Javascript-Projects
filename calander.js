const tableRow = document.getElementsByTagName("td");

tableRow.addEventLister('click', function(){
    tableRow.classList.add("active");
})