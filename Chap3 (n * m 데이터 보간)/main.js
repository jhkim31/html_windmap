var gridData = [
    -1.1,-3.5,
    -5.9,0.7,
    0.8,-4.0,
    3.2,-6.6,
    -2.0,-3.9,
    -5.4,2.9,
    -6.9,-5.0,
    6.5,5.4,
    -2.1,-3.7,
    1.7,-1.4,
    -6.3,-3.4,
    2.8,5.5,
    0.0,0.7,
    -3.0,1.4,
    -5.6,4.4,
    -4.7,5.9,
    6.9,0.9,
    5.8,3.9,
    0.6,6.8,
    1.2,3.1,
    -6.9,1.8,
    2.9,2.6,
    2.9,3.7,
    3.4,-5.6,
    -5.4,0.9,
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

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        
        for (i = 0; i < 1000; i++) {
            ctx.beginPath()
            var x = getRandomArbitrary(0, cnx)
            var y = getRandomArbitrary(0, cny)
            resultVector = getVector(x, y)
            ctx.strokeStyle = "gray"
            ctx.moveTo(x, y);
            ctx.lineTo(x + resultVector[0] * 10, y + resultVector[1] * 8);
            ctx.lineWidth = 2
            ctx.stroke();
            ctx.closePath()
        }

    }
}



