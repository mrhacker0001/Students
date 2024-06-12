document.addEventListener("DOMContentLoaded", () => {
    const openn = document.querySelector("#open");
    const form = document.querySelector("form");
    const routine = document.querySelector(".routine");

    if (!openn || !form || !routine) {
        console.error("Required DOM elements are missing.");
        return;
    }

    openn.addEventListener("click", () => {
        form.style.transform = "translateY(250px)";
    });

    const close = () => {
        form.style.transform = "translateY(-350px)";
    };

    const student = JSON.parse(localStorage.getItem("key1")) || [];
    let usercha = "";
    let ozgardi = false;

    form.addEventListener("submit", addStudent);

    function addStudent(event) {
        event.preventDefault();
        const ism = event.target[0].value;
        const fam = event.target[1].value;
        const obj = { ism, fam, grades: Array(32).fill("3") }; // Initializing grades to "3"

        if (ozgardi) {
            student[usercha] = obj;
            ozgardi = false;
        } else {
            student.push(obj);
        }

        event.target[0].value = "";
        event.target[1].value = "";
        localStorage.setItem("key1", JSON.stringify(student));
        close();
        getMapData();
    }

    function edit(index) {
        form.style.transform = "translateY(250px)";
        const inputs = form.querySelectorAll("input");
        inputs[0].value = student[index].ism;
        inputs[1].value = student[index].fam;
        usercha = index;
        ozgardi = true;
    }

    function deletee(index) {
        student.splice(index, 1);
        getMapData();
        localStorage.setItem("key1", JSON.stringify(student));
    }

    function updateGrade(index, selectIndex, value) {
        student[index].grades[selectIndex] = value;
        localStorage.setItem("key1", JSON.stringify(student));
    }

    function getMapData() {
        let html = "";
        const selectHTML = (index, selectIndex) => `
            <select data-index="${index}" data-select-index="${selectIndex}">
                <option value="3" ${student[index].grades[selectIndex] === "3" ? "selected" : ""}>3</option>
                <option value="4" ${student[index].grades[selectIndex] === "4" ? "selected" : ""}>4</option>
                <option value="5" ${student[index].grades[selectIndex] === "5" ? "selected" : ""}>5</option>
            </select>
        `;

        student.forEach((item, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.ism}</td>
                    <td>${item.fam}</td>
                    ${Array.from({ length: 30 }, (_, i) => `<td>${selectHTML(index, i)}</td>`).join("")}
                    <td id="action">
                        <button class="btn2" data-index="${index}">delete</button>
                        <button class="btn3" data-index="${index}">edit</button>
                    </td>
                </tr>
            `;
        });

        routine.innerHTML = html;

        document.querySelectorAll(".btn2").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                deletee(index);
            });
        });

        document.querySelectorAll(".btn3").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                edit(index);
            });
        });

        document.querySelectorAll("select").forEach(select => {
            select.addEventListener("change", (e) => {
                const index = e.target.getAttribute("data-index");
                const selectIndex = e.target.getAttribute("data-select-index");
                const value = e.target.value;
                updateGrade(index, selectIndex, value);
            });
        });
    }

    getMapData();
});
