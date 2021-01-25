// 카카오맵 변수 선언 -------------------------------------------------

var container = document.getElementById('map');                 //지도를 그릴 element
var options = {
    center: new kakao.maps.LatLng(36.70751010604805, 127.57122468715775),
    level: 12
};                                                              //지도의 설정 정보

var map = new kakao.maps.Map(container, options);               // 맵 객체 생성

var mapProjection = map.getProjection()
var point;


// 카카오맵 변수 선언 -------------------------------------------------

container.addEventListener('click', e => {
    point = new kakao.maps.Point(e.pageX, e.pageY)
    console.log(point, mapProjection.coordsFromContainerPoint(point))
})




//marker -------------------------------------------------
var minlat = 37.3
var maxlat = 37.5
var minlng = 127.0
var maxlng = 127.4
var gap = 0.1

count = 0;
for (j = maxlat; j >= minlat; j -= gap){
    for(i = minlng; i <= maxlng; i += gap){
        var markerPosition  = new kakao.maps.LatLng(j,i); 
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });   
        marker.setMap(map);


        var iwContent = 
        `
        <div> 
            번호 : ${count++} <br>
        </div>
        `
        var iwPosition = new kakao.maps.LatLng(j,i); 
    
        var infowindow = new kakao.maps.InfoWindow({
            position : iwPosition, 
            content : iwContent 
        });
    
        infowindow.open(map, marker); 
    }
}

map.setCenter(new kakao.maps.LatLng(36.70751010604805, 127.57122468715775))




//marker -------------------------------------------------

//kakao map ===================================================

