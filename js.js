const openn = document.querySelector("#open");
const form = document.querySelector("form");
const routine = document.querySelector(".routine");

openn.addEventListener("click", () => {
  form.style.transform = "translateY(250px)";
});

const close = () => {
  form.style.transform = "translateY(-350px)";
};

const students = JSON.parse(localStorage.getItem("key")) || [];
let usercha = "";
let ozgardi = false;

function addstudent(event) {
  event.preventDefault();
  const ism = event.target[0].value;
  const fam = event.target[1].value;
  const tel = event.target[2].value;
  const fee = event.target[3].value;
  const date = event.target[4].value;
  const obj = {
    ism: ism,
    fam: fam,
    tel: tel,
    fee: fee,
    date: date,
  };

  if (ozgardi === true) {
    students[usercha] = obj;
    ozgardi = false;
  } else {
    students.push(obj);
  }

  event.target[0].value = "";
  event.target[1].value = "";
  event.target[2].value = "";
  event.target[3].value = "";
  event.target[4].value = "";
  localStorage.setItem("key", JSON.stringify(students));
  close();
  getmapdata();
}

function edit(index) {
  form.style.transform = "translateY(250px)";

  const inputs = form.querySelectorAll("input");
  inputs[0].value = students[index].ism;
  inputs[1].value = students[index].fam;
  inputs[2].value = students[index].tel;
  inputs[3].value = students[index].fee;
  inputs[4].value = students[index].date;

  usercha = index;
  ozgardi = true;
}

function loadStudentData(index) {
  form.style.transform = "translateY(250px)";

  const inputs = form.querySelectorAll("input");
  inputs[0].value = students[index].ism;
  inputs[1].value = students[index].fam;
  inputs[2].value = students[index].tel;
  inputs[3].value = students[index].fee;
  inputs[4].value = students[index].date;

  usercha = index;
  ozgardi = true;
}

function deletee(index) {
  students.splice(index, 1);
  getmapdata();
  localStorage.setItem("key", JSON.stringify(students));
}

getmapdata();

function getmapdata() {
  let html = "";

  students.map((item, index) => {
    html += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.ism}</td>
                <td>${item.fam}</td>
                <td>${item.tel}</td>
                <td>${item.fee}</td>
                <td>${item.date}</td>
                <td id="action">
                    <button onclick="deletee(${index})" class="btn2">delete</button>
                    <button onclick="edit(${index})" class="btn3">edit</button>
                </td>
            </tr>
        `;
  });

  routine.innerHTML = html;
}
