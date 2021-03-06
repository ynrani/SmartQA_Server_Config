!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

/*$(document).ready(function(){
	$(".link").hide();
	$(".OpenTable").hide();
});*/

/*$(document).ready(function(){
	  $("*").dblclick(function(e){
	    e.preventDefault();
	  });
	});*/

$('.anchor').on('click',function(){
   var width = parseInt($(this).parent().css('width'));
   if(width==10){
     $(this).parent().css('width','20%');
     $('#canvas').css('width','60%');
   }else{
      $(this).parent().css('width','10px');
      $('#canvas').css('width','calc( 80% - 10px)');
   }
});

$('.ui-item').draggable({
 // containment: "#dropHere",
//	revert: "invalid",
//	stack: ".ui-item",
//	helper: 'clone',
  drag: function( event, ui ) {
           var lines = $(this).data('lines');
           var con_item =$(this).data('connected-item');
           var con_lines = $(this).data('connected-lines');
  
           if(lines) {
             lines.forEach(function(line,id){
             		$(line).attr('x1',$(this).position().left).attr('y1',$(this).position().top+1-150);  
             }.bind(this));
           }
    
           if(con_lines){
               con_lines.forEach(function(con_line,id){
                  $(con_line).attr('x2',$(this).position().left+5)
                        .attr('y2',$(this).position().top-150+(parseInt($(this).css('height'))/2)+(id*5));
               }.bind(this));
              
           }
          
           
	   }

});

$('.ui-item').droppable({
	  accept: '.con_anchor',
	  drop: function(event,ui){
	     var item = ui.draggable.closest('.ui-item');
	     $(this).data('connected-item',item);
	     ui.draggable.css({top:-2,left:-2});
	     item.data('lines').push(item.data('line'));
	    
	     if($(this).data('connected-lines')){
	        $(this).data('connected-lines').push(item.data('line'));
	        
	         var y2_ = parseInt(item.data('line').attr('y2'))-150;
	         item.data('line').attr('y2',y2_+$(this).data('connected-lines').length*5);
	        
	     }else $(this).data('connected-lines',[item.data('line')]);
	    
	     item.data('line',null);
	    console.log('dropped');
	  }
	});


	$('.con_anchor').draggable({
	     containment: "#dropHere",
	     drag: function( event, ui ) {
	       var _end = $(event.target).parent().position();
	       var end = $(event.target).position();
	       if(_end&&end) 	
	       $(event.target).parent().data('line')
	                                .attr('x2',end.left+_end.left+5).attr('y2',end.top+_end.top+2-150);
				},
	  	 stop: function(event,ui) {
	        if(!ui.helper.closest('.ui-item').data('line')) return;
	        ui.helper.css({top:-2,left:-2});
	        ui.helper.closest('.ui-item').data('line').remove();
	        ui.helper.closest('.ui-item').data('line',null);
	        console.log('stopped');
	      }
	});


	$('.con_anchor').on('mousedown',function(e){
	    var cur_ui_item = $(this).closest('.ui-item');
	    var connector = $('#connector_canvas');
	    var cur_con;
	  
	  if(!$(cur_ui_item).data('lines')) $(cur_ui_item).data('lines',[]);
	  
	  if(!$(cur_ui_item).data('line')){
	         cur_con = $(document.createElementNS('http://www.w3.org/2000/svg','line'));
	         cur_ui_item.data('line',cur_con);
	    } else cur_con = cur_ui_item.data('line');
	  
	    connector.append(cur_con);
	    var start = cur_ui_item.position();
	    console.log(start);
	     cur_con.attr('x1',start.left).attr('y1',start.top+1-150);
	     cur_con.attr('x2',start.left+1).attr('y2',start.top+1-150);
	});

$( ".item-t" ).dblclick(function() {

var $cloned = $(this).clone();
var position= $(this).position();
$(this).removeClass( "item-t" ).addClass("OpenTable");
 $('#dropHere').append(this);
 $cloned.css({"margin-top":"5px","background-color": "#85908e"});
 $cloned.removeClass( "uu-i ui-item item-1 ui-draggable ui-draggable-handle ui-droppable" ).addClass( "ui-item item-t ui-draggable ui-draggable-handle ui-droppable" );

 $('#fst').append($cloned);

 clearTable();
	var cname= this.innerText;
	var saveData = $.ajax({
		url : "/SmartQA/getComponentValue?Cname="+cname,
		type : "GET",
		dataType:"json",   
		success : function(resultData) {
			for (i = 0; i < resultData.length; i++) { 
				if(resultData[i].action==undefined){
					resultData[i].action="--";
				}
				if(resultData[i].target==undefined){
					resultData[i].target="--";
				}
				if(resultData[i].targetType==undefined){
					resultData[i].targetType="--";
				}
				if(resultData[i].arguments==undefined){
					resultData[i].arguments="--";
				}
			}
			
			
			console.log(resultData)
			var trHTML = '';
	for (i = 0; i < resultData.length; i++) { 
		  trHTML += 
		      '<tr><td>' + resultData[i].action + 
		      '</td><td>' + resultData[i].target + 
		      '</td><td>' + resultData[i].targetType + 
		      '</td><td><input value=' + resultData[i].arguments + 
		      '></td></tr>'; 
		
	}

$('#CompotentDataTable').append(trHTML); 
$( "#details" ).show();

		}
	});
	return false;
		
 
});

$( ".item-r" ).dblclick(function() {

	$('label',this).remove();    
	var $cloned = $(this).clone();
	var position= $(this).position();
	$(this).removeClass( "item-r" ).addClass("OpenTable");
	 $('#dropHere').append(this);
	 $cloned.css({"margin-top":"5px","background-color": "#85908e"});
	 $cloned.removeClass( "uu-i ui-item item-1 ui-draggable ui-draggable-handle ui-droppable" ).addClass( "ui-item item-r ui-draggable ui-draggable-handle ui-droppable" );
	 $('#scnd').append($cloned);

	 clearTable();
		var cname= this.innerText;
		var saveData = $.ajax({
			url : "/SmartQA/getComponentValue?Cname="+cname,
			type : "GET",
			dataType:"json",   
			success : function(resultData) {
				for (i = 0; i < resultData.length; i++) { 
					if(resultData[i].action==undefined){
						resultData[i].action="--";
					}
					if(resultData[i].target==undefined){
						resultData[i].target="--";
					}
					if(resultData[i].targetType==undefined){
						resultData[i].targetType="--";
					}
					if(resultData[i].arguments==undefined){
						resultData[i].arguments="--";
					}
				}
				
				
				console.log(resultData)
				var trHTML = '';
		for (i = 0; i < resultData.length; i++) { 
			  trHTML += 
			      '<tr><td>' + resultData[i].action + 
			      '</td><td>' + resultData[i].target + 
			      '</td><td>' + resultData[i].targetType + 
			      '</td><td><input value=' + resultData[i].arguments + 
			      '></td></tr>';    
			  
			
		}

	  $('#CompotentDataTable').append(trHTML);
	  $( "#details" ).show();

			}
		});
		return false;
			
	});

$( ".item-s" ).dblclick(function() {

	$('label',this).remove();    
	var $cloned = $(this).clone();
	var position= $(this).position();
	$(this).removeClass( "item-s" ).addClass("OpenTable");
	 $('#dropHere').append(this);
	 $cloned.css({"margin-top":"5px","background-color": "#85908e"});
	 $cloned.removeClass( "uu-i ui-item item-1 ui-draggable ui-draggable-handle ui-droppable" ).addClass( "ui-item item-r ui-draggable ui-draggable-handle ui-droppable" );
	 $('#thrd').append($cloned);

	 clearTable();
		var cname= this.innerText;
		var saveData = $.ajax({
			url : "/SmartQA/getComponentValue?Cname="+cname,
			type : "GET",
			dataType:"json",   
			success : function(resultData) {
				for (i = 0; i < resultData.length; i++) { 
					if(resultData[i].action==undefined){
						resultData[i].action="--";
					}
					if(resultData[i].target==undefined){
						resultData[i].target="--";
					}
					if(resultData[i].targetType==undefined){
						resultData[i].targetType="--";
					}
					if(resultData[i].arguments==undefined){
						resultData[i].arguments="--";
					}
				}
				
				
				console.log(resultData)
				var trHTML = '';
		for (i = 0; i < resultData.length; i++) { 
			  trHTML += 
			      '<tr><td>' + resultData[i].action + 
			      '</td><td>' + resultData[i].target + 
			      '</td><td>' + resultData[i].targetType + 
			      '</td><td><input value=' + resultData[i].arguments + 
			      '></td></tr>';   
			
		}

	  $('#CompotentDataTable').append(trHTML);
	  $( "#details" ).show();

			}
		});
		return false;
			
	});

$( ".item-p" ).dblclick(function() {

	var $cloned = $(this).clone();
	var position= $(this).position();
	$(this).removeClass( "item-p" ).addClass("OpenTable");
	 $('#dropHere').append(this);
	 $cloned.css({"margin-top":"5px","background-color": "#85908e"});
	 $cloned.removeClass( "uu-i ui-item item-1 ui-draggable ui-draggable-handle ui-droppable" ).addClass( "ui-item item-r ui-draggable ui-draggable-handle ui-droppable" );
	 $('#frth').append($cloned);

	 clearTable();
		var cname= this.innerText;
		var saveData = $.ajax({
			url : "/SmartQA/getComponentValue?Cname="+cname,
			type : "GET",
			dataType:"json",   
			success : function(resultData) {
				for (i = 0; i < resultData.length; i++) { 
					if(resultData[i].action==undefined){
						resultData[i].action="--";
					}
					if(resultData[i].target==undefined){
						resultData[i].target="--";
					}
					if(resultData[i].targetType==undefined){
						resultData[i].targetType="--";
					}
					if(resultData[i].arguments==undefined){
						resultData[i].arguments="--";
					}
				}
				
				
				console.log(resultData)
				var trHTML = '';
		for (i = 0; i < resultData.length; i++) { 
			  trHTML += 
			      '<tr><td>' + resultData[i].action + 
			      '</td><td>' + resultData[i].target + 
			      '</td><td>' + resultData[i].targetType + 
			      '</td><td><input value=' + resultData[i].arguments + 
			      '></td></tr>';    
			
		}

	  $('#CompotentDataTable').append(trHTML);
	  $( "#details" ).show();

			}
		});
		return false;
			
	});


function SaveFtn(){
	var flowname = $("#FlowName").val();
	if(flowname==""){
	alert("Please enter flow-name");
	}else{
	window.location.href = "./smartBridgeSave?FlowName="+flowname;
	}
	
}

function refreshFtn(){
	//$("#image1").hide();
	 location.reload();
	
}
function showTemplate(){
	$(".link").show();
	$(".OpenTable").show();
	
}

function argumentsSave(){
	//alert("Values saved");
	$( "#details" ).hide();
	$("#successMsg").show();
	$('#successMsg').delay(1000).fadeOut(500);
	
}

$( "#exitPanel" ).click(function()  {
	$( "#details" ).hide();
});


function clearTable(){
	var tableRef = document.getElementById('CompotentDataTable');
	 while ( tableRef.rows.length > 0 )
	 {
	  tableRef.deleteRow(0);
	 }
}


