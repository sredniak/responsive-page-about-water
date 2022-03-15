//                                                    ###
//    ###   ## ##   ###                                ##
//   ## ##  ## ##  ## ##                               ##
//   ##     ## ##  ##            # ###   ###   ####    ##     ####   ####   ###
//    ###   ## ##  #####         ###    ## ##  ## ##   ##    ## ##  ##     ## ##
//      ##  ## ##  ## ##         ##     #####  ## ##   ##    ## ##  ##     #####
//   ## ##   ###   ## ##         ##     ##     ## ##   ##    ## ##  ##     ##
//    ###     #     ####         ##      ###   ####   ####    ## #   ####   ###
//                                             ##
//                                             ##
jQuery('img.svg').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');
        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
        // Replace image with new SVG
        $img.replaceWith($svg);
    }, 'xml');
});


//
//     ###    ###    ###   ## ##  ####   #####
//    ## ##  ## ##  ## ##  ## ##   ##    ##
//    ##     ## ##  ## ##  ####    ##    ##
//    ##     ## ##  ## ##  ###     ##    ####
//    ##     ## ##  ## ##  ####    ##    ##
//    ## ##  ## ##  ## ##  ## ##   ##    ##
//     ###    ###    ###   ## ##  ####   #####
//
//

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}


//
//   ## ##  #####  ##     ####   #####  ####    ###
//   ## ##  ##     ##     ## ##  ##     ## ##  ## ##
//   ## ##  ##     ##     ## ##  ##     ## ##  ##
//   #####  ####   ##     ####   ####   ####    ###
//   ## ##  ##     ##     ##     ##     ###       ##
//   ## ##  ##     ##     ##     ##     ####   ## ##
//   ## ##  #####  #####  ##     #####  ## ##   ###
//
//
jQuery(document).ready(function($) {
    //obrysowuje wszystkie elementu html
    var DEBUG = true;
        // szuka pozycji elementu
        function getOffset(el) {
          var rect = el.getBoundingClientRect();
          return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
          };
        }

    if (DEBUG) {
        var p = '<div id="czujnik" style="position:fixed; left:0; bottom:0; font-size:10px; background:white;"><input id="colors" type="checkbox"/> <span id="debug-width" ></span>x<span id="debug-height" ></span><br></div>';
        $('body').append(p);
        //wyświetla szerokość i wysokość okna
        $(window).resize(function() {
            $('#debug-height').html($(window).height());
            $('#debug-width').html($(window).width());
        }).resize();

        var ciacho = getCookie('obrysuj');
        if (ciacho == "tak") {
            $('input#colors').prop('checked', true);
        }

        var obrysuj = function() {
            if ($('input#colors').is(':checked')) {
                $('body *').each(function(index) {
                    var colors = ['red', 'blue', 'black', 'green', 'pink', 'orange', 'brown'];
                    var random_color = colors[Math.floor(Math.random() * colors.length)];
                    var box_shadow = '0 0 0 1px ' + random_color + ' ';
                    var tag_name = $(this).prop("tagName");
                    var class_name = $(this).attr("class");
                    var el_position = getOffset(this);

                    if ($(this).css('-webkit-box-shadow') == 'none') {
                        $(this).css('-webkit-box-shadow', box_shadow);
                          console.log("pozycja");
                    console.log(el_position);
                    console.log(el_position.top);
                         // to z pozycją ale jakos nie działa $(this).append('<div id="helper_tag_name" style="display: none; background:'+random_color+'; content:\''+ tag_name +'\'; position: absolute; top:'+el_position.top+'px; left:'+el_position.left+'px; color:white; font-size:9px; font-family: monospace; z-index:2222;">'+tag_name+'.'+class_name+'</div>');
                         $(this).append('<div id="helper_tag_name" style="display: none; background:'+random_color+'; content:\''+ tag_name +'\'; position: absolute; color:white; font-size:9px; font-family: monospace; z-index:2222;">'+tag_name+'.'+class_name+'</div>');
                         $(this).hover(function(){
                               
                                $(this).children('#helper_tag_name').css("display", "block");
                    
                                }, function(){
                                $(this).children('#helper_tag_name').css("display", "none");
                            });
                    }
                });
            } else {
                $('body *').each(function() {
                    $(this).remove('#helper_tag_name');
                    if ($(this).css('-webkit-box-shadow') !== 'none') {
                        $(this).css('-webkit-box-shadow', '');
                    }
                });
            }
        };
        obrysuj();

//    dodanie nazw klas
     // div{
//   position:relative;
// }
// div::after {
//     position: absolute;
//     background: black;
//     color: #fff;
//     top: 0;
//     left: 0;
//     content: 'cos';
// }

        //orbysowuje randomowym kolorem i trzyma w ciastku
        $('input#colors').change(function() {
            obrysuj();
            if ($('input#colors').is(':checked')) {

                setCookie('obrysuj', 'tak', 365);
            } else {
                setCookie('obrysuj', 'nie', 365);

            }

        });

    }
    // adds ios class to html tag
    var deviceAgent = navigator.userAgent.toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
    if (agentID) {
        $('html').addClass('ios');
    }
    //adds touch-screen to html if device
    if (Modernizr.touch) {
        $('html').addClass('touch-screen');
    } else {
        $('html').addClass('no-touch-screen');
    }
}); //end ready


//
//        #     ###    ###           ###   ## ##  ####    ###   ##     ##     ####
//       ###   ## ##  ## ##         ## ##  ## ##  ## ##  ## ##  ##     ##     ## ##
//      ## ##  ## ##  ##            ##     ####   ## ##  ## ##  ##     ##     ## ##
//      ## ##  ## ##   ###           ###   ###    ####   ## ##  ##     ##     ####
//      #####  ## ##     ##            ##  ####   ###    ## ##  ##     ##     ###
//      ## ##  ## ##  ## ##         ## ##  ## ##  ####   ## ##  ##     ##     ####
//      ## ##   ###    ###           ###   ## ##  ## ##   ###   #####  #####  ## ##
//
//
        AOS.init();

         skrollr.init({          
            mobileCheck: function() {
                //hack - forces mobile version to be off
                return false;
            }
        });

//
//        #    #  ##  ####   #   #    #     ###     ###  #####
//       ###   ## ##   ##    ## ##   ###   ## ##     ##  ##
//      ## ##  #####   ##    #####  ## ##  ##        ##  ##
//      ## ##  #####   ##    #####  ## ##  ##        ##  ####
//      #####  #####   ##    #####  #####  ##     ## ##  ##
//      ## ##  ## ##   ##    ## ##  ## ##  ## ##  ## ##  ##
//      ## ##  ##  #  ####   ## ##  ## ##   ###    ###   #####
//
//

$(function () {
  

 
  $("*[class*='animacja-']").addClass('niewidoczny'); 
    
    
  inView('.czy-widoczny')
    .on('enter', function(el){
     console.log("enter");
    $(el).addClass('widoczny').removeClass('niewidoczny');
  })
    .on('exit', function(el){
       console.log("leave");
      $(el).addClass('niewidoczny').removeClass('widoczny');
    });
    

  split_class = function(el){
    classes = $(el).attr('class').split(' ');
    for (var i = 0; i < classes.length; i++) {
      var matches = /.*animacja\-(.+)/.exec(classes[i]);
      console.log(matches);
      if (matches != null) {
        var fxclass = matches[1];
          console.log(fxclass);
          return matches;
      }
    }
  }
  
  split_class($("*[class*='animacja-']"))
 
});


$(document).ready(function(){
  inView('.animacja1')
    .on('enter', function(el){
     console.log("enteranimacja");
              var src = $(el).attr("src");
          $(el).attr("src", src.replace(/\.png$/i, ".gif"));

  })
    .on('exit', function(el){
       console.log("leaveanimacja");
     var src = $(el).attr("src");
          $(el).attr("src", src.replace(/\.gif$/i, ".png"));
      
    }); 
});


/*********
 O D L I C Z A N I E
 **/


// ************ 1
var countDownDate = new Date("Jan 5, 2025 15:37:25").getTime();

function timePart(val,text,color="black"){
  return `${val} ${text}`
}

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;
 var seconds = Math.floor(distance / 1000);

 // Display the result in the element with id="demo"

 let res = timePart(seconds,'','white');
document.getElementById("countdown").innerHTML = res

  // If the count down is finished, write some text 
 if (distance < 0) {
    clearInterval(x);

document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);
  
  // ********** 2
var countDownDate2= new Date("Jan 5, 2030 15:37:25").getTime();

function timePart2(val,text,color="black"){
  return `${val} ${text}`
}

// Update the count down every 1 second
var x2 = setInterval(function() {

  // Get todays date and time
  var now2 = new Date().getTime();


  // Find the distance between now and the count down date
  var distance2 = countDownDate2 - now2;
 var seconds2 = Math.floor(distance2 / 1000);

 // Display the result in the element with id="demo"

 let res2 = timePart2(seconds2,'','white');
document.getElementById("countdown2").innerHTML = res2

  // If the count down is finished, write some text 
 if (distance2 < 0) {
    clearInterval(x2);

document.getElementById("countdown2").innerHTML = "EXPIRED";
  }
}, 1000);
  
    // ********** 3
var countDownDate3 = new Date("Jan 5, 2050 15:37:25").getTime();

function timePart3(val,text,color="black"){
  return `${val} ${text}`
}

// Update the count down every 1 second
var x3 = setInterval(function() {


  // Get todays date and time
  var now3 = new Date().getTime();

  // Find the distance between now and the count down date
  var distance3 = countDownDate3 - now3;
 var seconds3 = Math.floor(distance3 / 1000);

 // Display the result in the element with id="demo"

 let res3 = timePart3(seconds3,'','white');
document.getElementById("countdown3").innerHTML = res3

  // If the count down is finished, write some text 
 if (distance3 < 0) {
    clearInterval(x3);

document.getElementById("countdown3").innerHTML = "EXPIRED";
  }
}, 1000);



// CALCULATOR
function DodajHamburger(){
  var suma = document.getElementById("suma").innerHTML;
  suma = Number(suma);
  suma = suma + 2500 ;
  
  var liczbaHamburger = document.getElementById("liczba-hamburger").innerHTML;
  liczbaHamburger = Number(liczbaHamburger);
  liczbaHamburger++;
  document.getElementById("liczba-hamburger").innerHTML = liczbaHamburger;
  
  document.getElementById("suma").innerHTML = suma;
}


function MinusHamburger(){
  var suma = document.getElementById("suma").innerHTML;
  suma = Number(suma);
  suma = suma - 2500;
  
  var liczbaHamburger = document.getElementById("liczba-hamburger").innerHTML;
  liczbaHamburger = Number(liczbaHamburger);
  liczbaHamburger--;
  document.getElementById("liczba-hamburger").innerHTML = liczbaHamburger;

  document.getElementById("suma").innerHTML = suma;
}


function DodajKurczak(){
  var suma = document.getElementById("suma").innerHTML;
  suma = Number(suma);
  suma = suma + 3000;
  
  var liczbaKurczak = document.getElementById("liczba-kurczak").innerHTML;
  liczbaKurczak = Number(liczbaKurczak);
  liczbaKurczak++;
  document.getElementById("liczba-kurczak").innerHTML = liczbaKurczak;
  
  document.getElementById("suma").innerHTML = suma;
}


function MinusKurczak(){
  var suma = document.getElementById("suma").innerHTML;
  suma = Number(suma);
  suma = suma - 3000;
  
  var liczbaKurczak = document.getElementById("liczba-kurczak").innerHTML;
  liczbaKurczak = Number(liczbaKurczak);
  liczbaKurczak--;
  document.getElementById("liczba-kurczak").innerHTML = liczbaKurczak;

  document.getElementById("suma").innerHTML = suma;
}


function DodajKotlet(){
  var suma = document.getElementById("suma").innerHTML;
  suma = Number(suma);
  suma = suma + 1500;
  
  var liczbaKotlet = document.getElementById("liczba-kotlet").innerHTML;
  liczbaKotlet = Number(liczbaKotlet);
  liczbaKotlet++;
  document.getElementById("liczba-kotlet").innerHTML = liczbaKotlet;
  
  document.getElementById("suma").innerHTML = suma;
}


function MinusKotlet(){
  var suma = document.getElementById("suma").innerHTML;
  suma = Number(suma);
  suma = suma - 1500;
  
  var liczbaKotlet = document.getElementById("liczba-kotlet").innerHTML;
  liczbaKotlet = Number(liczbaKotlet);
  liczbaKotlet--;
  document.getElementById("liczba-kotlet").innerHTML = liczbaKotlet;
  document.getElementById("suma").innerHTML = suma;
}


function DodajPozostale(){
  var suma = document.getElementById("suma").innerHTML;
  suma = Number(suma);
  suma = suma + 2300;
  
  var liczbaPozostale = document.getElementById("liczba-pozostale").innerHTML;
  liczbaPozostale = Number(liczbaPozostale);
  liczbaPozostale++;
  document.getElementById("liczba-pozostale").innerHTML = liczbaPozostale;
  
  document.getElementById("suma").innerHTML = suma;
}


function MinusPozostale(){
  var suma = document.getElementById("suma").innerHTML;
  suma = Number(suma);
  suma = suma - 2300;
  
  var liczbaPozostale = document.getElementById("liczba-pozostale").innerHTML;
  liczbaPozostale = Number(liczbaPozostale);
  liczbaPozostale--;
  document.getElementById("liczba-pozostale").innerHTML = liczbaPozostale;
  document.getElementById("suma").innerHTML = suma;
}


