const memory = document.getElementById("memory");
const nextBtn = document.getElementById("next-btn");
const algo = document.querySelector("select");

const processes = [
  {
    name: "p1",
    size: 5,
  },
  {
    name: "p2",
    size: 3,
  },
  {
    name: "p3",
    size: 7,
  },
  {
    name: "p4",
    size: 2,
  },
  {
    name: "p5",
    size: 6,
  },
  {
    name: "p6",
    size: 1,
  },
  {
    name: "p7",
    size: 6,
  },
];

const memSize = 28;
let counter = 0;
const scaleBy = 30;

memory.style.height = memSize * scaleBy + "px";

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (counter >= processes.length) {
    return;
  }

  const process = processes[counter];

  const remaining = memSize - getTotalUsed();

  if (process.size > remaining) {
    window.alert("No space available!!!");
    return;
  }

  const processDiv = document.createElement("div");
  processDiv.id = process.name;
  processDiv.classList.add("block");
  processDiv.style.height = process.size * scaleBy + "px";

  if (algo.value === "first") {
    handleAddNewProcess(processDiv, getBestLocationFirstFit(process.size));
  } else {
    console.log("what?", algo.textContent);
  }

  processDiv.innerHTML = `<div><span>Name: ${process.name}<span><button id='remove-${process.name}' class='remove'>Remove</button></span></div><span>Size: ${process.size}</span>`;

  const removeBtns = document.querySelectorAll(".remove");
  removeBtns.forEach((removeBtn) =>
    removeBtn.addEventListener("click", () => handleClickRemove(removeBtn)),
  );

  counter += 1;
});

function getTotalUsed() {
  const children = memory.childNodes;

  let totalSize = 0;

  children.forEach((child) => {
    const height = child.style.height.split("p")[0] / scaleBy;
    totalSize = totalSize + +height;
  });

  return totalSize;
}

function handleClickRemove(removeBtn) {
  const processName = removeBtn.id.split("-")[1];
  const processDiv = document.getElementById(processName);
  processDiv.innerHTML = "";
  processDiv.id = "";
  processDiv.classList.add("empty");
  mergeEmptyBlocks();
}

function handleAddNewProcess(node, index) {
  if (index !== -1) {
    let children = Array.from(memory.childNodes);
    const oldHeight = +memory.childNodes[index].style.height.split("p")[0];
    const newHeight = +node.style.height.split("p")[0];
    const newEmpty = oldHeight - newHeight;

    const emptyNode = document.createElement("div");
    emptyNode.classList.add("block", "empty");
    emptyNode.style.height = newEmpty + "px";

    children.splice(index, 1, node);
    if (newEmpty > 0) {
      children.splice(index + 1, 0, emptyNode);
    }

    memory.replaceChildren(...children);
  } else {
    memory.append(node);
  }
  mergeEmptyBlocks();
}

function getBestLocationFirstFit(size) {
  const processDivs = memory.childNodes;
  console.log(processDivs);

  let best = -1;

  for (let i = 0; i < processDivs.length; i++) {
    const processDiv = processDivs[i];

    if (
      processDiv.classList.contains("empty") &&
      size <= +processDiv.style.height.split("p")[0] / scaleBy
    ) {
      best = i;
      break;
    }
  }

  console.log("best:", best);

  return best;
}

function mergeEmptyBlocks() {
  const children = Array.from(memory.childNodes);
  let i = 0;

  while (i < children.length - 1) {
    if (
      children[i].classList.contains("empty") &&
      children[i + 1].classList.contains("empty")
    ) {
      const combinedHeight =
        parseInt(children[i].style.height, 10) +
        parseInt(children[i + 1].style.height, 10);
      children[i].style.height = combinedHeight + "px";
      children[i + 1].remove();
      children.splice(i + 1, 1);
    } else {
      i++;
    }
  }

  memory.replaceChildren(...children);
}
