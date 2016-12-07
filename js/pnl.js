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
var REFREASHTYPE=0
var playerNameInFocus,playerIDInFocus,currentWeekInFocus,nflPlayer;

function parseLevelThree(d){
	for (var i=0; i < d.data.length; i ++) {
		$('#toLeader').append("\
				<div id='levelThree' class='list-group-item btn btn-rasied'' alt='"+d.data[i].PLAYERID +"' week='"+ d.data[i].WEEK +"'  >\
					<div class='row-picture'>\
					<img class='circle' src='https://raw.githubusercontent.com/google/material-design-icons/master/action/ios/ic_account_circle.imageset/ic_account_circle_3x.png' alt='icon'>\
					</div>\
					<div class='row-content'>\
						<h4><span>" + d.data[i].FANTASYNAMESELLER + "</span></h4>\
						<h4>\
							<b>Sold</b>\
						</h4>\
						<h4><span>" +d.data[i].FANTASYNAMEBUYER +"</span></h4>\
						<p class='list-group-item-text'>"+ d.data[i].QTY +" @ "+ d.data[i].PRICE  +"</p>\
					</div>\
				</div>"
		);
	}
	$('#loader').hide();
}


function fillLevelThree(){
	$('#toLeader').empty()
    $('#loader').show();
    var outGoingUrl = ApiUrl+'trading/fills/' + playerIDInFocus + '/week/' + currentWeekInFocus
    $.ajax({
        url: outGoingUrl,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
		parseLevelThree(list);

		//Back Button
		$("#backButton").remove();
		$("#toLeader").prepend("<a href='#' id='backButton'>Back</a>");
		$('#backButton').click(function(){
			fillLevelTwo();
		});

    });
}


function parseLevelTwo(d){
	for (var i=0; i < d.data.length; i ++) {
		$('#toLeader').append("\
				<div id='levelTwo' class='list-group-item btn btn-rasied' alt='"+d.data[i].PLAYERID +"' week='"+ d.data[i].WEEK +"' >\
					<div class='row-picture'>\
						<img class='circle' src='/artwork/inhouse/teams/"+ d.data[i].TEAM +".PNG' alt='icon'>\
					</div>\
					<div class='row-content'>\
						<h4 id='playersName' pos='"+d.data[i].POS+"' team='"+d.data[i].TEAM+"' class='list-group-item-heading'><span>"+d.data[i].FIRSTNAME+ " " +d.data[i].LASTNAME+" ("+d.data[i].POS+")</span></h4>\
						<p class='list-group-item-text'>Week: "+d.data[i].WEEK + " Result: "+d.data[i].RESULT+"</p>\
						<p class='list-group-item-text'>Trade: "+ d.data[i].QTY + " @ "+d.data[i].PRICE+"</p>\
						<p id='resHelper' class='list-group-item-text' alt='"+d.data[i].RESULT +"'>Profit: "+ d.data[i].PNL+"</p>\
					</div>\
				</div>"
		);
	}
	$('#loader').hide();
}


function fillLevelTwo(){
	$('#toLeader').empty()
    $('#loader').show();
    var outGoingUrl = ApiUrl+'trading/leaders/' + playerNameInFocus + '/pnl'
    $.ajax({
        url: outGoingUrl,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
		parseLevelTwo(list);

		//Back Button
		$("#backButton").remove();
		$("#toLeader").prepend("<a href='#' id='backButton'>Back</a>");
		$('#backButton').click(function(){
			fillLevelOne();
		});

    });
}


function parseLevelOne(d)
{
		for (var i in d) {
		$('#toLeader').append("\
			<div id='levelOne' class='list-group-item btn btn-rasied''>\
				<div class='row-picture'>\
					<img class='circle' src='https://raw.githubusercontent.com/google/material-design-icons/master/action/ios/ic_account_circle.imageset/ic_account_circle_3x.png' alt='icon'>\
				</div>\
				<div class='row-content'>\
					<h4 id='theName'><span>" +d[i].name + "</span></h4>\
					<p id='theScore'>"+d[i].score+"</p>\
				</div>\
			</div>"
		);
	}
	$('#loader').hide();
}

function fillLevelOne(){
	$("#fnPlayerInFocus").empty();
	$('#weekInFocus').empty();
	$('#toLeader').empty()
    $('#loader').show();
    var outGoingUrl = ApiUrl+'trading/leaders'
    $.ajax({
        url: outGoingUrl,
    }).done(function(data) {
        var item = JSON.stringify(data.contents)
        var list = JSON.parse(item)
		parseLevelOne(list);
    });
}
function checkDefaultWeek(){
	REFREASHTYPE === 0 ?  defaultWeek = 'all weeks' : defaultWeek = 'any week'
}

function resetPickers(){
	fillPickers();
}
function fillPickers(){
	checkDefaultWeek();
	$('#selWeek').empty();
	$('#selPos').empty();
	for (var i=1; i<=17;i++ ){
		if (i !== 17){
			$('#selWeek').append('<option>'+i+'</option>')
		}else{
			$('#selWeek').append('<option>'+defaultWeek+'</option>')
		}
	}
	for (var i=0; i < postions.length;i++){
		$('#selPos').append('<option>'+postions[i]+'</option>')
	}

	$('#selPos').val('all positions');
	$('#selWeek').val(defaultWeek);
	week=defaultWeek
	console.log(defaultWeek)
	postion='all positions'
	// resetPickers();
}

$( document ).ready(function(){
	$('#toLeader').btsListFilter('#searchinput', {itemChild: 'span'});
	fillPickers();
	fillLevelOne();
	$('#pickers').hide();


	/*$('#toLeader').on('click','#levelTwo',function() {
		nflPlayer = $('#playersName' ,this).text() + " " + $('#playersName',this).attr('team')
		playerIDInFocus = $(this).attr('alt')
		currentWeekInFocus = $(this).attr('week')
		$("#fnPlayerInFocus").text("Players Name: " + nflPlayer)
		$('#weekInFocus').text("Week : " + currentWeekInFocus + " Results: " + $('#resHelper',this).attr('alt') )

		$('#toLeader').empty();
		fillLevelThree();
	});*/


	$('#toLeader').on('click','#levelOne',function() {

		playerNameInFocus = $('#theName',this).text()
		currentWeekInFocus =  $('#theScore',this).text()

		$("#fnPlayerInFocus").text("Fantasy Name: " + playerNameInFocus)
		$('#weekInFocus').text("Profit: "+ currentWeekInFocus)

		$('#toLeader').empty();
		fillLevelTwo();
	});

});
