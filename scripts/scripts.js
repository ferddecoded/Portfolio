let portfolio = {};

portfolio.scroll = new SmoothScroll('a[href*="#"]', {
  // Selectors
  ignore: "[data-scroll-ignore]", // Selector for links to ignore (must be a valid CSS selector)
  header: null, // Selector for fixed headers (must be a valid CSS selector)

  // Speed & Easing
  speed: 500, // Integer. How fast to complete the scroll in milliseconds
  offset: 150 // Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
});

// MATRIX BACKGROUND BEGINS
portfolio.buildMatrix = function() {
  canvas = document.getElementById("matrix");
  matrix = canvas.getContext("2d");
  //making the canvas full screen
  // THERE HAS TO BE A BETTER WAY TO SIZE THIS AND MAKE IT RESIZE UPON RESIZING THE BROWSER...
//   canvas.height = 1.5 * window.innerHeight;
//   canvas.width = window.innerWidth;
      canvas.height = 730;
      canvas.width = window.innerWidth;
  numbers = "1234567890";
  //converting the string into an array of single characters
  numbers = numbers.split("");
  font_size = 20;
  columns = canvas.width / font_size; //number of columns for the rain
  //an array of drops - one per column
  drops = [];
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for (let x = 0; x < columns; x++) drops[x] = 1;
  // drawing the characters
  portfolio.draw = function() {
    //translucent BG to show trail
   //  matrix.fillStyle = "rgba(220,220,220,.05)";
    matrix.fillStyle = "rgba(105, 105, 105, 0.05)";
    matrix.fillRect(0, 0, canvas.width, canvas.height);
    matrix.fillStyle = "rgba(220, 220, 220, 1)"; //white text
    matrix.font = font_size + "px arial";
    //looping over drops
    for (let i = 0; i < drops.length; i++) {
      //a random chinese character to print
      text = numbers[Math.floor(Math.random() * numbers.length)];
      //x = i*font_size, y = value of drops[i]*font_size
      matrix.fillText(text, i * font_size, drops[i] * font_size);
      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
        drops[i] = 0;
      //incrementing Y coordinate
      drops[i]++;
    }
  };
  portfolio.matrixInterval = setInterval(portfolio.draw, 33);
};
// MATRIX BACKGROUND ENDS

portfolio.TopMenuScroll = function() {
   var lastId,
     topMenu = $("#top-menu"),
     topMenuHeight = topMenu.outerHeight() + 15,
     // All list items
     menuItems = topMenu.find("a"),
     // Anchors corresponding to menu items
     scrollItems = menuItems.map(function() {
       var item = $($(this).attr("href"));
       if (item.length) {
         return item;
       }
     });

   // Bind click handler to menu items
   // so we can get a fancy scroll animation
   menuItems.click(function(e) {
     var href = $(this).attr("href"),
       offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
     $("html, body")
       .stop()
       .animate({ scrollTop: offsetTop }, 300);
     e.preventDefault();
   });

   // Bind to scroll
   $(window).scroll(function() {
     // Get container scroll position
     var fromTop = $(this).scrollTop() + topMenuHeight;

     // Get id of current scroll item
     var cur = scrollItems.map(function() {
       if ($(this).offset().top < fromTop) return this;
     });
     // Get the id of the current element
     cur = cur[cur.length - 1];
     var id = cur && cur.length ? cur[0].id : "";

     if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent()
         .removeClass("active")
         .end()
         .filter("[href='#" + id + "']")
         .parent()
         .addClass("active");
     }
   });
}


portfolio.init = function() {
  portfolio.buildMatrix();
  AOS.init();
  portfolio.TopMenuScroll();
//   portflio.smoothScroll();
};

$(function() {
   portfolio.init();
   // the screen has not been resized initially, aso set that state to false
   let recentlyResized = false;
   $(window).on('resize', function() {
      // on first resize, initialize the redrawing of the canvas, then set recently resized to true
      if (!recentlyResized) {
         clearInterval(portfolio.matrixInterval);
         portfolio.buildMatrix();
         recentlyResized = true;
         // Is essentially a flag to not redraw the canvas again if within 50 milliseconds
         setTimeout(function () {
               recentlyResized = false;
         }, 50);
      }
   })
});

