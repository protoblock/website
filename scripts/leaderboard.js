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
    var fnName = ''
    var playerIdInFocus, playerIdInFocusWeek;
    var levelOneUrl;
    var levelTwoUrl;
    var levelTwoName;
    var levelTwoSubhead;

  //  Leaderboard: 0,
    //  award: 1
    var REFREASHTYPE = 0
    var defaultWeek = REFREASHTYPE === 0 ?  'all weeks' : 'any week'
    var week=defaultWeek
    var realweek=0

    // var APIRunning=false
    var awardsCall;


function getCurrentWeek(){
    $.get( ApiUrl+"week", function( data ) {
        console.log(data)
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
        console.log(item)
        console.log(list)
        console.log(list.week)
        realweek=list.week
        return list.week
    })
}


function parseLevelThree(d){
  //$('#fnPlayerInFocus').text(d.data[0].FIRST + " " +d.data[0].LAST + " Result: "+d.data[0].RESULT  );
  for (var i=0; i < d.data.length; i ++) {
    $('#toLeader').append("\
    <ul class='list-group list-group-flush'>\
    <li class='list-group-item'>\
    <div class='item-div-3'>\
      <div class='lb-left'>\
      <div class='lb-pic'>\
        <img class='circle-img m-2' src='https://raw.githubusercontent.com/google/material-design-icons/master/action/ios/ic_account_circle.imageset/ic_account_circle_3x.png' alt='icon'>\
      </div>\
      <div class='lb-player'>\
        <h5 class='lb-heading' id='theName'>"+d.data[i].FANTASYNAME+"</h5>\
        <h6 class='lb-text'>Projection: "+d.data[i].PROJECTION + "</h6>\
      </div>\
      </div>\
      <div class='lb-award'centervh>\
        <h6 class='lb-text'>Award: "+d.data[i].AWARD +"</h6>\
      </div>\
    </div>\
    </li>\
    </ul>"
    );
  $('#loader').hide();
}

}

function fillLevelThree(){
    $('#toLeader').empty()
    $('#pickers').hide();
    $('#loader').show();
    var outGoingUrl = ApiUrl+'fantasy/nfl/'+ playerIdInFocus + '/week/' + playerIdInFocusWeek
    console.log(outGoingUrl)
    $.ajax({
        url: outGoingUrl,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
    parseLevelThree(list);

    //Back Button
    $("#backButton").remove();
    $("#toLeader").prepend("<div class='pb-button back-button p-2'><a href='#' id='backButton'>Back</a></div>");
    $('#backButton').click(function(){
      refillAwards();
    });

    });
}



function parseLeaderboard(d){
  for (var i in d) {
    $('#toLeader').append("\
    <ul class='list-group list-group-flush'>\
    <li class='list-group-item'>\
    <div id='fnPlayerName' class='item-div-3'>\
      <div class='lb-left'>\
      <div class='lb-pic'>\
        <img class='circle-img m-2' src='https://raw.githubusercontent.com/google/material-design-icons/master/action/ios/ic_account_circle.imageset/ic_account_circle_3x.png' alt='icon'>\
      </div>\
      <div class='lb-player'>\
        <h5 class='lb-heading' id='theName'>"+d[i].name+"</h5>\
      </div>\
      </div>\
      <div class='lb-award'centervh>\
        <h6 class='lb-text' id='score'> Skill: "+d[i].score+"</h6>\
      </div>\
    </div>\
    </li>\
    </ul>"
    );
  }
  $('#loader').hide();
}

function removeSpaces(str){
  return str.replace(/\s/g, "")
}
function replaceAmp(str){

  return str.replace( /&/g,"%26");

}
function getLeaderBoard(ur){
  console.log(ur);
    $('#toLeader').empty()
    $('#loader').show();
    $.ajax({
        url: ur,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)

    parseLeaderboard(list);
    });
}




function parseAward(d){
  for (var i=0; i < d.data.length; i ++) {
    $('#toLeader').append("\
    <div id='pnlPlayerName' alt='"+d.data[i].PLAYERID +"' week='"+ d.data[i].WEEK +"' team='"+d.data[i].TEAM + "' >\
    <ul class='list-group list-group-flush'>\
    <li class='list-group-item'>\
    <div class='item-div-3'>\
      <div class='lb-left'>\
      <div class='lb-pic'>\
        <img class='team-img m-2' src='/artwork/inhouse/teams/"+ d.data[i].TEAM +".PNG' alt='icon'>\
      </div>\
      <div class='lb-player'>\
        <h6 class='lb-heading' id='theName'>"+d.data[i].FIRSTNAME+ " " +d.data[i].LASTNAME+ " [Week " + d.data[i].WEEK + "]</h6>\
        <h6 class='lb-text'>Projection: "+d.data[i].PROJECTION + "</h6>\
        <h6 class='lb-text'>Result: "+d.data[i].RESULT +"</h6>\
      </div>\
      </div>\
      <div class='lb-award'centervh>\
        <h6 id='playerHelper' pos='"+ d.data[i].POS+"' res='"+d.data[i].RESULT+"' >Award: "+d.data[i].AWARD+"</h6>\
      </div>\
    </div>\
    </li>\
    </ul>\
    </div>"
    );
  }
  $('#loader').hide();
}


function checkDefaultWeek(){
  REFREASHTYPE === 0 ?  defaultWeek = 'all weeks' : defaultWeek = 'any week'
}

function resetPickers(){
  fillPickers();
}

function refillAwards(){
    var changeName = $('#theName',this).text()

    $('#fnPlayerInFocus').text(levelTwoName  );
    $('#headerSubText').text(levelTwoSubhead);

    $('#toLeader').empty();
    $('#loader').show();
    // awards?week=16&position=TE

    $.ajax({
        url: awardsCall,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
        parseAward(list);
      })

    //Back Button
    $("#backButton").remove();
    $("#toLeader").prepend("<div class='pb-button back-button p-2'><a href='#' id='backButton'>Back</a></div>");
    $('#backButton').click(function(){
      fillLeaderboard();
    });
}



function fillPickers(){

  getCurrentWeek(); 
  $("#backButton").remove();

  checkDefaultWeek();
  $('#selWeek').empty();
  $('#selPos').empty();
  //TODO: Jay Lena fix! 
  for (var i=1; i<=1;i++ ){  
    $('#selWeek').append('<option>'+i+'</option>')
  }
  $('#selWeek').append('<option>'+defaultWeek+'</option>')
  // for (var i=0; i < postions.length;i++){
  //  $('#selPos').append('<option>'+postions[i]+'</option>')
  // }

  console.log("lena education " + realweek)


  $('#selPos').val('all positions');
  $('#selWeek').val(defaultWeek);
  week=defaultWeek
  console.log(defaultWeek)
  postion='all positions'
  // resetPickers();
}


function setLeaderbordUrl(){
var tr = $('#selPos').val();
postion = $('#selPos').val();
week = $('#selWeek').val();
console.log(tr)

if (REFREASHTYPE === 0 ){
  if( tr === "all positions" ){
    if ( week === "all weeks")
        awardsCall = ApiUrl + 'fantasy/leaders'
    else
        awardsCall = ApiUrl + 'fantasy/leaders?week=' + week
  }
  else
  {
    awardsCall = ApiUrl + 'fantasy/leaders?week=' + week +'&position=' + postion
  }
}else{
  if ( week === "all weeks")
      awardsCall = ApiUrl + 'fantasy/players/' + fnName + '/awards'
  else
      awardsCall = ApiUrl + 'fantasy/players/' + fnName + '/awards?week=' + week

}
   REFREASHTYPE === 0 ? getLeaderBoard(awardsCall) : refillAwards()
}

function fillLeaderboard(){
  $('#fnPlayerInFocus').empty();
  $('#headerSubText').empty();


  getLeaderBoard(levelOneUrl);
}

$( document ).ready(function(){
  levelOneUrl = ApiUrl+'fantasy/leaders?position='+postion+'&week='+week;
  $('#toLeader').btsListFilter('#searchinput', {itemChild: 'span'});
  fillPickers();
  fillLeaderboard();

  $('#selWeek').change(function(){
    week = $(this).val();
      postion = $( '#selPos' ).val();

      REFREASHTYPE === 0 ? awardsCall = ApiUrl + 'fantasy/leaders?week=' + week
      //+'&position=' + postion
    : awardsCall = ApiUrl + 'fantasy/players/' + fnName + '/awards?week=' + week
    //'/awards?position=' + postion + '&week=' + week
    REFREASHTYPE === 0 ? setLeaderbordUrl() : refillAwards() ;
  });

  $('#selPos').change(function(){
        postion = $( this ).val();
        week = $('#selWeek').val();

    REFREASHTYPE === 0 ? awardsCall = ApiUrl + 'fantasy/leaders?week=' + week +'&position=' + postion
    : awardsCall = ApiUrl + 'fantasy/players/' + fnName + '/awards?position=' + postion + '&week=' + week

    REFREASHTYPE === 0 ? setLeaderbordUrl() : refillAwards();
  })


  $('#toLeader').on('click','#pnlPlayerName',function() {
    playerIdInFocus = $(this).attr('alt')
    playerIdInFocusWeek = $(this).attr('week')

      $('#fnPlayerInFocus').text('Player Name: ' + $('#theName',this).text()  + ' ('+  $('#playerHelper',this).attr('pos')  +") "+ $(this).attr('team')   );
      $('#headerSubText').text("Week: " + playerIdInFocusWeek + " Fantasy Points: " + $('#playerHelper',this).attr('res') );

    $('#toLeader').empty();
    fillLevelThree();
  });

  $('#toLeader').on('click','#fnPlayerName',function() {
      fnName = $('#theName',this).text();
      levelTwoName = 'Fantasy Name: ' + fnName;
      levelTwoSubhead = "" + $('#score',this).text();

      REFREASHTYPE = 1;
      // resetPickers();
      postion = $( '#selPos' ).val();
    week = $('#selWeek').val();
      awardsCall = ApiUrl + 'fantasy/players/' + fnName + '/awards?week=' + week
      //+'&position=' + postion;

    setLeaderbordUrl();
      refillAwards();
  });
});
