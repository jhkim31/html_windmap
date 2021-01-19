var gridData = [
1.9,-1.4,1.5,-1.5,1.7,-0.7,0.8,-1.6,1.9,-1.2,1.5,-1.8,0.9,-1.3,1.1,-1.4,1.7,-0.8,0.9,-0.7,1.8,-1.6,0.7,-1.8,1.8,-2.0,2.0,-1.1,2.0,-0.9,1.0,-1.8,1.4,-1.0,1.3,-0.8,1.3,-1.9,2.0,-0.8,1.3,-0.9,0.8,-1.1,1.5,-1.4,1.6,-1.5,1.7,-1.1,1.8,-1.9,1.8,-1.4,0.7,-1.2,1.2,-1.2,0.5,-1.9,1.6,-1.4,1.1,-1.4,0.5,-0.5,1.5,-1.3,0.8,-0.5,1.9,-1.0,1.2,-1.1,0.6,-0.5,0.7,-1.1,1.5,-1.0,1.6,-1.1,1.6,-1.6,1.0,-0.8,0.5,-1.1,1.3,-1.9,1.1,-0.8,0.9,-1.2,2.0,-1.3,0.5,-1.6,1.5,-0.5,2.0,-1.4,1.7,-0.8,1.9,-0.5,1.1,-1.7,2.0,-1.5,0.7,-0.8,1.8,-0.6,1.3,-0.7,1.6,-1.0,0.9,-1.2,1.7,-2.0,1.2,-2.0,1.2,-1.7,1.8,-1.4,1.7,-1.7,1.2,-0.6,0.9,-1.0,0.8,-0.9,1.8,-1.5,0.9,-1.7,0.9,-1.2,1.9,-0.6,0.8,-1.2,1.4,-1.5,1.1,-0.5,1.8,-0.7,0.9,-0.8,1.3,-1.8,0.8,-1.0,1.9,-0.8,1.0,-0.7,1.0,-0.8,0.8,-1.6,0.8,-1.2,1.6,-1.5,1.4,-1.9,1.2,-1.3,1.1,-1.5,1.4,-1.9,0.6,-1.4,1.6,-0.9,1.5,-1.2,0.8,-1.2,1.9,-1.8,1.4,-2.0,1.4,-1.0,1.6,-1.1,0.8,-0.6,1.4,-1.5,1.8,-0.6,1.4,-1.9,1.7,-2.0,0.5,-0.9,0.7,-2.0,1.2,-1.5,1.9,-1.7,1.0,-1.0,0.9,-2.0,0.8,-1.5,0.9,-1.6,1.5,-1.6,2.0,-1.9,0.7,-0.5,1.4,-1.3,0.9,-0.8,1.5,-1.1,0.6,-1.8,0.8,-1.1,1.3,-1.0,1.9,-1.5,0.7,-1.7,1.7,-1.4,1.3,-1.0,1.4,-1.5,0.9,-1.8,1.2,-1.0,1.4,-1.8,1.7,-2.0,1.1,-1.4,1.9,-1.9,0.7,-0.5,1.0,-1.4,1.0,-1.0,0.5,-1.1,1.4,-1.1,0.8,-1.1,0.9,-1.3,0.6,-0.5,1.3,-0.6,0.7,-0.9,0.6,-1.1,1.1,-1.4,0.8,-1.1,0.9,-0.6,1.0,-1.2,1.5,-1.6,1.2,-0.9,1.2,-1.9,0.8,-1.5,1.7,-1.4,2.0,-1.5,0.6,-1.1,0.8,-0.9,1.9,-0.8,0.7,-0.6,1.1,-1.0,0.6,-1.2,1.0,-0.8,1.7,-1.8,0.9,-0.8,1.8,-1.7,0.6,-1.2,1.0,-2.0,0.9,-1.9,1.4,-0.9,1.5,-0.6,1.1,-1.1,1.1,-1.1,1.2,-1.1,1.4,-0.9,1.6,-0.6,1.1,-1.3,1.4,-1.6,0.8,-0.8,1.1,-0.7,1.6,-1.0,1.4,-0.9,2.0,-2.0,1.8,-0.9,1.4,-1.3,0.7,-1.2,0.6,-1.6,0.7,-1.4,0.5,-0.9,2.0,-0.6,0.7,-0.6,1.4,-0.8,1.4,-1.5,1.0,-1.7,1.4,-0.8,0.6,-1.5,1.1,-1.9,1.2,-1.4,1.3,-0.5,1.8,-0.6,0.6,-1.0,1.1,-1.9,1.5,-2.0,0.5,-1.1,1.7,-1.5,1.5,-1.1,1.0,-0.5,0.6,-0.7,1.3,-0.7,1.4,-1.8,1.7,-1.5,1.5,-2.0,0.5,-0.5,1.2,-1.5,0.8,-0.6,0.8,-1.3,1.8,-1.0,1.4,-0.9,1.3,-2.0,1.1,-0.5,0.6,-1.6,1.6,-1.1,1.2,-1.7,0.9,-1.2,1.8,-1.4,1.2,-0.6,1.1,-1.3,1.6,-1.5,1.8,-0.7,1.1,-1.6,1.5,-1.8,1.8,-1.3,1.4,-1.0,1.0,-1.7,0.5,-1.0,1.8,-0.6,1.6,-1.4,0.8,-0.8,1.8,-1.0,1.2,-1.6,1.6,-0.9,1.6,-0.9,1.3,-1.7,0.8,-1.8,1.7,-0.5,1.3,-1.6,0.6,-1.8,0.6,-1.2,0.8,-1.5,1.7,-0.9,1.2,-0.8,1.7,-1.8,1.8,-0.8,1.4,-0.5,0.6,-1.4,1.9,-1.6,0.8,-1.8,1.2,-1.7,0.9,-0.5,1.0,-0.9,1.4,-1.5,1.3,-0.8,0.9,-1.0,1.5,-1.0,1.2,-1.8,1.9,-0.6,1.0,-1.7,1.2,-0.5,1.6,-1.0,1.2,-1.6,0.8,-1.3,1.1,-1.0,1.6,-0.9,1.7,-1.6,1.1,-0.5,1.4,-1.1,1.1,-1.1,1.1,-1.1,0.6,-1.1,2.0,-1.0,1.5,-1.0,1.8,-1.3,1.6,-1.4,1.8,-1.0,1.2,-0.8,1.3,-0.6,1.8,-1.5,1.8,-1.1,0.6,-0.6,0.6,-0.7,1.0,-1.2,0.6,-1.8,0.7,-1.9,1.9,-1.0,1.5,-1.8,1.4,-0.8,1.1,-1.3,1.8,-1.9,0.7,-0.8,0.5,-1.6,0.9,-0.7,1.4,-1.5,1.5,-1.9,1.1,-1.1,1.1,-0.9,1.4,-1.8,0.9,-0.7,0.5,-0.9,1.0,-1.5,1.6,-1.6,1.6,-1.1,1.8,-2.0,1.4,-1.9,0.7,-2.0,2.0,-1.1,1.8,-1.3,1.0,-1.1,1.9,-1.1,1.0,-0.7,1.5,-1.0,1.1,-1.1,1.0,-1.4,0.8,-1.4,0.6,-1.8,1.9,-1.0,0.8,-1.1,1.9,-0.6,0.8,-2.0,1.7,-0.5,1.0,-1.9,0.7,-1.8,1.7,-0.6,1.3,-0.8,1.8,-1.2,0.7,-1.8,1.3,-1.7,0.9,-0.6,1.4,-0.9,0.8,-0.7,1.4,-1.3,0.8,-1.8,0.6,-0.9,0.6,-1.2,1.2,-0.8,1.9,-1.1,0.7,-0.5,1.8,-0.9,0.7,-2.0,1.3,-1.0,0.8,-1.4,0.7,-2.0,1.9,-0.6,1.9,-1.8,1.8,-1.2,1.0,-1.8,0.8,-0.9,1.8,-0.7,0.8,-0.7,1.1,-0.9,1.2,-0.6,1.8,-0.9,1.3,-1.5,1.2,-0.8,1.3,-1.3,1.9,-1.0,0.6,-1.1,0.8,-0.6,1.3,-1.9,1.4,-1.0,1.6,-0.9,0.5,-1.3,1.5,-1.7,0.8,-1.6,0.9,-1.4,1.6,-1.4,0.8,-1.3,1.5,-0.8,1.1,-1.5,1.2,-0.8,1.9,-1.9,0.9,-1.8,0.6,-1.7,0.7,-1.4,0.9,-1.2,1.8,-1.4,1.0,-1.8,1.6,-0.6,1.9,-1.6,0.8,-1.7,1.9,-1.5,1.5,-1.1,0.7,-0.9,0.6,-1.4,1.0,-1.7,2.0,-1.2,0.9,-1.5,1.9,-0.8,1.9,-1.6,1.0,-0.8,1.0,-2.0,1.4,-1.3,1.0,-0.8,0.9,-1.5,1.9,-1.1,0.5,-1.9,1.8,-1.7,2.0,-0.8,0.6,-1.5,1.1,-1.3,1.8,-0.5,1.7,-1.4,0.6,-1.5,1.2,-0.6,0.6,-1.2,0.9,-1.9,1.3,-1.0,0.9,-1.6,1.6,-1.7,1.5,-2.0,0.8,-1.6,0.6,-1.2,0.5,-1.3,0.9,-0.9,1.7,-1.0,1.6,-1.2,1.4,-1.5,1.6,-1.5,0.9,-1.8,0.7,-0.8,1.9,-1.2,1.0,-1.0,0.9,-0.7,1.9,-0.9,0.9,-1.6,1.4,-1.9,1.6,-1.2,1.1,-0.8,0.6,-0.8,1.2,-1.2,0.5,-1.7,1.3,-0.6,1.6,-1.4,0.5,-1.6,1.9,-1.6,1.4,-0.8,0.5,-1.8,1.2,-1.2,1.0,-0.8,0.9,-1.1,1.8,-2.0,1.4,-1.4,1.2,-1.3,1.1,-1.5,1.7,-1.6,2.0,-0.6,1.9,-1.8,1.6,-1.4,0.8,-0.5,0.9,-1.9,0.5,-1.2,2.0,-1.1,1.6,-1.5,1.0,-1.6,1.0,-1.3,1.6,-1.3,0.5,-1.1,1.1,-1.0,1.4,-1.5,1.9,-1.2,1.2,-1.0,1.1,-1.7,1.5,-1.4,1.8,-1.7,0.9,-0.8,0.9,-0.6,0.8,-1.5,0.6,-0.6,1.1,-2.0,0.8,-1.7,1.2,-1.6,1.2,-1.5,1.3,-1.4,0.8,-1.1,1.0,-0.9,0.8,-1.1,0.6,-0.9,1.4,-1.4,0.5,-0.9,1.2,-1.0,1.0,-1.7,1.9,-1.0,2.0,-1.0,1.7,-1.3,0.6,-1.2,1.9,-0.6,1.3,-1.9,1.3,-0.8,1.4,-1.0,1.8,-1.4,0.5,-1.1,1.7,-1.8,0.9,-1.2,1.3,-1.1,1.6,-1.6,1.2,-0.8,1.2,-1.4,1.4,-1.7,2.0,-0.9,1.1,-1.1,1.4,-1.1,2.0,-1.0,0.7,-1.6,0.7,-0.9,1.9,-0.7,0.7,-0.8,0.7,-1.6,0.5,-1.0,1.4,-1.8,1.6,-1.3,0.9,-1.4,1.3,-2.0,0.5,-0.8,0.7,-1.7,1.2,-0.7,1.0,-0.8,0.6,-1.3,1.0,-1.4,2.0,-0.7,0.9,-0.6,1.7,-0.7,1.2,-0.8,1.5,-2.0,1.5,-1.1,1.9,-1.9,1.4,-1.8
]
//canvas ==================================================================================== START
//canvas 변수 선언 ---------------------------------------------------------------------------- START
var cn = document.getElementById('cw')              // 캔버스 객체
var c = cn.getContext('2d');                        // 캔버스
var a = []                                          // 바람 하나하나 객체의 배열
var cnx;                                            // 캔버스 width
var cny;                                            // 캔버스 height
var grid = []                                       // 위도 경도에 따른 그리드 배열
var currentFrame = 0                                // 애니메이션의 현재 프레임
var animationId                                     // 애니메이션 아이디 (정지시 필요)

//페이지 로드시 실행
window.onload = function myfunction() {             
    init()
    readGrid()
    build();
}

//페이지 resize시 실행
window.onresize = () => {                           
    init();
    build();
}

//canvas 변수 선언 --------------------------------------------------------------------------- END

// 바람 객체 빌드 관련 -------------------------------------------------------------------------- START

//바람 객체 생성 
function build() {                      
    for (i = 0; i < 1000; i++) {
        buildobj(i)
    }
}

//바람 객체 생성 (실제 인스턴스 생성)
function buildobj(i) {                  
    x = getRandomArbitrary(0, cnx)
    y = getRandomArbitrary(0, cny)
    coordinate = map.getProjection()
    point = new kakao.maps.Point(x, y)
    a[i] = new ob(x, y, coordinate.coordsFromContainerPoint(point).La, coordinate.coordsFromContainerPoint(point).Ma, i, currentFrame)
}

//특정 인덱스 바람 객체 삭제
function removeObj(index) {
    buildobj(index)
    return 0;
}

//바람 객체 클래스
function ob(x, y, latitude, longitude, index, frame) {
    this.index = index                              // 객체배열에서 인덱스(삭제시 필요)
    this.x = x;                                     // 화면에서의 x 좌표
    this.y = y;                                     // 화면에서의 y 좌표
    this.latitude = latitude;                       // 지도에서의 위도
    this.longitude = longitude;                     // 지도에서의 경도
    this.frame = frame                              // 생성될 당시 프레임
    this.coordinate = map.getProjection()                    
    //바람 객체 이동 함수 (현재 좌표의 벡터를 받아 그 벡터 방향으로 이동)
    this.dr = function () {
        if (this.x > cnx || this.y > cny || this.x < 0 || this.y < 0) {                 //만약 캔버스 범위를 벗어나면 삭제
            return removeObj(this.index)
        } else {
            if (currentFrame - this.frame > getRandomArbitrary(100, 250)) {             // 100프레임 (1 ~ 2초) 에서 250프레임 (4초정도) 지나면 삭제
                removeObj(this.index)
            }
            const ls = {                                                                // 이동을 위한 현재 위치 기록
                x: this.x,
                y: this.y
            };

            nextVec = getVector(this.latitude, this.longitude)                          // 현재 좌표에서 벡터 계산
            this.x = ls.x + nextVec[0]                                                  // 현재 좌표에서 벡터만큼 이동                                                                                                      
            this.y = ls.y + nextVec[1]                                                  // 현재 좌표에서 벡터만큼 이동                                                                                                      

            point = new kakao.maps.Point(this.x, this.y)
            this.latitude = coordinate.coordsFromContainerPoint(point).Ma               // 이동한 만큼 다시 현재 위치 계산
            this.longitude = coordinate.coordsFromContainerPoint(point).La              // 이동한 만큼 다시 현재 위치 계산

            c.beginPath();
            c.lineWidth = 2;
            if (nextVec[2] > 1.5) {
                c.strokeStyle = "rgb(255,30,0)";
            } else if (nextVec[2] > 1.3) {
                c.strokeStyle = "rgb(255, 50, 0)";
            } else {
                c.strokeStyle = "rgb(255, 100, 0)";
            }
            // c.strokeStyle = "rgb(255,0,0)";
            c.moveTo(ls.x, ls.y);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath();

            //기록한 현재 위치와 바뀐 위치까지 그림.
        }
    }
}
// 바람 객체 빌드 관련 ----------------------------------------------------------------------------------- END

//벡터 획득 알고리즘 (bilinear interpolation) ------------------------------------------------------------ START

//현재 위도와 경도의 벡터 리턴
function getVector(latitude, longitude) {                       
    if (latitude <= 33 || latitude >= 38) return [1, -1, 1.4]             // 만약 위도 33 이하, 38 이상이면 1, -1 벡터 리턴
    if (longitude <= 124 || longitude >= 130) return [1, -1, 1.4]         // 만약 경도 124 이하, 130 이상이면 1, -1 벡터 리턴

    gridn = selectGrid(latitude, longitude);                            // 현재 벡터에서 그리드 계산
    g00 = grid[gridn[0]][gridn[1]]                                      
    g10 = grid[gridn[0]][gridn[1] + 1]
    g01 = grid[gridn[0] + 1][gridn[1]]
    g11 = grid[gridn[0] + 1][gridn[1] + 1]                              
    // 현재 좌표를 감싸는 네(4) 그리드 계산

    return interpolate(latitude, longitude, g00, g10, g01, g11, gridn)      // 4 그리드로 보간값 구해서 리턴
}


//위도와 경도를 가지고 적절한 그리드 리턴 (경도 0.25 단위 , 위도 0.25 단위로 쪼개어져 있음.)
function selectGrid(latitude, longitude) {                                
    gridlng = parseInt((longitude - 124) / 0.25)         //ex) 
    gridlat = parseInt((38 - latitude) / 0.25)           //ex) 

    return [gridlat, gridlng]
}

//위도 경도. 그리드로 보간값 계산
var interpolate = function (latitude, longitude, g00, g10, g01, g11, gridn) {
    x = (longitude % 0.25) * 4

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
    }


    y = (latitude % 0.25) * 4
    d4 = y
    d3 = 1 - y

    result_vector_x = d3 * x2_vector_x + d4 * x1_vector_x
    result_vector_y = d3 * x2_vector_y + d4 * x1_vector_y
    result_vector_scale = Math.sqrt(result_vector_x * result_vector_x + result_vector_y * result_vector_y)

    result_vector = [result_vector_x, result_vector_y, result_vector_scale]
    return result_vector                //보간값 리턴
}

//벡터 획득 알고리즘 (bilinear interpolation) ----------------------------------------------------- END

// 애니메이션, 기타 ------------------------------------------------------------------------------- START

//캔버스 초기값 세팅
function init() {
    cn.width = window.innerWidth
    cn.height = window.innerHeight
    cnx = cn.width - 1
    cny = cn.height - 1
    c.linewidth = "1";
}

// 위.경도 그리드값 읽어오기
function readGrid() {
    count = 0
    for (i = 0; i < 21; i++) {
        grid[i] = []
        for(j = 0; j < 25; j++){
            grid[i][j] = []
            grid[i][j][0] = gridData[count++]
            grid[i][j][1] = gridData[count++]
            grid[i][j][2] = count / 2
        }
        
    }
}

//min, max 랜덤값 리턴
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// 애니메이션 생성
function anim() {
    currentFrame++
    animationId = requestAnimationFrame(anim)
    c.fillStyle = "rgba(255, 255, 255, 0.15)"
    c.fillRect(0, 0, cn.width, cn.height);
    a.forEach(function (e, i) {
        e.dr();
    });
}

//에니메이션 정지
function stopAnim() {                               
    cancelAnimationFrame(animationId)
}
// 애니메이션, 기타 --------------------------------------------------------------------------- END

//canvas ================================================================================== END


//kakao map =============================================================================== START

// 카카오맵 변수 선언 ------------------------------------------------------------------------- START

var container = document.getElementById('map');                 //지도를 그릴 element
var options = {
    center: new kakao.maps.LatLng(37.151198243701934, 128.22723681773422),
    level: 12
};                                                              //지도의 설정 정보

var map = new kakao.maps.Map(container, options);               // container element에 맵 객체 생성

var mapProjection = map.getProjection()
var point;

// 카카오맵 변수 선언 -------------------------------------------------------------------- END

// 카카오맵 이벤트 등록 ------------------------------------------------------------------- START

container.addEventListener('click', e => {
    point = new kakao.maps.Point(e.pageX, e.pageY)
    console.log(point, mapProjection.coordsFromContainerPoint(point))
    var windSpeed = document.getElementById('windSpeed')
    vector = getVector(mapProjection.coordsFromContainerPoint(point).Ma, mapProjection.coordsFromContainerPoint(point).La)
    windSpeed.innerHTML = 
    `${mapProjection.coordsFromContainerPoint(point).Ma.toFixed(3)}, ${mapProjection.coordsFromContainerPoint(point).La.toFixed(3)}, 
    vector : ${vector[0].toFixed(3)}, ${vector[1].toFixed(3)} scale: ${vector[2].toFixed(3)}`

})

kakao.maps.event.addListener(map, 'dragend', () => {
    build()
})

kakao.maps.event.addListener(map, 'zoom_changed', () => {
    build()
})

// 카카오맵 이벤트 등록 ----------------------------------------------------------------- END


//kakao map ===================================================================== END

