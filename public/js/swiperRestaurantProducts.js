window.addEventListener('load', () => {
    if(window.innerWidth < 768){
        var swiper = new Swiper(".platos", {
            slidesPerView: 1,
            spaceBetween: 10,
            hashNavigation: {
              watchState: true,
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
    } else if (window.innerWidth < 1440) {
       var swiper = new Swiper(".platos", {
            slidesPerView: 3,
            spaceBetween: 10,
            hashNavigation: {
              watchState: true,
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          }); 
    } else {
       var swiper = new Swiper(".platos", {
            slidesPerView: 5,
            spaceBetween: 10,
            hashNavigation: {
              watchState: true,
            },
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          }); 
    }
})