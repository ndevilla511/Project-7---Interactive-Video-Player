var captions = document.getElementById("captions");
var captionsList = captions.children;

//As video progresses
video.addEventListener("timeupdate", function() {
    var currentTime = video.currentTime;
    //loop through all span elements in the captions paragraph
    for (var i = 0; i < captionsList.length; i++) {
        //if the current time of the video is between the values in the datasets for this span element
        if (!video.paused && currentTime >= parseFloat(captionsList[i].dataset.starttime) && currentTime <= parseFloat(captionsList[i].dataset.endtime)) {
            //change the color
            captionsList[i].style.color = "#369";
        } else {
            captionsList[i].style.color = "black";
        }
    }
});

//For each span element in captions paragraph
for (var i = 0; i < captionsList.length; i++) {
    //When clicked
    captionsList[i].addEventListener("click", function() {
        var startTime = parseFloat(this.dataset.starttime);
        //skip to the time in the video where this particular caption starts
        video.currentTime = startTime;
    });
}
