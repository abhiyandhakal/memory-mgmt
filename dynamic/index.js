const memory = document.getElementById("memory");
const nextBtn = document.getElementById("next-btn");

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

	memory.append(processDiv);

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
	processDiv.classList.add("empty");
}
