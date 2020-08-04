// * Modal
const projects = {
  drinkME: {
    title: "drinkME",
    images: ["dm1", "dm2", "dm3"],
    desc:
      "drinkME was the first group project for the UW Full Stack coding bootcamp, which was my first project which I worked with multiple contributers on. I was mostly responsible for the page design, which used Materialize CSS, and I also figured out the Google Maps portion of the site.",
    codebase: "https://github.com/derek-watson14/drinkME",
    deployment: "https://derek-watson14.github.io/drinkME/",
  },
  derDieDas: {
    title: "DerDieDas",
    images: ["ddd1", "ddd2", "ddd3"],
    desc:
      "DerDieDas is the first large web project I ever built, intended to help me learn German. The front end was build with HTML, CSS (no framework) and vanilla JS. The backend (with login) was build with the Python web framework Flask and PostgreSQL for the database layer. Deployed on Heroku.",
    codebase: "https://github.com/derek-watson14/DerDieDas",
    deployment: "https://deutsch-grammatik.herokuapp.com/about",
  },
  hachiKuchi: {
    title: "Hachi Kuchi",
    images: ["hk1", "hk2", "hk3"],
    desc:
      "Hachi Kuchi is the website I made for my friend's artist collective, which was growing pre covid. It was build using React and styled components and is the first and only site I have deployed using GatsbyJS.",
    codebase: "https://github.com/derek-watson14/hachi-kuchi",
    deployment: "https://hachikuchi.com/",
  },
  cs50Homepage: {
    title: "CS50 Homepage",
    images: ["hp1", "hp2", "hp3"],
    desc:
      "This was my first ever HTML & CSS site, which showcased my travel photography. I'm not sure about it's permenant inclusion here, but for now it seems ok.",
    codebase: "https://github.com/derek-watson14/homepage",
    deployment: "https://derek-watson14.github.io/homepage/",
  },
  employeeTracker: {
    title: "Employee Tracker",
    images: ["et1", "et2", "et3"],
    desc:
      "An console based employee tracker which allows a user to manage teams and departments within an organization. Built using Node, SQL and a lot of asyncronous JavaScript.",
    codebase: "https://github.com/derek-watson14/EmployeeTracker",
    deployment: "",
  },
  flipIt: {
    title: "Flip It - Flashcard Study App",
    images: ["fi1", "fi2", "fi3", "fi4"],
    desc:
      "FlipIt is a flashcard study aplication I built with a team of three others from my Uw course. It allows users to create an account, create decks of flashcards, search for decks made by other users and study the cards within the decks. Created with Node.js, Express, jQuery, mySQL and Sequelize, among other technologies.",
    codebase: "https://github.com/AychDubya/Flipit",
    deployment: "https://flipitstudy.herokuapp.com/study/1",
  },
};

const modal = document.querySelector("#project-modal");

$("#project-modal").on("show.bs.modal", function (event) {
  const button = $(event.relatedTarget);
  const project = button.data("project");
  const { title, images, desc, codebase, deployment } = projects[project];
  const modal = $(this);

  modal.find(".modal-title").text(title);
  modal.find("#modal-description").text(desc);
  modal.find("#modal-codebase").attr("href", codebase);
  if (!deployment) {
    modal.find("#modal-deployment").parent().hide();
  } else {
    modal.find("#modal-deployment").parent().show();
    modal.find("#modal-deployment").attr("href", deployment);
  }
  const imgContainer = modal.find("#modal-img-container");

  imgContainer.empty();
  images.forEach((image, index) => {
    console.log(image);
    imgContainer.append(`
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img
          src="./project-imgs/${image}.png"
          class="d-block w-100"
          alt="Project screenshot"
          loading="lazy"
        />
      </div>
    `);
  });
});
