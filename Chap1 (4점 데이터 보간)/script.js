var A = [
    { 'x': 0, 'y': 0, 'vector_x': -3, 'vector_y': 5 },
    { 'x': 500, 'y': 0, 'vector_x': -4, 'vector_y': 2 },
    { 'x': 0, 'y': 500, 'vector_x': 4, 'vector_y': -3 },
    { 'x': 500, 'y': 500, 'vector_x': 5, 'vector_y': 2 }
  ]

for (i = 0; i < 4; i++){
    A[i].vector_x *= 15
    A[i].vector_y *= 15
}

function getVector(vec_x, vec_y) {
    var x = vec_x
    var y = vec_y

    d1 = x - A[0]['x']
    d2 = A[1]['x'] - x

    let x1_vector_x = (d1 / (d1 + d2)) * A[1].vector_x + (d2 / (d1 + d2)) * A[0].vector_x
    let x1_vector_y = (d1 / (d1 + d2)) * A[1].vector_y + (d2 / (d1 + d2)) * A[0].vector_y
    // console.log('x1x = ', x1_vector_x)
    // console.log('x1y = ', x1_vector_y)

    let x1 = { 'x': x, 'y': A[0].y, 'vector_x': x1_vector_x, 'vector_y': x1_vector_y }
    // console.log('x1 = ', x1)
    let x2_vector_x = (d1 / (d1 + d2)) * A[3].vector_x + (d2 / (d1 + d2)) * A[2].vector_x
    let x2_vector_y = (d1 / (d1 + d2)) * A[3].vector_y + (d2 / (d1 + d2)) * A[2].vector_y
    // console.log('x2x = ', x2_vector_x)
    // console.log('x2y = ', x2_vector_y)

    let x2 = { 'x': x, 'y': A[3].y, 'vector_x': x2_vector_x, 'vector_y': x2_vector_y }
    // console.log('x2 = ' ,x2)
    d3 = y - x1.y
    d4 = x2.y - y
    
    result_vector_x = (d3 / (d3 + d4)) * x2.vector_x + (d4 / (d3 + d4)) * x1_vector_x
    // console.log('resx = ', result_vector_x)
    result_vector_y = (d3 / (d3 + d4)) * x2.vector_y + (d4 / (d3 + d4)) * x1_vector_y
    // console.log('resy = ' , result_vector_y)

    result = { 'x': x, 'y': y, 'vector_x': result_vector_x, 'vector_y': result_vector_y }

    return result
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function draw() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'gray'
        for(i = 0; i < 300; i++){
            ctx.beginPath()
            var x = getRandomArbitrary(0,500)
            var y = getRandomArbitrary(0,500)
            resultVector = getVector(x,y)
            ctx.moveTo(x,y);
            ctx.lineTo(x + resultVector.vector_x, y + resultVector.vector_y);
            ctx.lineWidth = 2
            ctx.stroke();
            ctx.closePath()
        }

    }
}


