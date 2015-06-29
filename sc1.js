var myMyo = Myo.create();

var audio1 = new Audio("audio/kicks/KickLoop1.wav");
audio1.controls = false;
audio1.loop = true;
audio1.autoplay = false;

var audio2 = new Audio("audio/Bass/BassLoop.wav");
audio2.controls = false;
audio2.loop = true;
audio2.autoplay = false;

var audio3 = new Audio("audio/Percussion/Clap.wav");
audio3.controls = false;
audio3.loop = true;
audio3.autoplay = false;

var audio4 = new Audio("audio/8_Bar/Lead8bar2.wav");
audio4.controls = false;
audio4.loop = true;
audio4.autoplay = false;

var audio5 = new Audio("audio/Uplifters/uplifter.wav");
audio5.controls = false;
audio5.loop = false;
audio5.autoplay = false;

var audio6 = new Audio("audio/Uplifters/Up.wav");
audio6.controls = false;
audio6.loop = false;
audio6.autoplay = false;

var state;
var fisttemp = false;
var playing1 = false;
var playing2 = false;
var playing3 = false;
var playing4 = false;
var playing5 = false;
var playing6 = false;



var gyroscope_history = [[],[],[]];
var iterations = 0;
var twister=0;
var twister_history;


var kick1 = new Audio("audio/kicks/kickfinal1.wav");
kick1.controls = false;
kick1.loop = false;
kick1.autoplay = false;

var kick2 = new Audio("audio/kicks/kickfinal2.wav");
kick2.controls = false;
kick2.loop = false;
kick2.autoplay = false;

var kick3 = new Audio("audio/kicks/kickfinal3.wav");
kick3.controls = false;
kick3.loop = false;
kick3.autoplay = false;





	myMyo.on('accelerometer',function(data){
		if(fisttemp){
			if(data.y>(-0.67) && data.y<(-0.54)){
				state = 1;
				//change(1);
			}else if(data.y>(-0.41) && data.y<(-0.28)){
				state = 2;
				//change(2);
			}else if(data.y>(-0.15) && data.y<(0.07)){
				state = 3;
				//change(3);
			}else if(data.y>(0.11) && data.y<(0.24)){
				state = 4;
				//change(4);
			}else if(data.y>(0.37) && data.y<(0.50)){
				state = 5;
				//change(5);
			}else if(data.y>(0.63) && data.y<(0.78)){
				state = 6;
				//change(6);
			}
			//output state to html
			document.getElementById("output").innerHTML=state;
		}else{
			if(data.x < -1){
				if(playing1 && state == 1){
					audio1.pause();
					audio1.load();
				}
				if(playing2 && state == 2){
					audio2.pause();
					audio2.load();
				}
				if(playing3 && state == 3){
					audio3.pause();
					audio3.load();			
				}
				if(playing4 && state == 4){
					audio4.pause();
					audio4.load();
				}
				if(playing5 && state == 5){
					audio5.pause();
					audio5.load();
				}
				if(playing6 && state == 6){
					audio6.pause();
					audio6.load();			
				}
			}
			if(data.x > 0){
				var vol = data.x;
				if(vol>0 && vol<100){
					if(playing1 && state == 1){
						audio1.volume = vol;
					}
					if(playing2 && state == 2){
						audio2.volume = vol;
					}
					if(playing3 && state == 3){
						audio3.volume = vol;
					}
					if(playing4 && state == 4){
						audio4.volume = vol;
					}
					if(playing5 && state == 5){
						audio5.volume = vol;
					}
					if(playing6 && state == 6){
						audio6.volume = vol;
					}
				}

			}
		}	
	});

	myMyo.on('fist',function(edge){
		if(edge){fisttemp = true};
		if(!edge){fisttemp = false};
		//console.log(fisttemp);
	});

	myMyo.on('fingers_spread',function(edge){
		if(state == 1){
			audio1.play();
			playing1=true;
		}else if(state == 2){
			audio2.play();
			playing2=true;
		}else if(state == 3){
			audio3.play();
			playing3=true;
		}else if(state == 4){
			audio4.play();
			playing4=true;
		}else if(state == 5){
			audio5.play();
			playing5=true;
		}else if(state == 6){
			audio6.play();
			playing6=true;
		}

	});
	myMyo.on('imu', function(data){
		/*
		document.getElementById("orientvalues1").innerHTML = data.orientation.x.toFixed(2);
		document.getElementById("orientvalues2").innerHTML = data.orientation.y.toFixed(2);
		document.getElementById("orientvalues3").innerHTML = data.orientation.z.toFixed(2);
		document.getElementById("orientvalues4").innerHTML = data.orientation.w.toFixed(2);
		*/
		var leftboundary = 0.00;
		var leftrightboundary = -0.20;
		var rightleftboundary = -0.50;
		var rightboundary = -0.70;
		var notehit = 180;

		//FIRST DRUM 
		if(data.orientation.z.toFixed(2)<leftboundary && data.orientation.z.toFixed(2)>leftrightboundary)
		{
			//document.getElementById("inboundary").innerHTML = "In left boundary.";
			if( data.gyroscope.y.toFixed(2)>notehit)
			{	
				if(kick1.paused){
				    kick1.play();
				    $(".jiklos1").show();
					setTimeout(function(){
						$(".jiklos1").hide();
					}, 10);
				}
				
				/*
				document.getElementById("notehitter").innerHTML = "NOTE WAS HIT IN LEFT.";
				FOR TESTING PURPOSES 
				*/
			}
		}
		
		//SECOND DRUM
		if(data.orientation.z.toFixed(2)<leftrightboundary && data.orientation.z.toFixed(2)>rightleftboundary)
		{
			//document.getElementById("inboundary").innerHTML = "In middle boundary.";
			if( data.gyroscope.y.toFixed(2)>notehit)
			{
				if(kick3.paused){
				    kick3.play();
				    $(".jiklos3").show();
					setTimeout(function(){
						$(".jiklos3").hide();
					}, 10);
				}
				/*
				document.getElementById("inboundary").innerHTML = "NOTE IS HIT IN MIDDLE BOUNDARY. ";
				document.getElementById("notehitter").innerHTML = "NOTE WAS HIT IN MIDDLE.";
				FOR TESTING PURPOSES
				*/		
			}
		}

		//THIRD DRUM
		if(data.orientation.z.toFixed(2)<rightleftboundary && data.orientation.z.toFixed(2)>rightboundary)
		{
			//document.getElementById("inboundary").innerHTML = "In right boundary.";
			if( data.gyroscope.y.toFixed(2)>notehit)
			{
				if(kick2.paused){
				    kick2.play();
				    $(".jiklos2").show();
					setTimeout(function(){
						$(".jiklos2").hide();
					}, 10);
				}
				/*
				document.getElementById("inboundary").innerHTML = "NOTE IS HIT IN RIGHT BOUNDARY. ";
				document.getElementById("notehitter").innerHTML = "NOTE WAS HIT IN RIGHT.";
				*/
			}
		}
		//console.log(data.x, data.y, data.z);
	});


/*
function move(){
	//$(".circlesmall").addClass("dsdf");

	//var color = $( "#tes" ).css( "background-color" );
	//console.log(color);
	//var current = $("#circlesmall").css("background");
	//console.log(current);
	//$("#circlesmall").css("left","10%");
}
move();


function change(id){
  //console.log(document.getElementById(id));
  $(".bigger_text").removeClass('bigger_text');
  $("#"+id).toggleClass('bigger_text');
}
function BOOM(id){
  //console.log(document.getElementById(id));
  $(".bigger_text").removeClass('bigger_text');
  $("#"+id).toggleClass('bigger_text');
}
*/





