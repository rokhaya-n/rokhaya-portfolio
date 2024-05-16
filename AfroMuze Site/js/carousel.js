let slideIndex = 1;
showSlides(slideIndex);

//forward backwards
function plusSlides(n) {
  showSlides(slideIndex += n);
}

//to control actual slides
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//the actual slides function
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("zineSpreads");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}