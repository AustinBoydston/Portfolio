window.onload() = function(){

    var IntroText = document.getElementById("Introduction");

    
    function moveIntro(){   
        //Set the intro text to the center of the canvas (CENTER THE DIV)
        leftPos = (canvas.width - IntroText.offsetWidth) / 2;
        topPos = (canvas.height - IntroText.offsetHeight) / 2;
        IntroText.style.top = `${topPos}px`;
        IntroText.style.left = `${leftPos}px`;
    }
}