import { CountUp } from "countup.js";

$(document).ready(function(){
    $(".bears-carousel").slick({
      arrows: true,
      prevArrow: '<svg class="slick-prev" viewBox="0 0 61 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Group 5 Copy 2</title><desc>Created with Sketch.</desc><g id="2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="CC-v6-Desktop" transform="translate(-1329.000000, -5952.000000)" fill="#FFFFFF"><g id="Shirts" transform="translate(0.000000, 5232.000000)"><g id="Group-5-Copy-2" transform="translate(1329.000000, 720.000000)"><g id="Group-3"><rect id="Rectangle" x="0" y="25.2460385" width="60.8780488" height="1.77560976"></rect><polygon id="Rectangle" transform="translate(13.294013, 13.570732) rotate(-315.000000) translate(-13.294013, -13.570732) " points="12.4770836 -4.25624103 14.2601539 -4.26370158 14.110943 31.3977044 12.3278727 31.405165"></polygon><polygon id="Rectangle-Copy-2" transform="translate(13.294013, 38.429268) scale(1, -1) rotate(-315.000000) translate(-13.294013, -38.429268) " points="12.4770836 20.6022956 14.2601539 20.594835 14.110943 56.256241 12.3278727 56.2637016"></polygon></g></g></g></g></g></svg>',
      nextArrow: '<svg class="slick-next" viewBox="0 0 61 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Group 5</title><desc>Created with Sketch.</desc><g id="2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="CC-v6-Desktop" transform="translate(-1406.000000, -5952.000000)" fill="#FFFFFF"><g id="Shirts" transform="translate(0.000000, 5232.000000)"><g id="Group-5" transform="translate(1436.439024, 746.000000) scale(-1, 1) translate(-1436.439024, -746.000000) translate(1406.000000, 720.000000)"><g id="Group-3"><rect id="Rectangle" x="0" y="25.2460385" width="60.8780488" height="1.77560976"></rect><polygon id="Rectangle" transform="translate(13.294013, 13.570732) rotate(-315.000000) translate(-13.294013, -13.570732) " points="12.4770836 -4.25624103 14.2601539 -4.26370158 14.110943 31.3977044 12.3278727 31.405165"></polygon><polygon id="Rectangle-Copy-2" transform="translate(13.294013, 38.429268) scale(1, -1) rotate(-315.000000) translate(-13.294013, -38.429268) " points="12.4770836 20.6022956 14.2601539 20.594835 14.110943 56.256241 12.3278727 56.2637016"></polygon></g></g></g></g></g></svg>',
      respondTo: "window",
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            slidesToShow: 1
          }
        }
      ]
    });

    const wildfires = $('.wildfire');
    const offices = $('.office');

    function shuffle(arr) {
      var currIdx = arr.length,
        tempVal,
        randIdx;

      while (0 !== currIdx) {
        randIdx = Math.floor(Math.random() * currIdx);
        currIdx -= 1;

        tempVal = arr[currIdx];
        arr[currIdx] = arr[randIdx];
        arr[randIdx] = tempVal;
      }

      return arr;
    }

    function staggerIn(array) {
        var newArray = shuffle(array);
        for (let i = 0; i < newArray.length; i++) {
            let action = newArray[i];
            setTimeout(function() {
            if (!action.classList.contains("animate-in")) {
                action.classList = action.className + " animate-in";
            }
            }, i * 200);
        }
    }

    function showFires() {
        staggerIn(offices);
        staggerIn(wildfires);
    }

    var ranges = [
      { divider: 1000000000, suffix: "B" },
      { divider: 1000000, suffix: "M" }
    ];

    var options = {
      duration: 4,
      useEasing: true,
      useGrouping: true,
      separator: ",",
      decimal: ".",
      formattingFn: n => {
        for (var i = 0; i < ranges.length; i++) {
          if (n >= ranges[i].divider) {
            return (Math.round(n / ranges[i].divider)).toString() + ranges[i].suffix;
          }
        }
        return n.toString();
      }
    };

    // date-banner animation
    var ticker = $(".date-banner");
    var list = $(".date-list");
    var clone = list.clone(true);

    ticker.append(clone);

    window.onscroll = function() {
      if ($(window).scrollTop() >= ($('.story').offset().top - 50) && ($(window).scrollTop() <= ($('.foot-content').offset().top - 400))){
        $('.cta').css({marginBottom: 0, transition: '0.5s'})
      } else {
        $(".cta").css({ marginBottom: -($('.cta').height()+1), transition: '0.5s'});
      }

      if ($(window).scrollTop() >= ($('.map-wrap').offset().top - 50)) {
          showFires();

          if ($('#fire-num').text() === '0' && $('#damage-num').text() === '0' && $('#burn-num').text() === '0') {
              var fireNum = new CountUp('fire-num', 8527, 2.5);
              fireNum.start();
              var damageNum = new CountUp('damage-num', 12000000000, options)
              damageNum.start();
              var burnNum = new CountUp('burn-num', 1893913, 2.5);
              burnNum.start();
          }
      };
    }
  }
);