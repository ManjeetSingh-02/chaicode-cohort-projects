let weight = document.getElementById("weight");
let height = document.getElementById("height");
let result = document.getElementById("bmi-result");
let btn = document.getElementById("calculate");

btn.addEventListener("click", () => {
  let bmi = (weight.value / Math.pow(height.value, 2)) * 10000;
  result.innerHTML = `Your BMI is: ${bmi.toFixed(2)}`;
});
