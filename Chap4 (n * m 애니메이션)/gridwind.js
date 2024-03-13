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
    build();
    anim()

}


function build() {
    cn = document.getElementById('cw')
    cnx = cn.width - 1
    cny = cn.height - 1
    c = cn.getContext('2d');
    c.linewidth = "1";
    for (i = 0; i < 1000; i++) {
        buildobj(i)
    }
}

function buildobj(i) {
    x = getRandomArbitrary(0, cnx)
    y = getRandomArbitrary(0, cny)
    a[i] = new ob(x, y, i, currentFrame)
}
function removeObj(index) {
    buildobj(index)
    return 0;
}
function ob(x, y, index, frame) {
    this.index = index
    this.x = x;
    this.y = y;
    this.frame = frame

    this.dr = function () {

        if (this.x > cnx || this.y > cny || this.x < 0 || this.y < 0) {
            return removeObj(this.index)

        } else {
            if (currentFrame - this.frame > getRandomArbitrary(50, 250)) {
                removeObj(this.index)
            }
            // console.log(this.frame)
            const ls = {
                x: this.x,
                y: this.y
            };
            nextVec = getVector(ls.x, ls.y)
            this.x = ls.x + nextVec[0]
            this.y = ls.y + nextVec[1]
            c.beginPath();
            c.lineWidth = 3;
            c.strokeStyle = 'black'

            c.moveTo(ls.x, ls.y);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath();
        }
    }
}
var currentFrame = 0
function anim() {
    currentFrame++
    requestAnimationFrame(anim);
    c.fillStyle = "rgba(255, 255, 255, 0.15)"
    c.fillRect(0, 0, cn.width, cn.height);
    a.forEach(function (e, i) {
        e.dr();
    });
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



