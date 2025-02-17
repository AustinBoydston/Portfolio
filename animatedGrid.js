window.onload = function() {
    var canvas = document.getElementById("GridCanvas");
    var context = canvas.getContext("2d");
   
   
    var circles = [];
    
    //Create the circle that follows the mouse
    var mouseCircle =  {
        x: window.innerWidth/2,
        y: window.innerHeight/2,
        radius: 1,
        dx: 1,
        dy: 1,
        color: getColor()
    }

    var numberOfCircles = setAmountOfCircles();
    //distance to check if circles are close
    var dist_ = 120;

    //fit the canvas to the current screen size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

    //sets the amount of circles based on the size of the screen
    function setAmountOfCircles(){
        y = window.innerHeight;
        x = window.innerWidth;
        amount = Math.sqrt((x*x) + (y*y))/11;
        return amount; 
    }

    
//This function controls the color of the animation
    function getColor() {
        color ='#00ff55';
        //Gree hacker color
       // color = '#00c71e';
        return color;
    }

    function drawCircles() {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        //TextContext.clearRect(0, 0, IntroText.width, IntroText.height);
         // Set glow effect
        context.shadowBlur = 10; // Adjust the blur radius for the glow
        context.shadowColor = getColor(); // Color of the glow 
        
        circles.forEach(function(circle) {
            // Draw each circle
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
            context.fillStyle = getColor();
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = getColor();
            context.stroke();
            
            // Update circle position
            circle.x += circle.dx;
            circle.y += circle.dy;

            // Bounce off the walls
            if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
                circle.dx = -circle.dx;
            }
            if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
                circle.dy = -circle.dy;
            }

            
    
        });
        //draw mouse circle
        context.beginPath();
        context.arc(mouseCircle.x, mouseCircle.y, mouseCircle.radius, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();


        closeCircles = detectCloseCircles(circles, dist_, mouseCircle);

        //loop through the close circles and draw a line
        closeCircles.forEach(function(circlePair){
                // Draw the line connecting the circles
                context.beginPath();
                context.moveTo(circlePair[0].x, circlePair[0].y);
                context.lineTo(circlePair[1].x, circlePair[1].y);
                context.stroke();        

        });
       
        requestAnimationFrame(drawCircles); // Request the next frame
    }

    //Calculate the distance between the two given circles
    function areCirclesWithinDistance(circle1, circle2, distance) {
        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distanceBetweenCircles = Math.sqrt(dx * dx + dy * dy);
        return distanceBetweenCircles <= distance;
    }
    
    // Detect is a circle is close to to all the others
    function detectCloseCircles(circles, thresholdDistance, mouseCircle) {
        var closePairs = [];
        
        for (var i = 0; i < circles.length; i++) {
            if (areCirclesWithinDistance(circles[i], mouseCircle, thresholdDistance)){
                closePairs.push([circles[i], mouseCircle])
            }
            for (var j = i + 1; j < circles.length; j++) {
                if (areCirclesWithinDistance(circles[i], circles[j], thresholdDistance) && areCirclesWithinDistance(circles[j], mouseCircle, thresholdDistance + 100)) {
                    closePairs.push([circles[i], circles[j]]);
                }
               
            }
        }
        
        return closePairs;
    }



    function isMouseOverCircle(mouseX, mouseY) {
        var dx = mouseX - circle.x;
        var dy = mouseY - circle.y;
        return Math.sqrt(dx * dx + dy * dy) < circle.radius + dist_;
    }

   

    function updateMouseCircle(x, y){
        mouseCircle.x = x;
        mouseCircle.y = y;
        mouseCircle.dx = x;
        mouseCircle.dy = y;
    }

    

    //resize the canvas to the screen size
    canvas.width = window.innerWidth;
    
    window.addEventListener("resize", resizeCanvas);
    //window.addEventListener("resize", moveIntro);

    resizeCanvas();
   var mouseThrottleTimeout = null
    canvas.addEventListener("mousemove", function(event) {
        if (!mouseThrottleTimeout){
            mouseThrottleTimeout = setTimeout(function(){
                var rect = canvas.getBoundingClientRect();
                var mouseX = event.clientX - rect.left;
                var mouseY = event.clientY - rect.top;
                updateMouseCircle(mouseX, mouseY);
                const revealed_Area = document.querySelector(".revealedArea");
                const gradientCenterX = (event.clientX / window.innerWidth ) * 100;
                const gradientCenterY = (event.clientY / window.innerHeight) * 100;
                revealed_Area.style.background = `radial-gradient(circle 340px at ${gradientCenterX}% ${gradientCenterY}%, transparent 70%, rgba(0,0,0,0.70) )`; 


                mouseThrottleTimeout = null;

            }, 10); 
            }
        
    });
    // moveIntro();
    //refactor into function later
    // Create 100 circles with random positions and velocities
    for (var i = 0; i < numberOfCircles; i++) {
        circles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 1,
            dx: (Math.random() - 0.5),
            dy: (Math.random() - 0.5),
            color: getColor()
        });
    }
    drawCircles(); // Start the animation
}
