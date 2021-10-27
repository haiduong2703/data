var listcouresBlock = document.querySelector("#list-courses");
var courseAPI = "http://localhost:3000/courses";

function start() {
  getCourses(renderCourses);
  handleCreatForm();
}
start();

function getCourses(callback) {
  fetch(courseAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderCourses(courses) {
  var listCoursesBlock = document.querySelector("#list-courses");
  var html = courses.map(function (course) {
    return `
        <li class="course-item-${course.id}">
        <h4 class="course-name-${course.id}">${course.name}</h4>
        <p class="course-description-${course.id}">${course.description}</p>
        <button onclick="HandleDeleteCourse(${course.id})">Xoá</button>
        <button onclick="HandleUpdateCourse(${course.id})">Sửa</button>
        </li>
        `;
  });
  listCoursesBlock.innerHTML = html.join("");
}

function creatCourses(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(courseAPI, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function HandleDeleteCourse(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(courseAPI + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      var liItem = querySelector(".course-item-" + id);
      if (liItem) {
        liItem.remove();
      }
    });
}

function handleCreatForm() {
  var creatbtn = document.querySelector("button");
  creatbtn.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('input[name="description"]').value;
    var formData = {
      name: name,
      description: description,
    };
    creatCourses(formData, function () {
      getCourses(renderCourses);
    });
  };
}
function HandleUpdateCourse(id) {
  var creat = document.querySelector("#creat");
  var name = document.querySelector(".course-name-" + id).innerText;
  var description = document.querySelector(
    ".course-description-" + id
  ).innerText;
  var inputName = (document.querySelector('input[name="name"]').value = name);
  var descriptionInput = (document.querySelector(
    'input[name="description"]'
  ).value = description);
  creat.innerHTML = "Update";
  // getCourses(function (course) {
  //   var thisCourse = course.find(function () {
  //     return course.id == id;
  //   });
  //   inputName.value = thisCourse.name;
  //   description.value = thisCourse.description;
  creat.onclick = function () {
    newName = document.querySelector('input[name="name"]').value;
    newDescription = document.querySelector('input[name="description"]').value;
    update = {
      name: newName,
      description: newDescription,
    };
    UpdateCourse(id, update, function () {
      getCourses(renderCourses);
    });
  };
}
function UpdateCourse(id, data, callback) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(courseAPI + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
