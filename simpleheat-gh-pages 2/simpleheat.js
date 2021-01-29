
function simpleheat(canvas) {
    if (!(this instanceof simpleheat)) return new simpleheat(canvas);

    this._canvas = canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;

    this._ctx = canvas.getContext('2d');
    this._width = canvas.width;
    this._height = canvas.height;

    this._max = 1;
    this._data = [];
}

simpleheat.prototype = {

    defaultRadius: 100,

    defaultGradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red'
    },

    data: function (data) {
        this._data = data;
        return this;
    },

    max: function (max) {
        this._max = max;
        return this;
    },

    add: function (point) {
        this._data.push(point);
        return this;
    },

    clear: function () {
        this._data = [];
        return this;
    },

    radius: function (r, blur) {
        blur = blur === undefined ? 100 : blur;

        // create a grayscale blurred circle image that we'll use for drawing points
        var circle = this._circle = this._createCanvas(),
            ctx = circle.getContext('2d'),
            r2 = this._r = r + blur;

        circle.width = circle.height = r2 * 2;

        ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
        ctx.shadowBlur = blur;
        ctx.shadowColor = 'black';

        ctx.beginPath();
        ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        return this;
    },

    resize: function () {
        this._width = this._canvas.width;
        this._height = this._canvas.height;
    },

    gradient: function (grad) {
        // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
        var canvas = this._createCanvas(),
            ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);

        canvas.width = 1;
        canvas.height = 256;

        for (var i in grad) {
            gradient.addColorStop(+i, grad[i]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this._grad = ctx.getImageData(0, 0, 1, 256).data;

        return this;
    },

    draw: function (minOpacity) {
        if (!this._circle) this.radius(this.defaultRadius);
        if (!this._grad) this.gradient(this.defaultGradient);

        var ctx = this._ctx;

        ctx.clearRect(0, 0, this._width, this._height);

        // draw a grayscale heatmap by putting a blurred circle at each data point
        for (var i = 0, len = this._data.length, p; i < len; i++) {
            p = this._data[i];
            ctx.globalAlpha = Math.min(Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity), 1);
            ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
        }

        // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
        var colored = ctx.getImageData(0, 0, this._width, this._height);
        this._colorize(colored.data, this._grad);
        ctx.putImageData(colored, 0, 0);

        return this;
    },

    _colorize: function (pixels, gradient) {
        for (var i = 0, len = pixels.length, j; i < len; i += 4) {
            j = pixels[i + 3] * 4; // get gradient color from opacity value

            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    },

    _createCanvas: function () {
        if (typeof document !== 'undefined') {
            return document.createElement('canvas');
        } else {
            // create a new canvas instance in node.js
            // the canvas class needs to have a default constructor without any parameter
            return new this._canvas.constructor();
        }
    }
};


import { data as stationData } from './data.js';
var stationGap = 0.1
var container = document.getElementById('map');                 //지도를 그릴 element
var options = {
    center: new kakao.maps.LatLng(36.970, 127.589),
    level: 12
};                                                              //지도의 설정 정보

var map = new kakao.maps.Map(container, options);               // container element에 맵 객체 생성

var coordinate = map.getProjection()
var drawnStation = []


for (var i = 0; i < stationData.length; i++) {
    var content = `
                <div class ="label">                                                    
                    ${stationData[i].pm10Value}<br>                                            
                </div>
            `;

    // 커스텀 오버레이가 표시될 위치입니다 
    var position = new kakao.maps.LatLng(stationData[i].latitude, stationData[i].longitude);

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content
    });

    if (noStationAround(stationData[i].latitude, stationData[i].longitude)) {
        customOverlay.setMap(map);
        drawnStation.push(stationData[i])
    }
}

function noStationAround(latitude, longitude) {
    var x0 = parseFloat(longitude) - stationGap;
    var x1 = parseFloat(longitude) + stationGap;
    var y0 = parseFloat(latitude) + stationGap;
    var y1 = parseFloat(latitude) - stationGap;


    for (var i = 0; i < drawnStation.length; i++) {
        if (y0 > drawnStation[i].latitude && y1 < drawnStation[i].latitude) {
            if (x0 < drawnStation[i].longitude && x1 > drawnStation[i].longitude) {
                return false;
            }
        }
    }
    return true;
}


document.getElementById("countAppear").addEventListener('click', e => {
    countAppearStation()
})

function countAppearStation() {
    var appearStation = []
    var count = 0;
    for (var i = 0; i < drawnStation.length; i++) {
        if (appearOnScreen(drawnStation[i].latitude, drawnStation[i].longitude)) {
            appearStation.push(drawnStation[i])
            count++
        }
    }
    console.log(count);
    console.log(appearStation)
    return appearStation
}

function countAppearStation2() {
    var appearStation = []
    var count = 0;
    for (var i = 0; i < grid.length; i++) {
        if (appearOnScreen(grid[i][0], grid[i][1])) {
            appearStation.push(grid[i])
            count++
        }
    }
    console.log(count);
    console.log(appearStation)
    return appearStation
}
var minlat = 33
var maxlat = 38.5
var minlng = 126
var maxlng = 129.5
var gap = 0.2




//위도와 경도를 가지고 적절한 그리드 리턴 (경도 0.25 단위 , 위도 0.25 단위로 쪼개어져 있음.)
function selectGrid(latitude, longitude) {

    gridlng = Math.floor(((longitude * 10 - minlng * 10) / (gap * 10)))
    gridlat = Math.floor(((maxlat * 10 - latitude * 10) / (gap * 10)))

    return [gridlat, gridlng]
}

//위도 경도. 그리드로 보간값 계산
var interpolate = function (latitude, longitude, g00, g10, g01, g11, gridn) {
    var x = (longitude % gap) * (1 / gap)

    var d1 = x
    var d2 = 1 - x

    var x1_vector_x
    var x2_vector_x
    try {
        x1_vector_x = d1 * g10[0] + d2 * g00[0]
        x2_vector_x = d1 * g11[0] + d2 * g01[0]
    } catch (error) {
        debugger;
    }


    var y = (latitude % gap) * (1 / gap)
    var d4 = y
    var d3 = 1 - y

    var result_vector_x = d3 * x2_vector_x + d4 * x1_vector_x




    return result_vector_x                //보간값 리턴
}
var grid = [];
function init() {
    for (var j = maxlat; j >= minlat; j -= gap) {
        for (var i = minlng; i <= maxlng; i += gap) {
            var stationInGrid = selectStations(j,i);
            var v = IDWInterpolation(j, i, stationInGrid);
            if (isNaN(v)){
                grid.push([j,i,grid[grid.length - 1][2]])
            } else {
                grid.push([j,i,v])
            }
            
        }
    }
}
var data;
var heat;
var frame;
window.onload = function myfunction() {
    init();
    for (var i = 0; i < grid.length; i++) {
        var content = `
                    <div class ="label" style = "background: red;">                                                    
                        ${grid[i][2].toFixed(3)}<br>                                            
                    </div>
                `;
    
        // 커스텀 오버레이가 표시될 위치입니다 
        var position = new kakao.maps.LatLng(grid[i][0], grid[i][1]);
    
        // 커스텀 오버레이를 생성합니다
        var customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content
        });
        customOverlay.setMap(map);
    }
    data = function () {
        var returnData = []
        var appearStation = countAppearStation2();
        for (var i = 0; i < appearStation.length; i++) {
            var point = new kakao.maps.LatLng(appearStation[i][0], appearStation[i][1]);
            var xy = coordinate.containerPointFromCoords(point)
            console.log(xy)
            var tmp = []
            tmp.push(xy.x, xy.y, appearStation[i][2] / 3)
            returnData.push(tmp)
        }
        console.log(returnData)
        return returnData;
    }();
    
    heat = simpleheat('canvas').data(data).max(18);
    draw();
}



    
function IDWInterpolation(latitude, longitude, stations) {
    var sum1 = 0;
    var sum2 = 0;
    for (var i = 0; i < stations.length; i ++){
        var d = getDistanceFromLatLonInKm(parseFloat(stations[i].latitude), parseFloat(stations[i].longitude), latitude, longitude);
        if (d == NaN){
            debugger;
            console.log(stations[i])
        }
        sum1 += (stations[i].pm10Value / (d * d));
        sum2 += (1 / (d * d));
    }
    return sum1 / sum2;
}
function selectStations(latitude, longitude) {
    var returnData = []
    for (var i = 0; i < stationData.length; i++){
        if (stationData[i].latitude < latitude && stationData[i].latitude >= latitude - 1){
            if (stationData[i].longitude > longitude && stationData[i].longitude < longitude + 1 ){
                returnData.push(stationData[i])
            }
        }
    }
    return returnData
}


function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function appearOnScreen(latitude, longitude) {
    var x0 = 0;
    var y0 = 0;

    var x1 = window.innerWidth;
    var y1 = window.innerHeight;


    var point00 = new kakao.maps.Point(x0, y0)
    var point11 = new kakao.maps.Point(x1, y1)



    if (latitude > coordinate.coordsFromContainerPoint(point11).Ma && latitude < coordinate.coordsFromContainerPoint(point00).Ma) {
        if (longitude < coordinate.coordsFromContainerPoint(point11).La && longitude > coordinate.coordsFromContainerPoint(point00).La) {
            return true;
        }
    }
    return false;
}

// var data;
// data = function () {
//     var returnData = []
//     var appearStation = countAppearStation();
//     for (var i = 0; i < appearStation.length; i++) {
//         var point = new kakao.maps.LatLng(appearStation[i].latitude, appearStation[i].longitude);
//         var xy = coordinate.containerPointFromCoords(point)
//         console.log(xy)
//         var tmp = []
//         tmp.push(xy.x, xy.y, appearStation[i].pm10Value)
//         returnData.push(tmp)
//     }
//     console.log(returnData)
//     return returnData;
// }();

var canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function get(id) {
    return document.getElementById(id);
}




function draw() {
    console.time('draw');
    heat.draw();
    console.timeEnd('draw');
    frame = null;
}





get('canvas').onmousemove = function (e) {
    heat.add([e.layerX, e.layerY, 1]);
    frame = frame || window.requestAnimationFrame(draw);
};

var radius = get('radius'),
    blur = get('blur'),
    changeType = 'oninput' in radius ? 'oninput' : 'onchange';

radius[changeType] = blur[changeType] = function (e) {
    heat.radius(+radius.value, +blur.value);
    frame = frame || window.requestAnimationFrame(draw);
};

// kakao.maps.event.addListener(map, 'dragend', () => {
//     data = function () {
//         var returnData = []
//         var appearStation = countAppearStation2();
//         for (var i = 0; i < appearStation.length; i++) {
//             var point = new kakao.maps.LatLng(appearStation[i][0], appearStation[i][1]);
//             var xy = coordinate.containerPointFromCoords(point)
//             console.log(xy)
//             var tmp = []
//             tmp.push(xy.x, xy.y, appearStation[i][2] / 2)
//             returnData.push(tmp)
//         }
//         console.log(returnData)
//         return returnData;
//     }();
    
//     heat = simpleheat('canvas').data(data).max(18);
//     draw();
// })

// kakao.maps.event.addListener(map, 'zoom_changed', () => {
//     data = function () {
//         var returnData = []
//         var appearStation = countAppearStation2();
//         for (var i = 0; i < appearStation.length; i++) {
//             var point = new kakao.maps.LatLng(appearStation[i][0], appearStation[i][1]);
//             var xy = coordinate.containerPointFromCoords(point)
//             console.log(xy)
//             var tmp = []
//             tmp.push(xy.x, xy.y, appearStation[i][2] / 2)
//             returnData.push(tmp)
//         }
//         console.log(returnData)
//         return returnData;
//     }();
    
//     heat = simpleheat('canvas').data(data).max(18);
//     draw();
// })