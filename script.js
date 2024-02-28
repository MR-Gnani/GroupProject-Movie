let underLine = document.getElementById("under-line");
let categoryList = document.querySelectorAll("category_list div");

for(let i=1; i<tabs.length; i++) {
  tabs[i].addEventListener("click", function(e){
    filter(e);
  });
};

function filter(e) {
  let mode = e.target.id;
  let resultHTML = " ";

  if (mode === "select_list") {
    resultHTML = `<div class="su_container">
    <div class="select_img row">
      <div class="col">
        <img src="./images/img1.jpg" alt="">
      </div>
      <div class="col">
        <img src="./images/img2.jpg" alt="">
      </div>
      <div class="col">
        <img src="./images/img3.jpg" alt="">
      </div>
      <div class="col">
        <img src="./images/img4.jpg" alt="">
      </div>
    </div>
  </div>`   
  } else if (mode === "buy_list"){

    } else if (mode === "qs_list") {
  
    } 
} 