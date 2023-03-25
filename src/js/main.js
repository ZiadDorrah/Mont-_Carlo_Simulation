let numberInp = document.querySelector(".frequency-input");
let user_inputs = document.getElementsByClassName("user-inputs");
let inputs = document.querySelector(".inputs");
let calculate = document.querySelector(".calculate");
let container = document.querySelector(".container")

numberInp.addEventListener("change", () => {
  inputs.innerHTML = "";
  for (let i = 0; i < numberInp.value; i++) {
    let demand_input = document.createElement("input");
    demand_input.classList.add("form-control", "demand");
    demand_input.setAttribute("type", "text");
    demand_input.setAttribute("placeholder", "Demand");
    let freq_input = document.createElement("input");
    freq_input.classList.add("form-control", "freq");
    freq_input.setAttribute("type", "text");
    freq_input.setAttribute("placeholder", "Frequency");
    inputs.appendChild(demand_input);
    inputs.appendChild(freq_input);
    inputs.appendChild(document.createElement("hr"));
  }
});

calculate.addEventListener("click", () => {
  if(document.querySelector(".check")){
    document.querySelector(".check").remove()
  }
  let demandNumbers = document.querySelectorAll(".demand");
  let freqNumbers = document.querySelectorAll(".freq");
  let list = [];
  let freqSum = 0;
  for (let i = 0; i < demandNumbers.length; i++) {
    list.push({ "demand": demandNumbers[i].value,"freq": freqNumbers[i].value});
    freqSum += Number.parseInt(freqNumbers[i].value)
  }
  let number = 1
  for (let i = 0; i < list.length; i++) {
    list[i].prop = Number.parseFloat(list[i].freq / freqSum).toFixed(2);
    let x =0
    let sum = 0
    if(!i)
      sum = list[i].prop
    while (x < i+1){
      sum += Number.parseFloat(list[x].prop)
      x++
    }
    list[i].cum = Number.parseFloat(sum).toFixed(2)
    if(i)
      list[i].start = Number.parseInt(number + 1);
    else
      list[i].start = Number.parseInt(number);
    list[i].end = Number.parseInt(list[i].cum * 100);
    number = list[i].cum * 100;
  }
  list[list.length - 1].cum = 1
  list[list.length - 1].end = 100
  console.log(...list);
  let check = document.createElement("div")
  check.className = "check"
  let outputInput = document.createElement("input")
  outputInput.classList.add("form-control", "check");
  outputInput.setAttribute("type", "number");
  outputInput.setAttribute("placeholder", "Enter Random Numbers");
  let label = document.createElement("label")
  let labeltext = document.createTextNode("Output is : ")
  label.appendChild(labeltext)
  let span = document.createElement("span")
  let slected = null;
  outputInput.addEventListener("change", () => {
    span.innerHTML = ""
    for(let i = 0; i < list.length; i++ ){
      if(outputInput.value <= list[i].end && outputInput.value >= list[i].start){
        slected = list[i].demand;
        break;
      }else{
        slected = null;
      }
    }
    if(slected){
      let text = document.createTextNode(slected)
      span.appendChild(text)
    }else {
      let text = document.createTextNode("Out The Range")
      span.appendChild(text)
    }
  });
  check.appendChild(outputInput)
  check.appendChild(label)
  check.appendChild(span)
  container.appendChild(check)
  // Table
  console.table(list)
});



