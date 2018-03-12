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
  setInterval(portfolio.draw, 33);
};
// MATRIX BACKGROUND ENDS


portfolio.init = function() {
  portfolio.buildMatrix();
//   portflio.smoothScroll();
};

$(function() {
  portfolio.init();
   var s = $("#sticker");
   var pos = s.position();
   $(window).scroll(function () {
         var windowpos = $(window).scrollTop();
         if (windowpos > pos.top) {
            s.addClass("stick");
         } else {
            s.removeClass("stick");
         }
   });
});

