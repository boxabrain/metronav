var wg;
var ww;
var ml;
var gnum = 0;
var gcurr = 0;

function updatePage(){
	
	// update page content...

}

function slideLeft(){
	gcurr++;
	if (gcurr >= gnum) gcurr--;
	
	ml = -(gcurr * wg);
	$('.viewport ul').animate({ marginLeft: ml }, 500);
	
	updatePage();
}

function slideRight(){
	gcurr--;
	if (gcurr < 0) gcurr = 0;
	
	ml = -(gcurr * wg);
	$('.viewport ul').animate({ marginLeft: ml }, 500);
	
	updatePage();
}

function handleSlider(){
	gnum = $('.viewport .group').size();
	
	ww = $(window).width();
	wg = ww - ((ww*5)/100);
	
	$('.viewport ul').width(gnum * ww);
	$('.viewport .group').width(wg);
	
	// resize
	$(window).resize(function(){
		ww = $(window).width();
		wg = ww - ((ww*5)/100);
		$('.viewport .group').width(wg);
	});
	
	// next
	$('#next').click(function(){ slideLeft(); });
	
	// prev
	$('#prev').click(function(){ slideRight(); });

	// drag
	$('.viewport ul').hammer({
        prevent_default: false,
        drag_vertical: false
    })
    .bind('drag', function(ev){
        if (ev.direction == 'left'){
        	ml = -(gcurr * wg);
        	$(this).css({ marginLeft: (ml - ev.distance) });
        }
        if (ev.direction == 'right'){
        	ml = -(gcurr * wg);
        	$(this).css({ marginLeft: (ml + ev.distance) });
        }
    });
    
    // drag release
    $('.viewport ul').bind('dragend', function(ev){
    	if (ev.direction == 'left') slideLeft();
    	if (ev.direction == 'right') slideRight();
    });
	
}


/******************************************************************************************************************/
// on load...
/******************************************************************************************************************/

$(function(){

	handleSlider();
		
	// device detection
	size = window.getComputedStyle(document.body,':after').getPropertyValue('content');
	if (size == 'wide') { }
	if (size == 'vtab') { }
	if (size == 'mob') { }
	if (size == 'widemob') { }
	
	// hide url bar (iphone/ipad)
	setTimeout(function(){ window.scrollTo(0, 1); }, 0);
	
});