function createCircle(x, y, radius, color) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);
    return circle;
  }


function updateCirclePositions(nodes, size){
    for(let i = 0; i < size; i++){
        //update the position by getting the speed [1] multiplying that with delta (x or y) then adding that to the current position.
        circle.setAttribute("cx", circle.getAttribute("cx") + nodes[i][2] * nodes[i][1])
        circle.setAttribute("cy", circle.getAttribute("cy") + nodes[i][3] * nodes[i][1])
    }
}

nodes = [];
speed = 3;
size = 0;
for(let i = 0; i < 100; i++)    {
    sub_node = [];
    
    sub_node[0] = createCircle(Math.random() * 51, Math.random() * 51, 2,rgb(0, 203, 37));
    sub_node[1] = speed;
    sub_node[2] = Math.random() * 2 - 1;
    sub_node[3] = Math.random() * 2 - 1;
    nodes[i] = sub_node;
    size = i;
}

