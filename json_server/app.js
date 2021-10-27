var jsonAPI = "http://localhost:3000/courses";
fetch(jsonAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (courses) {
    var htmls = "";
    var html = courses.map(function (course) {
      return `
      <img src='${course.image}'/>
      <h1>${course.name}</h1><br>
      <p>${course.description}</p>
      `;
    });
    htmls += html.join("");
    document.getElementById("demo").innerHTML = htmls;
  });
