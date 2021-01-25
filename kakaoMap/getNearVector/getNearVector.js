// 카카오맵 변수 선언 -------------------------------------------------

var container = document.getElementById('map');                 //지도를 그릴 element
var options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 9
};                                                              //지도의 설정 정보

var map = new kakao.maps.Map(container, options);               // 맵 객체 생성

var mapProjection = map.getProjection()
var point;


count = 0;
var gap = 0.5

// 카카오맵 변수 선언 -------------------------------------------------

container.addEventListener('click', e => {
    point = new kakao.maps.Point(e.pageX, e.pageY)
    console.log(point, mapProjection.coordsFromContainerPoint(point))
})




//marker -------------------------------------------------
var stnList = [
    ["속초", 90, 38.25085, 128.56473],
    ["북춘천", 93, 37.94738, 127.75443],
    ["동두천", 98, 37.90188, 127.0607],
    ["파주", 99, 37.88589, 126.76648],
    ["대관령", 100, 37.67713, 128.71834],
    ["춘천", 101, 37.90262, 127.7357],
    ["백령도", 102, 37.97396, 124.71237],
    ["북강릉", 104, 37.80456, 128.85535],
    ["강릉", 105, 37.75147, 128.89099],
    ["동해", 106, 37.50709, 129.12433],
    ["서울", 108, 37.57142, 126.9658],
    ["인천", 112, 37.47772, 126.6249],
    ["원주", 114, 37.33749, 127.94659],
    ["울릉도", 115, 37.48129, 130.89863],
    ["수원", 119, 37.25746, 126.983],
    ["영월", 121, 37.18126, 128.45743],
    ["충주", 127, 36.97045, 127.9525],
    ["서산", 129, 36.77655689, 126.49390764],
    ["울진", 130, 36.99176, 129.41278],
    ["청주", 131, 36.63935, 127.44089],
    ["대전", 133, 36.37198, 127.37211],
    ["추풍령", 135, 36.22025, 127.99458],
    ["안동", 136, 36.57293, 128.70733],
    ["상주", 137, 36.40837, 128.15741],
    ["포항", 138, 36.03201, 129.38002],
    ["군산", 140, 36.0053, 126.76135],
    ["대구", 143, 35.87797, 128.65296],
    ["전주", 146, 35.84092, 127.11718],
    ["울산", 152, 35.58237, 129.33469],
    ["창원", 155, 35.17019, 128.57282],
    ["광주", 156, 35.17294, 126.89156],
    ["부산", 159, 35.10468, 129.03203],
    ["통영", 162, 34.84541, 128.43561],
    ["목포", 165, 34.81732, 126.38151],
    ["여수", 168, 34.73929, 127.74063],
    ["흑산도", 169, 34.68719, 125.45105],
    ["완도", 170, 34.3959, 126.70182],
    ["고창", 172, 35.34824, 126.599],
    ["순천", 174, 35.0204, 127.3694],
    ["제주", 184, 33.51411, 126.52969],
    ["고산", 185, 33.29382, 126.16283],
    ["성산", 188, 33.38677, 126.8802],
    ["서귀포", 189, 33.24616, 126.5653],
    ["진주", 192, 35.16378, 128.04004],
    ["양평", 202, 37.48863, 127.49446],
    ["이천", 203, 37.26399, 127.48421],
    ["인제", 211, 38.05986, 128.16714],
    ["홍천", 212, 37.6836, 127.88043],
    ["태백", 216, 37.17038, 128.98929],
    ["정선군", 217, 37.38149, 128.6459],
    ["제천", 221, 37.15928, 128.19433],
    ["보은", 226, 36.48761, 127.73415],
    ["천안", 232, 36.76217, 127.29282],
    ["보령", 235, 36.32724, 126.55744],
    ["금산", 238, 36.10563, 127.48175],
    ["부안", 243, 35.72961, 126.71657],
    ["임실", 244, 35.61203, 127.28556],
    ["정읍", 245, 35.56337, 126.83904],
    ["남원", 247, 35.4213, 127.39652],
    ["장수", 248, 35.65696, 127.52031],
    ["고창군", 251, 35.42668, 126.69724],
    ["영광군", 252, 35.28366, 126.47784],
    ["김해시", 253, 35.22981, 128.89075],
    ["순창군", 254, 35.37131, 127.1286],
    ["북창원", 255, 35.22655, 128.6726],
    ["양산시", 257, 35.30737, 129.02009],
    ["보성군", 258, 34.76335, 127.21226],
    ["강진군", 259, 34.6289, 126.76715],
    ["장흥", 260, 34.68886, 126.91951],
    ["해남", 261, 34.55375, 126.56907],
    ["고흥", 262, 34.61826, 127.27572],
    ["의령군", 263, 35.32258, 128.28812],
    ["함양군", 264, 35.51138, 127.74538],
    ["광양시", 266, 34.9434, 127.6914],
    ["진도군", 268, 34.47296, 126.25846],
    ["봉화", 271, 36.94361, 128.91449],
    ["영주", 272, 36.87183, 128.51687],
    ["문경", 273, 36.62727, 128.14879],
    ["청송군", 276, 36.4351, 129.04005],
    ["영덕", 277, 36.53336, 129.40924],
    ["의성", 278, 36.3561, 128.68864],
    ["구미", 279, 36.13055, 128.32055],
    ["영천", 281, 35.97742, 128.9514],
    ["경주시", 283, 35.8174, 129.2009],
    ["거창", 284, 35.66739, 127.9099],
    ["합천", 285, 35.56505, 128.16994],
    ["밀양", 288, 35.49147, 128.74412],
    ["산청", 289, 35.413, 127.8791],
    ["거제", 294, 34.88818, 128.60459],
    ["남해", 295, 34.81662, 127.92641],
]

var bouyList = [
    ["울릉도", 21229, 37.4554, 131.1144],
    ["덕적도", 22101, 37.2361, 126.01875],
    ["칠발도", 22102, 34.7933, 125.7769],
    ["거문도", 22103, 34.00135, 127.50127222],
    ["거제도", 22104, 34.7667, 128.9],
    ["동해", 22105, 37.48056, 129.95],
    ["포항", 22106, 36.35, 129.78333333],
    ["마라도", 22107, 33.0833, 126.0333],
    ["외연도", 22108, 36.25, 125.75],
    ["신안", 22183, 34.73333333, 126.24166667]
]

var zoomControl = new kakao.maps.ZoomControl();

// 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

for (j = 38; j >= 33; j -= gap) {
    for (i = 124; i <= 130; i += gap) {
        var markerPosition = new kakao.maps.LatLng(j, i);
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);


        var iwContent =
            `
            <div style = "padding: 5px; background:rgb(255, 130, 0); z-index:2; width: 170px;"> 
            Index : ${count++}<br>
            위도 : ${j}, 경도 : ${i}
        </div>
        `
        var iwPosition = new kakao.maps.LatLng(j, i);

        var infowindow = new kakao.maps.InfoWindow({
            position: iwPosition,
            content: iwContent
        });

        infowindow.open(map, marker);
    }
}

for (i = 0; i < stnList.length; i++) {
    var markerPosition = new kakao.maps.LatLng(stnList[i][2], stnList[i][3]);

    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    nearVector = closeVector(stnList[i][2], stnList[i][3])
    marker.setMap(map);

    distance = getDistanceFromLatLonInKm(stnList[i][2], stnList[i][3], nearVector[0], nearVector[1])

    // var iwContent = `
    //                     <div style = "padding: 5px; background:rgb(199, 255, 153); z-index:2; width: 190px;"> 
    //                         이름 : ${stnList[i][0]}, 육지 <br>
    //                         코드 : ${stnList[i][1]} <br>
    //                         ${stnList[i][2].toFixed(3)}, ${stnList[i][3].toFixed(3)} <br>
    //                         풍향 : ${1}, 풍속 : ${1}<br>
    //                         가까운 벡터 : ${nearVector[2]}번 <br>
    //                         벡터까지의 거리 : ${distance.toFixed(2)}km <br>

    //                     </div>
    //                 `

    var iwContent = `
                        <div style = "padding: 5px; background:rgb(199, 255, 153); z-index:2; width: 190px;"> 
                        코드 : ${stnList[i][1]}<br>
                        가까운 벡터 : ${nearVector[2]}번 <br>
                        벡터까지의 거리 : ${distance.toFixed(2)}km <br>
                        </div>
                    `
    var iwPosition = new kakao.maps.LatLng(stnList[i][2], stnList[i][3]);

    var infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent
    });

    infowindow.open(map, marker);


}

for (i = 0; i < bouyList.length; i++) {
    var markerPosition = new kakao.maps.LatLng(bouyList[i][2], bouyList[i][3]);

    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    nearVector = closeVector(bouyList[i][2], bouyList[i][3])
    marker.setMap(map);

    distance = getDistanceFromLatLonInKm(bouyList[i][2], bouyList[i][3], nearVector[0], nearVector[1])
    var iwContent = `
    <div style = "padding: 5px; background:rgb(43, 135, 255); z-index:2; width: 190px;"> 
        이름 : ${bouyList[i][0]}, 바다 <br>
        코드 : ${bouyList[i][1]} <br>
        ${bouyList[i][2].toFixed(3)}, ${bouyList[i][3].toFixed(3)} <br>
        풍향 : ${1}, 풍속 : ${1}<br>
        가까운 벡터 : ${nearVector[2]}번 <br>
        벡터까지의 거리 : ${distance.toFixed(2)}km <br>

    </div>
    `
    var iwPosition = new kakao.maps.LatLng(bouyList[i][2], bouyList[i][3]);

    var infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent
    });

    infowindow.open(map, marker);

}

map.setCenter(new kakao.maps.LatLng(33.450701, 126.570667))


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

function closeVector(lat, lng) {
    x = lat % 1
    y = lng % 1
    var returnlat;
    var returnlng;
    var returnNum;
    if (gap == 0.25) {
        var tmpx = 0
        if (x < 0.125) {
            tmpx = 0
        } else if (x >= 0.125 && x < 0.375) {
            tmpx = 0.25
        } else if (x >= 0.375 && x < 0.625) {
            tmpx = 0.5
        } else if (x >= 0.625 && x < 0.875) {
            tmpx = 0.75
        } else if (x >= 0.875) {
            tmpx = 1
        }
        var tmpy = 0
        if (y < 0.125) {
            tmpy = 0
        } else if (y >= 0.125 && y < 0.375) {
            tmpy = 0.25
        } else if (y >= 0.375 && y < 0.625) {
            tmpy = 0.5
        } else if (y >= 0.625 && y < 0.875) {
            tmpy = 0.75
        } else if (y >= 0.875) {
            tmpy = 1
        }

        returnlat = Math.floor(lat) + tmpx
        returnlng = Math.floor(lng) + tmpy

        tmpa = (38 - returnlat) / 0.25
        tmpb = (returnlng - 124) / 0.25
        returnNum = tmpa * 25 + tmpb
    } else {
        var tmpx = 0
        if (x < 0.25) {
            tmpx = 0
        } else if (x >= 0.25 && x < 0.5) {
            tmpx = 0.5
        } else if (x >= 0.5 && x < 0.75) {
            tmpx = 0.5
        } else if (x >= 0.75) {
            tmpx = 1
        }

        var tmpy = 0
        if (y < 0.25) {
            tmpy = 0
        } else if (y >= 0.25 && y < 0.5) {
            tmpy = 0.5
        } else if (y >= 0.5 && y < 0.75) {
            tmpy = 0.5
        } else if (y >= 0.75) {
            tmpy = 1
        }
        returnlat = Math.floor(lat) + tmpx
        returnlng = Math.floor(lng) + tmpy

        tmpa = (38 - returnlat) / 0.5
        tmpb = (returnlng - 124) / 0.5

        returnNum = tmpa * 13 + tmpb
    }
    return [returnlat, returnlng, returnNum]

}

//marker -------------------------------------------------

//kakao map ===================================================



//getStnData===============================================================




//getStnData===============================================================
