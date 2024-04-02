document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed.");

  let slideIndex = 1;
  let slideInterval;

  showSlides(slideIndex);
  autoSlides();

  function plusSlides(n) {
    console.log("plusSlides function called with n =", n);
    clearInterval(slideInterval);
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    console.log("currentSlide function called with n =", n);
    clearInterval(slideInterval);
    showSlides((slideIndex = n));
  }

  function pauseSlides() {
    console.log("Slides paused.");
    clearInterval(slideInterval);
  }

  function resumeSlides() {
    console.log("Slides resumed.");
    autoSlides();
  }

  function showSlides(n) {
    console.log("showSlides function called with n =", n);
    let i;
    const slides = document.getElementsByClassName("myslide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].style.backgroundColor = ""; // Reset background color for all dots
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].style.backgroundColor = "mistyrose";

    autoSlides();
  }

  function autoSlides() {
    console.log("autoSlides function called.");
    clearInterval(slideInterval);
    slideInterval = setInterval(function () {
      plusSlides(1);
    }, 5000);
  }

  const prevBtn = document.querySelector(".previous");
  const nextBtn = document.querySelector(".next");
  const dots = document.querySelectorAll(".dot");

  prevBtn.addEventListener("click", function () {
    console.log("Previous button clicked.");
    plusSlides(-1);
  });

  nextBtn.addEventListener("click", function () {
    console.log("Next button clicked.");
    plusSlides(1);
  });

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      console.log("Dot clicked.");
      currentSlide(index + 1);
    });
  });
});
