var canvas = document.createElement('canvas');
// alert();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
ctx.lineWidth = '1';

// Size of edge
edge = 150;
vertices = [];

//Initial Angles
var ThetaX = Math.PI/4;
var ThetaY = Math.PI/3;
var ThetaZ = Math.PI/4;

// Initial Drag
var drag = 0.9999;
dx = 0;
dy = 0;
dz = 0;

function resetDefaults(){
    //Initial Angles
    var ThetaX = Math.PI/3;
    var ThetaY = Math.PI/3;
    var ThetaZ = Math.PI/3;
    dx = 0;
    dy = 0;
    dz = 0;
}

vertices.push([edge,edge,edge]);
vertices.push([-edge,edge,edge]);
vertices.push([-edge,-edge,edge]);
vertices.push([edge,-edge,edge]);

vertices.push([edge,edge,edge]);
vertices.push([edge,edge,-edge]);
vertices.push([-edge,edge,-edge]);
vertices.push([-edge,-edge,-edge]);

vertices.push([edge,-edge,-edge]);
vertices.push([edge,edge,-edge]);
vertices.push([edge,-edge,-edge]);
vertices.push([edge,-edge,edge]);

vertices.push([-edge,-edge,edge]);
vertices.push([-edge,-edge,-edge]);
vertices.push([-edge,edge,-edge]);
vertices.push([-edge,edge,edge]);

function clearCanvas() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
}

function Draw3d(x,y,z){
    
    // First Matrix Multiplication
    X_r_Z = x*Math.cos(ThetaZ)+y*Math.sin(ThetaZ);
    Y_r_Z = y*Math.cos(ThetaZ)-x*Math.sin(ThetaZ);
    Z_r_Z = z;

    // Second Matrix Multplication
    X_r_YZ = X_r_Z*Math.cos(ThetaY)-Z_r_Z*Math.sin(ThetaY);
    Y_r_YZ = Y_r_Z
    Z_r_YZ = X_r_Z*Math.sin(ThetaY)+Z_r_Z*Math.cos(ThetaY);

    // Third Matrix Multiplication
    X_r_XYZ = X_r_YZ
    Y_r_XYZ = Y_r_YZ*Math.cos(ThetaX)+Z_r_YZ*Math.sin(ThetaX);
    Z_r_XYZ = Z_r_YZ*Math.cos(ThetaX)-Y_r_YZ*Math.sin(ThetaX);

    return [X_r_XYZ,Y_r_XYZ];
}

function drawCube(){
    clearCanvas();
    var pixelVertex = [];
    for(i=0; i<vertices.length; i++){
        var XYinEdge = Draw3d(vertices[i][0],vertices[i][1],vertices[i][2]);
        var XYinPixels = [XYinEdge[0]+window.innerWidth/2,-XYinEdge[1]+window.innerHeight/2];
        pixelVertex.push(XYinPixels);
    }

    for(i=0; i<vertices.length-1;i++){
        ctx.beginPath();
        ctx.moveTo(pixelVertex[i][0],pixelVertex[i][1]);
        ctx.lineTo(pixelVertex[i+1][0],pixelVertex[i+1][1]);
        ctx.stroke();
    }


        // ctx.fillStyle = '#ccc';

        // ctx.beginPath();
        // ctx.moveTo(pixelVertex[0][0],pixelVertex[0][1]);
        // ctx.lineTo(pixelVertex[1][0],pixelVertex[1][1]);
        // ctx.lineTo(pixelVertex[2][0],pixelVertex[2][1]);
        // ctx.lineTo(pixelVertex[3][0],pixelVertex[3][1]);
        // ctx.closePath();
        // // correct
        // if((ThetaY*57.2958)%360>90 && (ThetaY*57.2958)%360<270){
        //     ctx.fill();
        //     ctx.stroke();
        // }
        

        // ctx.beginPath();
        // ctx.moveTo(pixelVertex[8][0],pixelVertex[8][1]);
        // ctx.lineTo(pixelVertex[7][0],pixelVertex[7][1]);
        // ctx.lineTo(pixelVertex[2][0],pixelVertex[2][1]);
        // ctx.lineTo(pixelVertex[3][0],pixelVertex[3][1]);
        // ctx.closePath();
        // // never shown
        // // if((ThetaY*57.2958)%360>180){
        //     ctx.fill();
        // // }
        // //ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(pixelVertex[0][0],pixelVertex[0][1]);
        // ctx.lineTo(pixelVertex[5][0],pixelVertex[5][1]);
        // ctx.lineTo(pixelVertex[8][0],pixelVertex[8][1]);
        // ctx.lineTo(pixelVertex[3][0],pixelVertex[3][1]);
        // ctx.closePath();

        
        // // Never Shown
        // // if((ThetaY*57.2958)%360>180){
        // //     ctx.fill();
        // // }
        // //ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(pixelVertex[0][0],pixelVertex[0][1]);
        // ctx.lineTo(pixelVertex[1][0],pixelVertex[1][1]);
        // ctx.lineTo(pixelVertex[6][0],pixelVertex[6][1]);
        // ctx.lineTo(pixelVertex[5][0],pixelVertex[5][1]);
        // ctx.closePath();
        // //correct only fill
        // // if((ThetaY*57.2958)%360<180){
        //     ctx.fill();
        // // }
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(pixelVertex[6][0],pixelVertex[6][1]);
        // ctx.lineTo(pixelVertex[5][0],pixelVertex[5][1]);
        // ctx.lineTo(pixelVertex[8][0],pixelVertex[8][1]);
        // ctx.lineTo(pixelVertex[7][0],pixelVertex[7][1]);
        // ctx.closePath();
        // //correct
        // if((ThetaY*57.2958)%360<90 || (ThetaY*57.2958)%360>270){
        //     ctx.fill();
        //     ctx.stroke();   
        // }
        
        
        // ctx.beginPath();
        // ctx.moveTo(pixelVertex[1][0],pixelVertex[1][1]);
        // ctx.lineTo(pixelVertex[6][0],pixelVertex[6][1]);
        // ctx.lineTo(pixelVertex[7][0],pixelVertex[7][1]);
        // ctx.lineTo(pixelVertex[2][0],pixelVertex[2][1]);
        // ctx.closePath();
        // // correct only fill
        // //if((ThetaY*57.2958)%360<180){
        //     ctx.fill();
        // //}
        // ctx.stroke();

}

t = undefined

function AnimateCube(){
    dx = drag*dx;
    dy = drag*dy;
    dz = drag*dz;

    ThetaX += dx;
    ThetaY += dy;
    ThetaZ += dz;

    if(Math.abs(dy) < 0.001){
        dy = 0
    }
    if(Math.abs(dx) < 0.001){
        dx = 0
    }

    drawCube();
    console.log(dx,dy,dz)
    if(t == undefined || Math.abs(dx) > 0 || Math.abs(dy) != 0){
        t = window.requestAnimationFrame(AnimateCube);
    }
    // console.log(t)
}




start = 0

canvas.addEventListener("mousedown",function(r){
    drag = 0.997;
});

canvas.addEventListener("mousedown",function(e){
    start = [e.pageX,e.pageY];
    canvas.addEventListener("mousemove",draggingTheCube);
});

function draggingTheCube(e){
    //resetDefaults();
    distY = e.pageX-start[0];
    distX = e.pageY-start[1];

    if(Math.abs(distY) > Math.abs(distX)){
        dy = dy + 0.00001*distY;
    }else{
        dx = dx + 0.00001*distX;
    }

    AnimateCube();
}

canvas.addEventListener("mouseup",endAnimation);
canvas.addEventListener("mouseleave",endAnimation);

function endAnimation(e){
    drag = 0.9999;
    if(t && dx == 0 && dy == 0){
        window.cancelAnimationFrame(t);
        t = undefined
    }
    canvas.removeEventListener("mousemove",draggingTheCube);
}

drawCube();
document.body.appendChild(canvas)