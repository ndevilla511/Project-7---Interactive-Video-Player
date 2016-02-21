window.onload = function() {

    // Video
    var videoContainer = document.getElementById("video-container");
    var video = document.getElementById("video");
    var videoControls = document.getElementById("video-controls");

    // Buttons
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute");
    var ccButton = document.getElementById("cc");
    var fullScreenButton = document.getElementById("full-screen");

    // Sliders
    var volumeBar = document.getElementById("volume-bar");
    var speedBar = document.getElementById("playrate");
    var speedDisplay = document.getElementById("speed-display");

    //Time display
    var progressHolder = document.getElementById("progress");
    var progressBar = document.getElementById("progress-bar");
    var timeDisplay = document.getElementById("time-display");
    timeDisplay.textContent = "00:00" + " / " + formatTime(video.duration);

    //Hide browser default controls
    video.controls = false;

    //function to set button display values
    function setDisplay(displayValue) {
        playButton.style.display = displayValue;
        timeDisplay.style.display = displayValue;
        muteButton.style.display = displayValue;
        volumeBar.style.display = displayValue;
        ccButton.style.display = displayValue;
        fullScreenButton.style.display = displayValue;
        speedBar.style.display = displayValue;
        speedDisplay.style.display = displayValue;
    }

    //function to hide or show controls
    function controlsVisibility(value) {
        switch (value) {
            case "hide":
                setDisplay("none");
                videoControls.style.backgroundColor = "rgba(34, 34, 34, 0)";
                videoControls.style.top = "-26px";
                progressHolder.style.height = "3px";
                progressHolder.style.borderRadius = "0";
                progressBar.style.borderRadius = "0";
                break;
            case "show":
                setDisplay("inline-block");
                videoControls.style.backgroundColor = "rgba(34, 34, 34, 0.8)";
                videoControls.style.top = "-69px";
                progressHolder.style.height = "10px";
                progressHolder.style.borderRadius = "20px";
                progressBar.style.borderRadius = "20px";
                break;
        }
    }

    // Event listener for the play/pause button
    playButton.addEventListener("click", function() {
        if (playButton.src === "icons/replay.png") {

            video.currentTime = 0;
            video.play();

        } else if (video.paused == true) {
            // Play the video
            video.play();

            // Update the button text to 'Pause'
            playButton.src="icons/pause.png";
        } else {
            // Pause the video
            video.pause();

            // Update the button text to 'Play'
            playButton.src="icons/play.png";
        }
    });

    // Event listener for the mute button
    muteButton.addEventListener("click", function() {
        var currentVolume = video.volume;
        if (video.muted == false) {
            // Mute the video
            video.muted = true;

            // Update the button text
            muteButton.src = "icons/mute.png";

            //Set Volume slider to zero
            volumeBar.value = 0;
        } else {
            // Unmute the video
            video.muted = false;

            // Update the button text
            muteButton.src = "icons/volume.png";

            //Reset volume;
            volumeBar.value = currentVolume;
        }
    });

    //Event listener for volume bar
    volumeBar.addEventListener("click", function() {
        if (video.muted == true) {
            // Unmute the video
            video.muted = false;

            // Update the button text
            muteButton.src="icons/volume.png";
        }
        video.volume = volumeBar.value;
    });
    volumeBar.addEventListener("mousemove", function() {
        // Update the video volume
        video.volume = volumeBar.value;
    });

    video.textTracks[0].mode = "hidden";

    //Event listener for closed captions button
    ccButton.addEventListener("click", function() {
        var ccmode = video.textTracks[0].mode;
        if (ccmode === "hidden") {
            video.textTracks[0].mode = "showing";
            ccButton.src = "icons/ccon.png";
        } else {
            video.textTracks[0].mode = "hidden";
            ccButton.src = "icons/ccoff.png";
        }
    });

    //Eventlistener for speed bar
    speedBar.addEventListener("change", function() {
        var speedvalue = speedBar.value;
        video.playbackRate = speedvalue;
        speedDisplay.textContent = "Speed: " + speedvalue.toString() + "x";
    });

    function toggleFullScreen() {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            } else if (videoContainer.mozRequestFullScreen) {
                videoContainer.mozRequestFullScreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    // Event listener for the full-screen button
    fullScreenButton.addEventListener("click", function() {
        toggleFullScreen();
    });

    document.addEventListener("MSFullscreenChange", function () {
       if (document.msFullscreenElement) {
           videoContainer.style.width = "100%";
           videoContainer.style.height = "100%";
           fullScreenButton.src = "icons/smallscreen.png";
       } else {
           videoContainer.style.width = "900px";
           videoContainer.style.height = "506px";
           fullScreenButton.src = "icons/fullsize.png";
       }
    }, false);
    document.addEventListener("mozfullscreenchange", function () {
        if (document.mozFullScreen) {
            videoContainer.style.width = "100%";
            videoContainer.style.height = "100%";
            fullScreenButton.src = "icons/smallscreen.png"
        } else {
            videoContainer.style.width = "900px";
            videoContainer.style.height = "506px";
            fullScreenButton.src = "icons/fullsize.png";
        }
    }, false);
    document.addEventListener("webkitfullscreenchange", function () {
        if (document.webkitIsFullScreen) {
            videoContainer.style.width = "100%";
            videoContainer.style.height = "100%";
            fullScreenButton.src = "icons/smallscreen.png";
        } else {
            videoContainer.style.width = "900px";
            videoContainer.style.height = "506px";
            fullScreenButton.src = "icons/fullsize.png";
    }
    }, false);


    //function to convert time (in seconds) to mm:ss format
    function formatTime(seconds) {
        var mins = Math.floor(seconds/60);
        var secs = seconds % 60;
        var tock = (mins < 10 ? "0" : "" ) + mins + ":" + (secs < 10 ? "0" : "" ) + Math.floor(secs);
        return tock;
    }

    video.addEventListener('loadedmetadata', function() {
        timeDisplay.textContent = "00:00" + " / " + formatTime(video.duration);
    });

    var mouseDown = false;

    document.addEventListener("mousedown", function() {
        mouseDown = true;
    });

    document.addEventListener("mouseup", function() {
        mouseDown = false;
    });


    //Event listener for progress bar when dragging
    progressHolder.addEventListener("mousemove", function(event) {
        if (mouseDown) {
            var mouseX = event.pageX - videoControls.offsetLeft;
            var newtime = mouseX * video.duration / progressHolder.offsetWidth;
            video.currentTime = newtime;
            progressBar.style.width = (mouseX / progressHolder.offsetWidth).toString() + "%";
        }
    });

    //Event listener for progress bar when clicking
    progressHolder.addEventListener("click", function(event) {
        var mouseX = event.pageX - videoControls.offsetLeft;
        var newtime = mouseX * video.duration / progressHolder.offsetWidth;
        video.currentTime = newtime;
        progressBar.style.width = (mouseX / progressHolder.offsetWidth).toString() + "%";
    });

    // Update the progress bar and time display as the video plays
    video.addEventListener("timeupdate", function() {
        // Calculate the slider value
        var value = (100 / video.duration) * video.currentTime;

        //Update progress bar width
        progressBar.style.width = value.toString() + "%";

        //Update time display
        timeDisplay.textContent = formatTime(video.currentTime) + " / " + formatTime(video.duration);

    });


    video.addEventListener("ended", function() {
        playButton.src = "icons/replay.png";
        controlsVisibility("show");
    });

    //if video is playing minimize video controls panel after delay and show when mouse moves over video

    var timer;

    function mouseStopped() {
        var isPlaying = video.currentTime > 0 && !video.paused && !video.ended;
        if(isPlaying) {
            controlsVisibility("hide");
            for (var i = 0; i <  video.textTracks[0].cues.length; i++) {
                video.textTracks[0].cues[i].line = -1;
            }
        }
    }

    videoContainer.addEventListener("mousemove", function () {
            controlsVisibility("show");
            for (var i = 0; i <  video.textTracks[0].cues.length; i++) {
                video.textTracks[0].cues[i].line = -3;
            }
            clearTimeout(timer);
            timer = setTimeout(mouseStopped, 1500);
    });
};