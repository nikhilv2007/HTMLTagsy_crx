window.addEventListener('load',function(){
    //alert("hello tag metrics");
    // Call content script to analyse tags
    chrome.tabs.query({'highlighted': true, 'active': true}, function(activeTab) {
		chrome.tabs.sendMessage(activeTab[0].id,{action:'getTagsCount'},function(tagsData){
            try{
                console.log(tagsData);
                visualizePi(transformData(tagsData));
            }
            catch(err){                
                document.getElementById("progress").innerHTML = "Error occured" ;
                console.log(err);
            }
            
		});
	});
})


// ---------------------Visualisation related ---------------------------
function transformData(tagsData){
    
    var canvasJsDataPoints = [];
    
    for( var j = 0; j < tagsData.length; j++){        
        canvasJsDataPoints.push({y : tagsData[j].tagCount, legendText : tagsData[j].tagName, label : tagsData[j].tagName})
    }
    
    return canvasJsDataPoints;
}

function visualizePi(tagsDataPoints) {
    // Source - http://canvasjs.com/docs/charts/basics-of-creating-html5-chart/
    
	var chart = new CanvasJS.Chart("chartContainer",
	{
		title:{
			text: "Current page HTML tag stats",
            fontSize:20
		},
        animationEnabled: true,
		legend:{
			verticalAlign: "center",
			horizontalAlign: "left",
			fontSize: 20,
			fontFamily: "Helvetica"        
		},
		theme: "theme2",
		data: [{        
			type: "pie",       
			indexLabelFontFamily: "Garamond",       
			indexLabelFontSize: 15,
			indexLabel: "{label} - {y}(#percent %)",
			startAngle:-20,
			//showInLegend: true,
			toolTipContent:"{label} - {y} ( #percent % )",
			dataPoints: tagsDataPoints
		}]
	});
    
    // Remove loading message
    document.getElementById("progress").remove();
    
    document.getElementById("chartContainer").setAttribute("style", "height: 700px; width: 700px;");
    
    // Render chart
	chart.render();
}