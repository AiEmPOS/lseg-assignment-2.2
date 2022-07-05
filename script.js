async function retrieveCategory() {
    return await fetch("https://api.publicapis.org/categories").then((res) =>
        res.json()
    );
}

async function displayAll() {
    const categories = await retrieveCategory();
    const table = document.getElementById("output-table");
    for (let i = 0; i < categories.count; i++) {
        let row = table.insertRow(i);
        row.id = "row" + i;
        let cell = row.insertCell(0);
        cell.innerHTML = categories.categories[i];
    }
}

async function filter(input) {
    const categories = await retrieveCategory();
    input = input.toLocaleLowerCase();
    if (input === "") {
        for (let i = 0; i < categories.count; i++) {
            let row = document.getElementById("row" + i);
            row.style.display = "table-row";
        }
    }else{
        for (let i = 0; i < categories.count; i++) {
            let row = document.getElementById("row" + i);
            const content = row.textContent.toLocaleLowerCase();
            if(!content.includes(input)){
                row.style.display = "none";
            }
        }
    }
}

const input = document.getElementById("user-input");
displayAll();

input.addEventListener("change", () => {
    filter(input.value);
});
