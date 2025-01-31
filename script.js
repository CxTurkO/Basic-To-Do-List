// Muhammed Devran Yılmaz @CxTurkO

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    let task = inputBox.value.trim();

    if (task === '') {
        showPopup("Error: Task cannot be empty or just spaces!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = task;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}

function showPopup(message) {
    document.getElementById("popup-message").innerText = message;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

inputBox.addEventListener("input", function () {
    let maxLength = 35;
    if (inputBox.value.length > maxLength) {
        inputBox.value = inputBox.value.substring(0, maxLength);
    }
    saveInput();
});


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}


function returnList() {
    listContainer.innerHTML = localStorage.getItem("data");
}

inputBox.addEventListener("input", saveInput);

function saveInput() {
    localStorage.setItem("inputValue", inputBox.value);
}

function loadInput() {
    const savedInput = localStorage.getItem("inputValue");
    if (savedInput !== null) {
        inputBox.value = savedInput;
    }
}
loadInput();
returnList();