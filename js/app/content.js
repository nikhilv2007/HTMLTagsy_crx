var tagsData = [];

chrome.extension.onMessage.addListener(function(request, sender, callback){
	
    //console.log("Tag Metrics : Starting");
    
    if (request.action == 'getTagsCount'){
        computeTagMetrics(document.childNodes[document.childNodes.length-1]);        
    }
    
    //console.log("Tag Metrics : Completed");
    //console.log(tagsData);
    
    callback(tagsData);
})

// Depth first recursive function
function computeTagMetrics(element){
    
    if (element.hasChildNodes()){
        for (var i = 0; i < element.childNodes.length; i ++){
            computeTagMetrics(element.childNodes[i])
        }
    }
    
    var tag = element.nodeName.toLowerCase();
    //console.log(tag);    
    // Skip when tag has #
    if(tag.indexOf('#') > -1)
        return;
    
    for ( var j = 0; j < tagsData.length; j++ ){
        // If tag already present, increment counter
        if (tagsData[j].tagName === tag){
            tagsData[j].tagCount += 1;
            return;
        }
    }
    
    // Add the tag details
    var newContent = {tagName : tag, tagCount : 1};
    tagsData.push(newContent);
    
}