// * Card Header Animation
var textWrapper = document.querySelector(".ml11 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /([^\x00-\x80]|\w)/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: false })
  .add({
    // Grow horizontal line left side
    targets: ".ml11 .line",
    scaleY: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 400,
  })
  .add({
    // Move line across letter area
    targets: ".ml11 .line",
    translateX: [0, textWrapper.getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
  })
  .add({
    // Fade in letters
    targets: ".ml11 .letter",
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 300,
    offset: "-=775",
    delay: (el, i) => 34 * (i + 1),
  })
  .add({
    // Remove line
    targets: ".line",
    opacity: 0,
    duration: 250,
    easing: "easeOutExpo",
  });
