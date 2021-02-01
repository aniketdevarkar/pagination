
//1.create a request variable
var request = new XMLHttpRequest();
//2.create a connection
request.open('GET','https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json',true);
//3. send tht connection
request.send();
//4. register a event listener. once tht data is ready,load the data

request.onload = function (){
    let data = JSON.parse(this.response);
     console.log(data);
     
let h1 = document.createElement("h1");
h1.innerHTML = "<b>Pagination using Dom</b>"
//h1.style.textAlign = "center";
h1.setAttribute("class","display-3");

//create parent div element with container as class
let div = document.createElement("div");
div.setAttribute("class","container col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6");
let dropdown1 = document.createElement("div");
//create child div to diplay content 
let divContent = document.createElement("div");
divContent.setAttribute("id","content");

// create row in container
let row = document.createElement("div");
row.setAttribute("class","row");

//create column class in row
let col = document.createElement("div");
col.setAttribute("class","column");

let table = document.createElement("table");
table.setAttribute("class","table table-striped");
let thead = document.createElement("thead");
let tbody =document.createElement("tbody");
let tr = document.createElement("tr");


let th1 = document.createElement("th");
th1.setAttribute("scope","col");
th1.innerText = "ID";

let th2 = document.createElement("th");
th2.setAttribute("scope","col");
th2.innerText = "Name";

let th3 = document.createElement("th");
th3.setAttribute("scope","col");
th3.innerText = "Email";
tr.append(th1,th2,th3);
thead.append(tr);
table.append(thead,tbody);
col.append(table);
row.append(col);

divContent.append(row);


//divContent.style.backgroundColor = "lightgreen";
divContent.style.marginBottom = "1cm"
divContent.style.padding = "1cm"
divContent.style.color = "black";
div.append(h1);
div.append(divContent);

// To calculate number of buttons needed to display document.
let noOfButtons = 25;
let noOfElements = 4;
buttonFormation(noOfButtons,noOfElements) ;

// function to set number of elements to display.
function setNoOfElements(id) {
  noOfElements = +id;
  pagnition(0,noOfElements);
  if(data.length%noOfElements===0)
  noOfButtons = data.length/noOfElements;
  else
  noOfButtons = parseInt(data.length/noOfElements)+1;
  console.log(noOfButtons,noOfElements);
   let obj = document.getElementById("replace");
   obj.remove();

 buttonFormation(noOfButtons,noOfElements) ;
}

//function to display number of buttons required 

function buttonFormation(noOfButtons,noOfElements) {
  let divbutton = document.createElement("div");
  divbutton.setAttribute("id","replace");
  divbutton.setAttribute("class","btn-toolbar")
  div.append(dropdown1,divbutton);
let Next = 1;
//let Prev = 0;
for(let i=0;i<=noOfButtons+1;i++){
let button = document.createElement("button");
let buttonNO = (i).toString();
if(i===0){
    buttonNO = "Prev";
    button.setAttribute("class","btn btn-danger");
}
else if(i===noOfButtons+1){
buttonNO = "Next";
button.setAttribute("class","btn btn-success");
}
else
button.setAttribute("class","btn-warning btn-group");

button.setAttribute("id",buttonNO);
button.innerHTML = buttonNO;

//eventlistener to perform function after button is clicked 
button.addEventListener("click",function(event){
    buttonClick(event.target.id);
});


function buttonClick(event){
    console.log(event===false)
   let val;
    if(Next>=noOfButtons&&event==="Next"){
    val = noOfButtons;
    buttonClick(val);
    }
    else if(event==="Next"){
        val = Next+1;
        buttonClick(val);
    }else if(Next<=1 &&event==="Prev"){
    val = 1;
    buttonClick(val);
    }
    else if(event==="Prev"){
        val = Next-1;
        buttonClick(val);
    }
    else{
         val = event; 
    }

Next = +val;

k = (val-1)*noOfElements;
pagnition(k,noOfElements);
    
}
divbutton.append(button);
}   
}

// function to display data of specified number of elements
function pagnition(k,noOfElements) {
    document.querySelector("tbody").innerHTML = "";
//
for(let i=k;i<k+noOfElements;i++){
  let tr = document.createElement("tr");
  let th = document.createElement("th");
 // let tdid = document.createElement("td");
  let tdname = document.createElement("td");
  let tdemail = document.createElement("td");
    if(data[i]!==undefined){
     //tdid.innerText = data[i].id;
     
      tdname.innerText = data[i].name;
      
      tdemail.innerText = data[i].email;
      //tr.append(th,tdid,tdname,tdemail);
     /*let str = data[i].id+") "+"id = "+data[i].id+"<br>"+"name = "+" "+data[i].name+"<br>"+"email = "+
     "<a href="+"mailto:"+data[i].email+">"+data[i].email+"</a>"+"<br>";
       document.querySelector(".column").innerHTML += str+"<br>";*/
    }else
    break;
  
    th.setAttribute("scope","row");
    th.innerText = data[i].id;
    tr.append(th,tdname,tdemail);
    tbody.append(tr);
}
}



dropdown1.setAttribute("class","dropdown");

//main button inside dropdown
let buttonDropDown = document.createElement("button");
buttonDropDown.setAttribute("type","button");
buttonDropDown.setAttribute("class","btn btn-primary dropdown-toggle m-2");
buttonDropDown.setAttribute("data-toggle","dropdown");
buttonDropDown.setAttribute("id","dropdownMenu2");

buttonDropDown.setAttribute("data-display","static");
buttonDropDown.setAttribute("aria-haspopup","true");
buttonDropDown.setAttribute("aria-expanded","false");
buttonDropDown.innerText = "Set elements per page";

dropdown1.append(buttonDropDown);
//inner div for drop down menu
let innerDiv = document.createElement("div");

innerDiv.setAttribute("class","dropdown-menu");
innerDiv.setAttribute("aria-labelledby","dropdownMenu2");

//dropdown buttons
let innerButton1 = document.createElement("button");
innerButton1.setAttribute("class","dropdown-item");
innerButton1.setAttribute("type","button");
innerButton1.setAttribute("id","4");
innerButton1.innerText = "4";
innerButton1.addEventListener("click",function(event) {
  setNoOfElements(event.target.id);
 
})

let innerButton2 = document.createElement("button");
innerButton2.setAttribute("class","dropdown-item");
innerButton2.setAttribute("type","button");
innerButton2.setAttribute("id","8");
innerButton2.innerText = "8";
innerButton2.addEventListener("click",function(event) {
  setNoOfElements(event.target.id);
})

let innerButton3 = document.createElement("button");
innerButton3.setAttribute("class","dropdown-item");
innerButton3.setAttribute("type","button");
innerButton3.setAttribute("id","12");
innerButton3.innerText = "12";
innerButton3.addEventListener("click",function(event) {
  setNoOfElements(event.target.id);

})
 


innerDiv.append(innerButton1,innerButton2,innerButton3);

// append innerDiv to dropdown div
dropdown1.append(innerDiv);

// append dropdown1 to div
document.body.append(div);

//to display elements before pressing any button
pagnition(0,noOfElements);

}
