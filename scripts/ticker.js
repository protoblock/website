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
var ApiUrl='/scripts/php/simple.php?url=https://158.222.102.83:4545/'
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
    console.log(dateTime);
  var dateTime = dateTime.substring(0,dateTime.lastIndexOf('.'));
  var dateTime = dateTime.split("T");
  var date = dateTime[0].split("-");
  var time = dateTime[1].split(":");
  // console.log(dateTime);
  // console.log(date);
  // console.log(time);
  //(year, month, day, hours, minutes, seconds, milliseconds)
  // var jsDate = new Date(date[0], date[1], date[2], time[0], time[1], time[2], 0);
  // jsDate = new Date(dateTime)
  // console.log(jsDate);
  //return jsDate.toLocaleDateString() + " " + jsDate.toLocaleTimeString();
  return date[1] / 1 + "/" + date[2];
  // return jsDate.toString();
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
        }
        //, 
        // {
        //     label: "My Second dataset",
        //     fillColor: "rgba(151,187,205,0.2)",
        //     strokeColor: "rgba(151,187,205,1)",
        //     pointColor: "rgba(151,187,205,1)",
        //     pointStrokeColor: "#fff",
        //     pointHighlightFill: "#fff",
        //     pointHighlightStroke: "rgba(151,187,205,1)",
        //     data: priceSet
        //     //[randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        // }
        ]

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

    var outgoingWeekUrl = ApiUrl+"week";

    $.ajax({
        url: outgoingWeekUrl,
    }).done(function(data) {
        var weekItem = JSON.stringify(data.contents)
        var weekList = JSON.parse(weekItem)


        var outGoingUrl = ApiUrl+'ticks/'+playerInView+'/week/'+weekList.week;
        //console.log(outGoingUrl);
        $.ajax({
            url: outGoingUrl,
        }).done(function(data) {
            var item = JSON.stringify(data.contents)
            var list = JSON.parse(item)
            parseTheTicks(list);
        });
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

  $('#volHolder').append("<p><b>Volume: </b>" + d[0].volume + "<h3>")
  $('#openHolder').append("<p><b>Move from open: </b>"+ d[0].change + "<h3>")
  $('#resultsHolder').append("<p><b>" + (d[0].symbol.slice(-1) == "s" ? "ROW" : ("Week " + d[0].symbol.slice(-2) )) +  " Expected Results:</b> "+ d[0].price + "<h3>")
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



     if (isFirst===true && !$_GET['symbol']){
        var team = d[0].team
        if ( team === "") team = "FA"

        playerInView = d[0].symbol
        $('#rightTitle').append("\
          <h5><b>"
          + d[0].firstname + " " +  d[0].lastname + " (" +  team  + ", " + d[0].pos + ")"  + " </b></h2>")
    }

     // $('#upOrDown').append("\
     //    \
     //    \
     //    ")
    if (isFirst && !$_GET['symbol']) { fillRight(); }

    for (var i=0; i < d.length; i ++) {
        var team = d[i].team
        if ( team == "") team = "FA"

        if ($_GET['symbol'] == d[i].symbol && isFirst){
          $('#rightTitle').append("\
             <h5><b>"
             + d[i].firstname + " " +  d[i].lastname + " (" +  team   + ", " + d[i].pos + ")"  + " </b></h2>");

        }
        $('#leftTable').append("\
                <tr id='playerToFocus' alt='" +d[i].symbol+ "'>\
                    <td id='firstRowPlayer' alt='"+d[i].firstname + " " +  d[i].lastname + " (" +  team  + ", " + d[i].pos + ")" +"'>"+ d[i].firstname + " " +  d[i].lastname + " ( " +  team   + ", " + d[i].pos + " ) </td>\
                    <td>"+ d[i].symbol+" </td>\
                    <td>"+ d[i].last+" </td>\
                    <td>"+ d[i].volume+" </td>\
                    <td>"+ d[i].change+" </td>\
                </td>\
                "
        );

    }
    $("#upSideTable").tablesorter();
    $("#upSideTable th").addClass("headerSortUp");
    $("#upSideTable th").addClass("headerSortDown");

}

function fillLeftTable(){
    $('#leftTable').empty()
    var outGoingUrl = ApiUrl+'playerquotes'
    $.ajax({
        url: outGoingUrl,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
        console.log(list)
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
            <h5><b>"
            + playerAtGlance + " </b></h2>");



        // console.log(playerInView);

        fillRight();
        // $('#leftTable').empty()
        /*var outGoingUrl = ApiUrl+'playerquotes'
        $.ajax({
            url: outGoingUrl,
        }).done(function(data) {
            var item = JSON.stringify(data.contents)
            var list = JSON.parse(item)
            parseLeftTable(list);
        });*/


    });

    fillLeftTable();
    if ($_GET['symbol']){
      playerInView = $_GET['symbol'];
      fillRight();
    }


});
