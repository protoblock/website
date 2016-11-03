/*

88""Yb 88""Yb  dP"Yb  888888  dP"Yb  88""Yb 88      dP"Yb   dP""b8 88  dP
88__dP 88__dP dP   Yb   88   dP   Yb 88__dP 88     dP   Yb dP   `" 88odP
88"""  88"Yb  Yb   dP   88   Yb   dP 88""Yb 88  .o Yb   dP Yb      88"Yb
88     88  Yb  YbodP    88    YbodP  88oodP 88ood8  YbodP   YboodP 88  Yb                                                                                                                       '
080 114 111 116 111 098 108 111 099 107
01010000 01110010 01101111 01110100 01101111 01000010 01101100 01101111 01100011 01101011

 contact@protoblock.com

*/

var postion='all positions'
var postions=['QB','RB','WR','TE','K','DEF','all positions']
var ApiUrl='/php/simple.php?url=https://158.222.102.83:4545/'
var playerInView
var isFirst=true;

var $_GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
});

function toJSDate (dateTime) {
  var dateTime = dateTime.substring(0,dateTime.lastIndexOf('.'));
  var dateTime = dateTime.split("T");
  var date = dateTime[0].split("-");
  var time = dateTime[1].split(":");
  //(year, month, day, hours, minutes, seconds, milliseconds)
  var jsDate = new Date(date[0], date[1], date[2], time[0], time[1], time[2], 0);
  return jsDate.toLocaleDateString() + " " + jsDate.toLocaleTimeString();
}



function parseTheTicks(d){
    var priceSet = [];
    var ticSet = [];
    for (var i = 0; i < d.length; i++) {
        var dd = d[i].tictime
        ticSet.push(toJSDate(dd))
        priceSet.push(d[i].price)
    }
    var lineChartData = {
        labels: ticSet,
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: priceSet
            //[randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }, {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: priceSet
            //[randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }]

    }
    $("#canvas").remove();
    $("#chartContainer").append("<canvas style='background: rgb(16, 53, 88) ;width:100%' id='canvas' ></canvas>");
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
        animation: true,
        animationEasing: "easeOutQuint",
        scaleGridLineColor: "rgba(255,255,255,.5)",
        scaleLineColor: "rgba(255,255,255,.8)",
        scaleFontColor: "rgba(255,255,255,.7)",
        responsive: true,
        maintainAspectRatio: true
    });
}

function fillChart(){
    var outGoingUrl = ApiUrl+'ticks/'+playerInView+'/week/16'
    $.ajax({
        url: outGoingUrl,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
        parseTheTicks(list);
    });
}





function parseRight(d){


 // fill the right table
 $('#upsideRow').append
  (
    "<tr><td>"
    + d[0].bidsize
    + "</td><td>" + d[0].bid
    + "</td><td>" + d[0].ask
    + "</td><td>" + d[0].asksize
    + "</td><td>" + d[0].last
    + "</td><td>" + d[0].lastsize
    + "</td></tr>"
  )
  $('#volHolder').append("<h3 style='color:#333!important; text-align: center;'><b>Volume: </b>" + d[0].volume + "<h3>")
  $('#openHolder').append("<h3 style='color:#333!important; text-align: center;'><b>Move from open: </b>"+ d[0].change + "<h3>")
  $('#resultsHolder').append("<h3 style='color:#333!important; text-align: center;'><b>Expected Results:</b> "+ d[0].price + "<h3>")



}






function fillRight(){
    $('#upsideRow').empty();
    $('#volHolder').empty();
    $('#openHolder').empty();
    $('#resultsHolder').empty();

    var outGoingUrl = ApiUrl+'l1snap/' + playerInView
    $.ajax({
        url: outGoingUrl,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
        parseRight(list);
        fillChart();
    });
}




function parseLeftTable(d){



      if (isFirst===true && !$_GET['playerid']){
      playerInView = d[0].playerid
       $('#rightTitle').append("\
          <h2 style='color:#333!important; text-align: center;'><b>"
          + d[0].firstname + " " +  d[0].lastname  + " </b></h2>");
       }

     // $('#upOrDown').append("\
     //    \
     //    \
     //    ")
    if (isFirst) { fillRight(); }
    for (var i=0; i < d.length; i ++) {

        if ($_GET['playerid'] == d[i].playerid && isFirst){
          $('#rightTitle').append("\
             <h2 style='color:#333!important; text-align: center;'><b>"
             + d[i].firstname + " " +  d[i].lastname  + " </b></h2>");

        }
        $('#leftTable').append("\
                <tr id='playerToFocus' alt='" +d[i].playerid+ "'>\
                    <td id='firstRowPlayer' alt='"+d[i].firstname + " " +  d[i].lastname +"'>"+ d[i].firstname + " " +  d[i].lastname + " ( " +  d[i].team   + ", " + d[i].pos + " ) </td>\
                    <td>"+ d[i].last+" </td>\
                    <td>"+ d[i].volume+" </td>\
                    <td>"+ d[i].change+" </td>\
                </td>\
                "
        );
    }
}

function fillLeftTable(){
    $('#leftTable').empty()
    var outGoingUrl = ApiUrl+'playerquotes'
    $.ajax({
        url: outGoingUrl,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
        parseLeftTable(list);
    });
}


// https://158.222.102.83:4545/ playerquotes
$( document ).ready(function(){


    $('#leftTable').on('click','#playerToFocus',function() {
        isFirst=false;

        $('#rightTitle').empty();
        playerInView = $(this).attr('alt');

        // console.log( $('#firstRowPlayer' ,this).attr( 'alt' ) );
        var playerAtGlance = $('#firstRowPlayer' ,this).attr( 'alt' )
        $('#rightTitle').append("\
            <h2 style='color:#333!important; text-align: center;'><b>"
            + playerAtGlance + " </b></h2>");



        // console.log(playerInView);

        fillRight();
        // $('#leftTable').empty()
        var outGoingUrl = ApiUrl+'playerquotes'
        $.ajax({
            url: outGoingUrl,
        }).done(function(data) {
            var item = JSON.stringify(data.contents)
            var list = JSON.parse(item)
            parseLeftTable(list);
        });


    });

    fillLeftTable();
    if ($_GET['playerid']){
      playerInView = $_GET['playerid'];
      fillRight();
    }


});
