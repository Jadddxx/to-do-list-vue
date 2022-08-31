const myTasks = document.querySelector(`.nav-link[data-nav="0"]`);
const inProgress = document.querySelector(`.nav-link[data-nav="1"]`);
const completed = document.querySelector(`.nav-link[data-nav="2"]`);
const navLinks = document.querySelectorAll(".nav-link");

// 把每個都移除
// 然後再加上有被選到的class
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", function (e) {
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

completed.addEventListener("click", function (e) {});
