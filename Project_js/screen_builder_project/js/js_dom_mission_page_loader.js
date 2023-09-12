let elmsArr = [];
let clear = document.querySelector("#clearBtn");
const createElm = (tagName, content, height, width, color, size, bgc) => {
  let pageDiv = document.querySelector("#pageDiv");
  if (!pageDiv) return;
  let newElm = document.createElement(tagName);
  pageDiv.appendChild(newElm);
  newElm.innerText = content;
  newElm.style.height = height;
  newElm.style.width = width;
  newElm.style.color = color;
  newElm.style.fontSize = size;
  newElm.style.backgroundColor = bgc;
  elmsArr.push({
    tagName: tagName,
    content: content,
    height: height,
    width: width,
    color: color,
    size: size,
    bgc: bgc,
  });
  clear.addEventListener("click", () => {
    pageDiv.appendChild(newElm).remove();
  });
};

const restorePage = () => {
  elmsArr = []; // clear the array
  let newElmsArr = []; // clear the array
  document.querySelector("#returnBtn").addEventListener("click", () => {
    let jsonStr = localStorage.getItem("tags"); // get string json from localStorage

    newElmsArr = JSON.parse(jsonStr); //convert from json to array
    for (let item of newElmsArr) {
      createElm(
        item.tagName,
        item.content,
        item.height,
        item.width,
        item.color,
        item.size,
        item.bgc
      );
    }
  });
};

window.addEventListener("load", () => {
  document.querySelector("#form1").addEventListener("submit", (e) => {
    e.preventDefault(); //stop refresh
  });
  document.querySelector("#submitBtn").addEventListener("click", () => {
    let inputTag = document.querySelector("#inputTag");
    let inputContent = document.querySelector("#inputContent");
    let inputHeight = document.querySelector("#inputHeight");
    let inputWidth = document.querySelector("#inputWidth");
    let inputColor = document.querySelector("#inputColor");
    let inputSize = document.querySelector("#inputSize");
    let inputBGC = document.querySelector("#inputBGC");
    if (
      !inputTag ||
      !inputContent ||
      !inputHeight ||
      !inputWidth ||
      !inputColor ||
      !inputSize ||
      !inputBGC
    )
      return;

    createElm(
      inputTag.value,
      inputContent.value,
      inputHeight.value,
      inputWidth.value,
      inputColor.value,
      inputSize.value,
      inputBGC.value
    );
  });
  document.querySelector("#saveBtn").addEventListener("click", () => {
    let jsonStr = JSON.stringify(elmsArr); // convert array to string
    localStorage.setItem("tags", jsonStr); //save to localStorage
  });
  restorePage();
});
