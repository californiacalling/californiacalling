import { CountUp } from "countup.js";
import { TweenLite, TweenMax, TimelineMax, TimelineLite } from "gsap";
import { SplitText } from "./vendors/SplitText";
// import { ScrollMagic } from './vendors/ScrollMagic.min.js';

$(document).ready(function(){
  var controller = new ScrollMagic.Controller();

  // word animations
  var california = new SplitText("#ca", {type: "words,chars", position: "absolute"});
  var calling = new SplitText("#call", {type: "words,chars", position: "absolute"});

  var caLength = california.chars.length - 1;
  var callLength = calling.chars.length + 1;

  var caPos =
    $(window).width() >= 992
      ? $("#ca").width() / 2 + california.chars[0].offsetWidth / 2
      : $("#ca").width() / 2 - california.chars[0].offsetWidth / 2;
  var callPos =
    $(window).width() >= 992
      ? $("#call").width() / 2 + calling.chars[0].offsetWidth / 2
      : $("#call").width() / 2 - calling.chars[0].offsetWidth / 2 ;


  var caWidth = california.chars[0].offsetWidth + caLength;
  var callWidth = calling.chars[0].offsetWidth + callLength;

  var caliWidth = $(window).width() >= 992 ? caWidth : 0;
  var callingWidth = $(window).width() >= 992 ? callWidth : 0;

  var cHeight = $("#ca").height() / 2;

  var tl = new TimelineLite;

  TweenLite.set(california.chars, {top: cHeight,autoAlpha: 0,filter: "blur(5px)"});
  TweenLite.set(calling.chars, {top: -cHeight,autoAlpha: 0,filter: "blur(5px)"});
  TweenLite.set(california.words, {  marginLeft: caPos});
  TweenLite.set(calling.words, {marginLeft: callPos});
  TweenLite.set("#ele", {autoAlpha: 0});
  TweenLite.set("#sfdw", {autoAlpha: 0});
  TweenLite.set($('.line'), {autoAlpha: 0, marginTop: '-50vh'});
  TweenLite.set($('.hero-footer'), {autoAlpha: 0, marginTop: '1%'});

  tl.staggerTo([california.chars[0], calling.chars[0]], 1, {autoAlpha: 1, filter: "blur(0px)", delay: 2}, 0, 0)
    .staggerTo([california.chars, calling.chars], 1, {top: 0}, 0, 3)
    .staggerTo(california.words, 1, {marginLeft: caliWidth, ease: Power1.easeInOut}, 0, 4, caliDone)
    .staggerTo(calling.words, 1, {marginLeft: callingWidth, ease: Power1.easeInOut}, 0, 4, callDone)
    .staggerTo(california.chars, 1, {autoAlpha: 1, filter: "blur(0px)", ease: Power1.easeInOut}, 0.05, 4)
    .staggerTo(calling.chars, 1, {autoAlpha: 1, filter: "blur(0px)", ease: Power1.easeInOut}, 0.05, 4)
    .to($('.line'), 0.5, {autoAlpha: 1, marginTop: 0, ease: Power1.easeInOut})
    .staggerTo("#ele", 1, {autoAlpha: 1, ease: Power1.easeInOut}, 0, 6)
    .staggerTo("#sfdw", 1, {autoAlpha: 1, ease: Power1.easeInOut}, 0, 6.5)
    .to($('.hero-footer'), 1, {autoAlpha: 1, marginTop: 0, ease: Power1.easeInOut, delay: '9s'});


    function caliDone() {
        california.revert();
        $("#ca").removeAttr("style");
    }

    function callDone() {
        calling.revert();
        $("#call").removeAttr("style");
    }

  tl.restart();

  var storyCopy = new SplitText("#story", {type: "words,lines"});

  var newtl= new TimelineLite;

  TweenLite.set(storyCopy.lines, {autoAlpha: 0, marginTop: '1%'});

  newtl.staggerTo(storyCopy.lines,3,{ marginTop: 0, autoAlpha: 1},0.3, endStory);

    function endStory() {
      storyCopy.revert();
      $('.story-copy').removeAttr('style');
    }

  var scene = new ScrollMagic.Scene({triggerElement: "#story-wrap"}).setTween(newtl).addTo(controller);

  var mapTween = new TimelineLite().add([
    TweenMax.fromTo("#map", 1, {marginTop: '15vw'}, {marginTop: '-10vw', ease: Linear.easeNone}),
    TweenMax.fromTo("#legend", 1, {marginTop: '20vw'}, {marginTop: '-15vw', ease: Linear.easeNone})
  ]);

  var mapScene = new ScrollMagic.Scene({triggerElement: "#story", duration: 1500})
  .setTween(mapTween)
  .addTo(controller);

if ($(window).width() >= 769) {
  var actionTween = new TimelineLite().add([
    TweenMax.fromTo("#action1", 1, {marginTop: '-5vw'}, {marginTop: '-15vw', ease: Linear.easeNone}),
    TweenMax.fromTo("#action2", 1, {marginTop: '15vw'}, {marginTop: '-20vw', ease: Linear.easeNone}),
    TweenMax.fromTo("#action3", 1, {marginTop: '-2.5vw'}, {marginTop: '-10vw', ease: Linear.easeNone}),
    TweenMax.fromTo("#action4", 1, {marginTop: '0vw'}, {marginTop: '-5vw', ease: Linear.easeNone}),
    TweenMax.fromTo("#action5", 1, {marginTop: '3vw'}, {marginTop: '-11vw', ease: Linear.easeNone}),
    TweenMax.fromTo("#action6", 1, {marginTop: '-12vw'}, {marginTop: '-19vw', ease: Linear.easeNone}),
    TweenMax.fromTo("#action7", 1, {marginBottom: '-3.5vw'}, {marginTop: '-9vw', ease: Linear.easeNone}),
  ]);

  var actionScene = new ScrollMagic.Scene({triggerElement: "#damage-num", duration: 2000})
  .setTween(actionTween)
  .addTo(controller);
}

// bear carousels
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

  var foot = new SplitText("#foot-copy", { type: "words,lines" });

  TweenLite.set(foot.lines, {autoAlpha: 0, marginTop: '1%'})
  TweenLite.set('#party', {autoAlpha: 0, marginTop: '1%'})

  var foottl = new TimelineLite;

  foottl.to(party, 1, {autoAlpha: 1, marginTop: 0, ease: Power1.easeInOut}, 0.25)
        .staggerTo(foot.lines, 1.5, {autoAlpha: 1, marginTop: 0, ease: Power1.easeInOut}, 0.5, 0, footDone)
        .to('#foot-button', 0.25, {autoAlpha: 1})

  function footDone() {
    foot.revert();
  }

  var footScene = new ScrollMagic.Scene({triggerElement: "#footer", reverse: false})
  .setTween(foottl)
  .addTo(controller);

  // map animations
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

  // CountUp numbers
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

    // scroll behavior
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
      // date-banner animation
    var ticker = $(".date-banner");
    var list = $(".date-list");
    var clone = list.clone(true);

    ticker.append(clone);
  }
);