let listarr = [];

const restorePage = () => {
  let localArr = localStorage.getItem("Old List");
  let oldList = document.createElement("div");
  let dataFromLocalStorage = JSON.parse(localArr);
  console.log(dataFromLocalStorage);
  oldList.className = "oldList";
  for (let li of dataFromLocalStorage) {
    oldList.innerHTML += "* " + li + "<hr>";
  }

  let conOldList = document.getElementById("conOldLists");
  conOldList.appendChild(oldList);
};
window.addEventListener("load", () => {
  document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
  });
  document.getElementById("addBtn").addEventListener("click", () => {
    let li = document.createElement("li"); // create new li
    li.innerHTML = document.querySelector("#itemInput").value; // take value of input and put it in new elm
    li.className = "list-group-item"; // set class from bs
    let list = document.getElementById("list");
    if (list) {
      list.appendChild(li);
      document.getElementById("list").appendChild(li);
      listarr.push(li.innerHTML);
      console.log("listarr", listarr);

      li.addEventListener("mouseenter", (e) => {
        e.target.classList.add("active");
      });
      li.addEventListener("mouseleave", (e) => {
        e.target.classList.remove("active");
      });
    }
  });
  let saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      // let oldList = document.createElement("div");
      let oldList = document.getElementById("oldList");
      oldList.className = "oldList";
      // oldList.innerHTML ="<img URL = "../images/thumbtack_blue.png" />";
      for (let li of listarr) {
        oldList.innerHTML += "* " + li + "<hr>";
      }

      // let conOldList = document.getElementById("conOldLists");
      // conOldList.appendChild(oldList);
      // let storagelistarr = [];
      // storagelistarr.push(listarr);

      let stringlist = JSON.stringify(listarr);
      localStorage.setItem("Old List", stringlist);
      // console.log(localStorage.getItem("Old Lists"));

      listarr = [];

      let lis = document.querySelectorAll(".list-group-item");
      for (li of lis) {
        li.remove();
      }
      let itemInput = document.getElementById("itemInput");
      if (itemInput) {
        itemInput.value = " ";
      }
    });
  }
  restorePage();
});
