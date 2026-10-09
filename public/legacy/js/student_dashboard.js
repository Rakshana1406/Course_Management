document.addEventListener("DOMContentLoaded", () => {
    const studentData = JSON.parse(localStorage.getItem("loggedInStudent")) || { name: "Student" };
    const welcomeMsg = document.getElementById("welcomeMsg");
    if (welcomeMsg) {
        welcomeMsg.innerText = `Welcome, ${studentData.name || "Student"}!`;
    }

    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    const completedCourses = JSON.parse(localStorage.getItem("completedCourses")) || [];

    const enrolledCount = document.getElementById("enrolledCount");
    const completedCount = document.getElementById("completedCount");

    if (enrolledCount) enrolledCount.innerText = enrolledCourses.length;
    if (completedCount) completedCount.innerText = completedCourses.length;
});