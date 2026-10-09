document.addEventListener("DOMContentLoaded", () => {
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const totalCourses = document.getElementById("totalCourses");
    const totalStudents = document.getElementById("totalStudents");

    if (totalCourses) totalCourses.innerText = courses.length;
    if (totalStudents) totalStudents.innerText = students.length;
});