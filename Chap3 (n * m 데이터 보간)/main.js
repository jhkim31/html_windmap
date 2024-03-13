window.gridData = [
    -4.1,-3.5,
    -5.9,3.7,
    3.8,-4.0,
    3.2,-5.6,
    -2.0,-3.9,
    -5.4,2.9,
    -5.9,-5.0,
    5.5,5.4,
    -2.1,-3.7,
    4.7,-4.4,
    -5.3,-3.4,
    2.8,5.5,
    3.0,3.7,
    -3.0,4.4,
    -5.6,4.4,
    -4.7,5.9,
    5.9,3.9,
    5.8,3.9,
    3.6,5.8,
    4.2,3.1,
    -5.9,4.8,
    2.9,2.6,
    2.9,3.7,
    3.4,-5.6,
    -5.4,3.9,
]
var cn;
var c;
var a = []
var cnx;
var cny;
var gridxPx
var gridyPx
window.onload = function myfunction() {
    readGrid()
    draw();

}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var interpolate = function (x, y, g00, g10, g01, g11) {
    d1 = x
    d2 = 1 - x

    let x1_vector_x = d1 * g10[0] + d2 * g00[0]
    let x1_vector_y = d1 * g10[1] + d2 * g00[1]
    let x2_vector_x
    let x2_vector_y
    try {
        x2_vector_x = d1 * g11[0] + d2 * g01[0]
        x2_vector_y = d1 * g11[1] + d2 * g01[1]
    } catch (error) {
        debugger;
        console.error(error)
        console.log(x, y)
        console.log(g00[0], g00[1])
    }

    d3 = y
    d4 = 1 - y
    result_vector_x = d3 * x2_vector_x + d4 * x1_vector_x
    result_vector_y = d3 * x2_vector_y + d4 * x1_vector_y
    result_vector_scale = Math.sqrt(result_vector_x * result_vector_x + result_vector_y * result_vector_y)

    result_vector = [result_vector_x, result_vector_y, result_vector_scale]
    //console.log(result_vector)
    return result_vector
}
var grid = []
function readGrid() {
    cn = document.getElementById('canvas')
    cn.width = 1200
    cn.height = 1200
    cnx = cn.width - 1
    cny = cn.height - 1
    count = 0
    for (i = 0; i < gridData.length / 2; i++) {
        grid[i] = []
        grid[i][0] = gridData[count++]
        grid[i][1] = gridData[count++]
    }
}



function selectGrid(x, y) {
    gridxPx = cnx / 4
    gridyPx = cny / 4

    gridx = parseInt(x / gridxPx)
    gridy = parseInt(y / gridyPx)
    gridn = gridx + gridy * 5
    //console.log(gridn)

    return gridn
}

function getVector(x, y) {
    gridn = selectGrid(x, y);

    g00 = grid[gridn]
    g10 = grid[gridn + 1]
    g01 = grid[gridn + 5]
    g11 = grid[gridn + 6]
    x = (x % gridxPx) / gridxPx
    y = (y % gridyPx) / gridyPx

    return interpolate(x, y, g00, g10, g01, g11)
}

function draw() {
    var canvas = document.getElementById("canvas");

    function dotDrawing(ctx, x, y, r, color) {
        if (ctx != null) {
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(x, y, r, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.restore();
        }
      }

    function arrowDrawing(ctx, sx, sy, ex, ey, color) {
        if (ctx != null) {
          var aWidth = 5;
          var aLength = 10;
          var dx = ex - sx;
          var dy = ey - sy;
          var angle = Math.atan2(dy, dx);
          var length = Math.sqrt(dx * dx + dy * dy);
    
          //두점 선긋기
          ctx.translate(sx, sy);
          ctx.rotate(angle);
          ctx.fillStyle = color;
          ctx.beginPath();
    
          //화살표 모양 만들기
          ctx.moveTo(length - aLength, -aWidth);
          ctx.lineTo(length, 0);
          ctx.lineTo(length - aLength, aWidth);
    
          ctx.fill();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }

      function lineDrawing(ctx, sx, sy, ex, ey, color) {
        if (ctx != null) {
          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = color;
          if (color == 'red'){
            ctx.lineWidth = 2;
          } else {
              ctx.lineWidth = 1;
          }
          
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          ctx.restore();
        }
      }

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        for (x = 100; x < 1000; x += 40){
            for(y = 100; y < 1000; y += 40){
                var color = 'black';
                if ((x - 100) % 200 == 0 && (y - 100) % 200 == 0){
                    color = 'red'
                }
                ctx.beginPath()    
                resultVector = getVector(x, y)
                dotDrawing(ctx, x, y, 2, color)
                lineDrawing(ctx, x, y, x + resultVector[0] * 5, y + resultVector[1] * 5, color)
                arrowDrawing(ctx, x, y, x + resultVector[0] * 6, y + resultVector[1] * 6, color)
                // ctx.strokeStyle = "gray"
                // ctx.moveTo(x, y);
                // ctx.lineTo(x + resultVector[0] * 5, y + resultVector[1] * 5);
                // ctx.lineWidth = 2
                // ctx.stroke();

                // ctx.moveTo(x + resultVector[0] * 5, y + resultVector[1] * 5);
                // ctx.lineTo(100, 75);
                // ctx.lineTo(100, 25);
                // ctx.fill();
                // ctx.closePath()
            }
        }

    }
}



