window.onload = function() {
    var canvas = document.getElementById("GridCanvas");
    var context = canvas.getContext("2d");

    var circles = [];
    var numberOfCircles = 250;

    // Create 100 circles with random positions and velocities
    for (var i = 0; i < numberOfCircles; i++) {
        circles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 1,
            dx: (Math.random() - 0.5),
            dy: (Math.random() - 0.5),
            color: getRandomColor()
        });
    }

    function getRandomColor() {
        color = '#00c71e';
        return color;
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function drawCircles() {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        circles.forEach(function(circle) {
            // Draw each circle
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
            context.fillStyle = circle.color;
            context.fill();
            context.lineWidth = .5;
            context.strokeStyle = '#00c71e';
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
        
        closeCircles = detectCloseCircles(circles, 100);

        //loop through the close circles and draw a line
        closeCircles.forEach(function(circlePair){
                // Draw the line connecting the circles
                context.beginPath();
                context.moveTo(circlePair[0].x, circlePair[0].y);
                context.lineTo(circlePair[1].x, circlePair[1].y);
                context.strokeStyle = '#00c71e';
                context.lineWidth = 2;
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
    function detectCloseCircles(circles, thresholdDistance) {
        var closePairs = [];
        
        for (var i = 0; i < circles.length; i++) {
            for (var j = i + 1; j < circles.length; j++) {
                if (areCirclesWithinDistance(circles[i], circles[j], thresholdDistance)) {
                    closePairs.push([circles[i], circles[j]]);
                }
            }
        }
        
        return closePairs;
    }



    function isMouseOverCircle(mouseX, mouseY) {
        var dx = mouseX - circle.x;
        var dy = mouseY - circle.y;
        return Math.sqrt(dx * dx + dy * dy) < circle.radius;
    }

    canvas.addEventListener("mousemove", function(event) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        if (isMouseOverCircle(mouseX, mouseY)) {
            circle.color = "red"; // Change color if the mouse is over the circle
        } else {
            circle.color = "blue";
        }

        
    });

    drawCircles(); // Start the animation
}
