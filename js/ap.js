/*

88""Yb 88""Yb  dP"Yb  888888  dP"Yb  88""Yb 88      dP"Yb   dP""b8 88  dP
88__dP 88__dP dP   Yb   88   dP   Yb 88__dP 88     dP   Yb dP   `" 88odP
88"""  88"Yb  Yb   dP   88   Yb   dP 88""Yb 88  .o Yb   dP Yb      88"Yb
88     88  Yb  YbodP    88    YbodP  88oodP 88ood8  YbodP   YboodP 88  Yb                                                                                                                       '
080 114 111 116 111 098 108 111 099 107
01010000 01110010 01101111 01110100 01101111 01000010 01101100 01101111 01100011 01101011

 contact@protoblock.com

*/



//The Navagation bar

function loadNav(){
    //The Navagation bar
    $('body').append("<!-- Menu -->\
        <nav class='navbar navbar-default navbar-fixed-top animated fadeInDown' role='navigation' style='-webkit-animation-delay:.6s;animation-delay:.6s;'>\
            <div class='container'> <a href='/index.html'> <img class='navbar-brand' id='homeIcon' src='/artwork/inhouse/logoFinal.png'></a> <div class='navbar-header'>\
                <button aria-controls='navbar' aria-expanded='false' class='navbar-toggle collapsed' data-target='#navbar' data-toggle='collapse' type='button'>\
                <span class='sr-only'>Toggle navigation</span>\
                <span class='icon-bar'></span>\
                <span class='icon-bar'></span>\
                <span class='icon-bar'></span>\
                </button>\
            </div>\
            <div class='navbar-collapse collapse' id='navbar'>\
                <ul class='nav navbar-nav  navbar-right'>\
                    <li> <a href='http://blog.protoblock.com/' target='_blank'>Blog</a> </li>\
                    <li> <a href='/template/download.html' id='App'>Download App</a> </li>\
                    <li> <a href='/template/leaderboard.html' id='App'>2017 Leaderboard</a> </li>\
                    <li> <a href='/template/ticks.html'>Ticker</a> </li>\
                    <li> <a href='/Protoblock-Quick-Start-Guide.pdf' id='quick'>Quick Start PDF</a></li> \
                </ul>\
            </div>\
            </div>\
            <div class='col-md-12' id='navbarBottom'>\
      <div class="container-fluid">\
        <div class="nav-sm">\
          <button class="ddbtn"><i class="fa fa-bars"></i></button>\
            <div class="ddmenu">\
            <a href="#">Introduction</a>\
            <a href="#">Downloads</a>\
            <a href="#">Quick Start Guide</a>\
            <a href="#">FAQ</a>\
            </br>\
            <a href="#">Ticker</a>\
            <a href="/src/leaderboard.html">Leaderboard</a>\
            <a href="#">Block Explorer</a>\
            </br>\
            <a href="#">Documents</a>\
            <a href='http://blog.protoblock.com/' target='_blank'>Blog</a>\
            <a href="#">Forum</a>\
          </div>\
        </div>\
      </div>\
        </nav>\
        <!-- Menu -->\
    ");

    $.material.ripples();
    $.material.init();
}


/*
function loadNav(){
  $('body').append("<!-- Menu -->\
      <div class="container-fluid">\
        <div class="nav-sm">\
          <button class="ddbtn"><i class="fa fa-bars"></i></button>\
            <div class="ddmenu">\
            <a href="#">Introduction</a>\
            <a href="#">Downloads</a>\
            <a href="#">Quick Start Guide</a>\
            <a href="#">FAQ</a>\
            </br>\
            <a href="#">Ticker</a>\
            <a href="/src/leaderboard.html">Leaderboard</a>\
            <a href="#">Block Explorer</a>\
            </br>\
            <a href="#">Documents</a>\
            <a href='http://blog.protoblock.com/' target='_blank'>Blog</a>\
            <a href="#">Forum</a>\
          </div>\
        </div>\
      </div>\
  <!-- Menu Ends-->\
    ");
    $.material.ripples();
    $.material.init();
}

*/

function loadFooter(){
    //The Footer
    $('#theFooter').append(" \
        <!-- footer --> \
        <div id='footerTopbar' class='col-md-12 animated fadeInUp'  style='-webkit-animation-delay:.6s;animation-delay:.6s;'></div> \
            <div id='footerBackground' class='col-md-12'> \
                <div class='row' id='footer'> \
                    <div id='footerIconHolder' class='col-md-12 hideme'> \
                        <a href='/index.html'> \
                        <img class='img-responsive animated fadeInUp col-md-12' style='-webkit-animation-delay:1.6s;animation-delay:1.6s;' src='/artwork/inhouse/logoWtm.png'> \
                        </a> </img> \
                         <p id='footerCopy'>© Protoblock, LLC</p> \
                    </div> \
                </div> \
            </div> \
        </div> \
        <!-- Footer Ends --> \
        ");
}