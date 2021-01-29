
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


import { data as stationData} from './data.js';
var gap = 0.1
var container = document.getElementById('map');                 //지도를 그릴 element
var options = {
    center: new kakao.maps.LatLng(36.970, 127.589),
    level: 10
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
    var x0 = parseFloat(longitude) - gap;
    var x1 = parseFloat(longitude) + gap;
    var y0 = parseFloat(latitude) + gap;
    var y1 = parseFloat(latitude) - gap;


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

var data;
data = function () {
    var returnData = []
    var appearStation = countAppearStation();
    for(var i = 0; i < appearStation.length; i++){
        var point = new kakao.maps.LatLng(appearStation[i].latitude, appearStation[i].longitude);
        var xy = coordinate.containerPointFromCoords(point)
        console.log(xy)
        var tmp = []
        tmp.push(xy.x, xy.y, appearStation[i].pm10Value)
        returnData.push(tmp)
    }
    console.log(returnData)
    return returnData;
}();
var heat = simpleheat('canvas').data(data).max(18);
var frame;

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

draw();



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

kakao.maps.event.addListener(map, 'dragend', () => {
    data = function () {
        var returnData = []
        var appearStation = countAppearStation();
        for(var i = 0; i < appearStation.length; i++){
            var point = new kakao.maps.LatLng(appearStation[i].latitude, appearStation[i].longitude);
            var xy = coordinate.containerPointFromCoords(point)
            console.log(xy)
            var tmp = []
            tmp.push(xy.x, xy.y, appearStation[i].pm10Value)
            returnData.push(tmp)
        }
        console.log(returnData)
        return returnData;
    }();
    heat = simpleheat('canvas').data(data).max(18);
    draw()    
})

kakao.maps.event.addListener(map, 'zoom_changed', () => {
    data = function () {
        var returnData = []
        var appearStation = countAppearStation();
        for(var i = 0; i < appearStation.length; i++){
            var point = new kakao.maps.LatLng(appearStation[i].latitude, appearStation[i].longitude);
            var xy = coordinate.containerPointFromCoords(point)
            console.log(xy)
            var tmp = []
            tmp.push(xy.x, xy.y, appearStation[i].pm10Value)
            returnData.push(tmp)
        }
        console.log(returnData)
        return returnData;
    }();
    heat = simpleheat('canvas').data(data).max(18);
    draw();
})