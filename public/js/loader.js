function loader () {
  document.querySelector('.loader-container').classList.add('fade-out');
}
function FadeOut () {
  setInterval(loader, 1000);
}

window.onload = FadeOut;