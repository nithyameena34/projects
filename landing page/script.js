const swiper = new Swiper('.bannerswiper', {
    spaceBetween:0,
    effect:"fade",

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      cickable:true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });