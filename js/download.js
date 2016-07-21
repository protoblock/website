/*
*  88""Yb 88""Yb  dP"Yb  888888  dP"Yb  88""Yb 88      dP"Yb   dP""b8 88  dP 
*  88__dP 88__dP dP   Yb   88   dP   Yb 88__dP 88     dP   Yb dP   `" 88odP  
*  88"""  88"Yb  Yb   dP   88   Yb   dP 88""Yb 88  .o Yb   dP Yb      88"Yb  
*  88     88  Yb  YbodP    88    YbodP  88oodP 88ood8  YbodP   YboodP 88  Yb                                                                                                                       '                   
*  080 114 111 116 111 098 108 111 099 107
*  01010000 01110010 01101111 01110100 01101111 01000010 01101100 01101111 01100011 01101011
*
*   contact@protoblock.com
*
* 	If you are reading this please feel free to use this in your own project
*   But if you could give back (pull requests ect) to protoblock that would 
* 	be great ! 
*/

/*!
	Set up the folder or the link to the store where the app is hosted at.  
	FIXME more ssl and security needs to go here. 
*/
function setDownloadLink(){
	var OS=getOS();
	var CPU=getCPU();
	
	var folder,distro;

	// for non linux based os 
	if(OS === "MacOS" || OS === "Windows") {
		folder="/Downloads/"+OS+"/"+CPU+"/protoblock."+setEx()
	}
	else if (OS === "Android") {
		folder = "https://play.google.com/store/apps/details?id=org.proto.protoblock"
	}
	
	// else if(OS === "MacOS")
	// {
	// 	if ( getMacVersion() === "Supported" ){
	// 		distro=getPackageManger();
 //                	folder="/Downloads/"+OS+"/"+CPU+"/"+distro+"/protoblock."+distro
	// 	}else{
	// 		folder="/Old%20OSX%20Version";
	// 	}
	// }
	// buggy
	else if ( OS === "iPhone" || OS === "iPad" )
	{
		folder="https://itunes.apple.com/us/app/protoblock-2016/id1133758199?ls=1&mt=8"
	}
	else
	{
		distro=getPackageManger();
		folder="/Downloads/"+OS+"/"+CPU+"/"+distro+"/protoblock."+distro	
	}
	
	return folder;
}

function getMacVersion(){
  var t = navigator.appVersion;
  var tl = t.substring(t.lastIndexOf("OS X")+4);
	var te = tl.substring(0,tl.indexOf(")")).replace(/_/g,"") ;
  var tle = te.substring(0,5);
  
  var pI = parseInt( tle , 10 );
  osxVersion = pI
  if( pI >= 1007 )
  {
    return "Supported"
  }
  else
  {
    return "UnSupported"
  }
}





/*!
	Set MISC buttons and Text after all things are loaded and we have all the information that is 
	needed
*/
function setButtons(stringer){
	var DLLInk=setDownloadLink();
	$('#test').text('Download Protoblock for ' + stringer)
	if ( stringer === "Android") {
		$('#test').attr("href","https://play.google.com/store/apps/details?id=org.proto.protoblock");
	}
	else if ( stringer === "iPhone" || stringer === "iPad" )
	{
		DLLInk = "https://itunes.apple.com/us/app/protoblock-2016/id1133758199"
		$('#test').attr("href","https://itunes.apple.com/us/app/protoblock-2016/id1133758199");
	}

	else {
		$('#test').attr("href",DLLInk);
	}
	$('#theOS').text('Download Protoblock for ' + stringer)
	$('#theOS').attr("href",DLLInk)
}

/*
	Simple function to open up the error dialog if there is no OS support
*/
function openErrorModal(){
	$("#otherDL").modal({
		backdrop: 'static',
    	keyboard: false
	}); 
}


/*
	Returns the Operating stystems file exstention type 
*/
function setEx(){
	var ex;
	switch(getOS()){
		case "Windows":
		ex = "exe"
		break
		case "MacOS":
		ex = "dmg"
		break;
		case "Android":
		ex = "apk"
		break;
		case "iPhone" || "iPad":
		ex = "app"
		break;
	}
	return ex;
}

/*
	Returns the Operating system string
*/
function getOS(){
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="Unix";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
	if( navigator.userAgent.indexOf("Android")!=-1) OSName="Android";
	if( navigator.userAgent.indexOf("iPhone")!=-1)OSName="iPhone";
	if(navigator.userAgent.indexOf("iPad")!=-1)OSName="iPad";
	if(navigator.userAgent.indexOf("iPod")!=-1)OSName="iPod";
	if(navigator.userAgent.indexOf("BlackBerry")!=-1)OSName="BlackBerry";
	return OSName;
}

/*
	Returns the arch for the os in focus
*/
function getCPU(){
	var arch;
	switch(window.navigator.platform){
		case "MacIntel": 
			arch="64";
		break;
		case "Win16":
			arch="32";
		break;
		case "Win32":
			arch="64";
		break;
		case "Linux i686":
			arch="32";
		break;
		case "Linux x86_64":
			arch="64";
		break ;
		case "Linux armv7l":
			arch="arm";
		break;
		// FIXME I have no clue what this comes back as .. Yet
		case "iPhone":
			arch=""
		break
		default : 
			arch =window.navigator.platform
		break;
	}
	return arch;
}


/*
This is for Linux systems only it returns the packagemanagement type, 
FIXME add in a thing for snap packages in Ubuntu

*/
function getPackageManger(){
	var distro="Unknown"
	if(navigator.userAgent.indexOf("Ubuntu")!=-1)distro="deb";
	if(navigator.userAgent.indexOf("ubuntu")!=-1)distro="deb";
	if(navigator.userAgent.indexOf("Debian")!=-1)distro="deb";
	if(navigator.userAgent.indexOf("Arch")!=-1)distro="pkgman";
	if(navigator.userAgent.indexOf("Debian")!=-1)distro="deb";
	if(navigator.userAgent.indexOf("CentOS")!=-1)distro="rpm";
	if(navigator.userAgent.indexOf("Fedora")!=-1)distro="rpm";
	if(navigator.userAgent.indexOf("Gentoo")!=-1)distro="portage";
	if(navigator.userAgent.indexOf("Mint")!=-1)distro="deb";
	if(navigator.userAgent.indexOf("Mandriva")!=-1)distro="rpm";
	if(navigator.userAgent.indexOf("Red Hat")!=-1)distro="rpm";
	if(navigator.userAgent.indexOf("SUSE")!=-1)distro="‎zypper";
	if(navigator.userAgent.indexOf("Sabayon")!=-1)distro="entropy";
	if(navigator.userAgent.indexOf("slax")!=-1)distro="sourceCode";
	if(navigator.userAgent.indexOf("slackware")!=-1)distro="sourceCode";
	return distro;
}


/*
	INIT()
	this is the init function that is called to start looking for Host OS things
*/
function init(){
	var OS=getOS();
	setButtons(OS);
	// mFile=setDownloadLink();
	// var OS=getOS();
	// if ( OS === "Android"){
	// 	setButtons("Android")
	// }
	// else if(OS === "iPad" || OS === "iPhone")
	// {
	// 	setButtons(OS);
	// }
	// else
	// {
	// 	$.get(mFile)
	// 	.done(function() { 
	// 		setButtons(OS)
	// 	}).fail(function() {
	// 		openErrorModal();
	// 	})
	// }
	// setButtons(OS);
}

$(document).ready(function(){
	init();


	// Close the error dialog and force the browser to go back to the home page. 
	$("#errorCloseButton").click(function(){
		window.location.replace("http://protoblock.com");
	});
	// Send the enduser over to the blog and its mailing list so that they can get updates 
	// on mac progress
	$("#errorSignUp").click(function(){
		window.location.replace("http://blog.protoblock.com/2016/07/08/iphone-and-ipad-updates/");
	});

	// close the error dialog and open the "download others" dialog
	$("#errorToggle").click(function(){
		$("#errorPopup").modal('toggle');
		$("#otherDL").modal('show');
	});

});
