inputs = document.getElementsByTagName("input");
output = document.getElementById("output");
history = document.getElementById("history");
submit = document.getElementById("submit");

submit.addEventListener("click", () => {
  let values = [];
  for (let i = 0; i < inputs.length; i++) {
    let val = inputs[i].value;
    let res = validateTime(val);
    if (res) values.push(val);
    else return alert("Invalid Entry");
  }

  while (values.length > 1) {
    let val1 = values.shift();
    values[values.length - 1] = addTimes(val1, values[values.length - 1]);
  }

  display(values[0]);
});

function validateTime(input = []) {
  let sections = input.split(":");
  for (let i = 0; i < sections.length; i++) {
    if (isNaN(parseInt(sections[i]))) return false;
  }
  return true;
}

function addTimes(val1, val2) {
  val1 = toHMS(val1);
  val2 = toHMS(val2);
  let [h1, m1, s1] = val1.split(":").map((t) => parseInt(t));
  let [h2, m2, s2] = val2.split(":").map((t) => parseInt(t));
  let [h, m, s] = [h1 + h2, m1 + m2, s1 + s2];

  while (s >= 60) {
    m += 1;
    s -= 60;
  }
  while (m >= 60) {
    h += 1;
    m -= 60;
  }

  let str = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${
    s < 10 ? "0" + s : s
  }`;
  return str;
}

function toHMS(val) {
  let sections = val.split(":");
  if (sections.length === 3) return val;
  while (sections.length < 3) {
    sections.unshift("0");
  }
  return sections.join(":");
}

function display(value) {
  history = document.getElementsByTagName("ul")[0];
  output.innerHTML = value;
}

output.addEventListener("click", () => {
  let text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text);
  alert("Copied!");
});

document.addEventListener("keypress", (ev) => {
  if (ev.key === "Enter") submit.click();
});

var copy = document.getElementById("copy");

use.addEventListener("click", () => {
  let res = document.getElementById("output").textContent;
  inputs[0].value = res;
  inputs[1].value = null;
});

clear.addEventListener("click", () => {
  document.getElementById("output").textContent = "00:00:00";
  inputs[0].value = null;
  inputs[1].value = null;
});
