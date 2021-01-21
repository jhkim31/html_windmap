# [windMap] 7-2. 현재 풍향 데이터에 따라 동적으로 생성되는 WindMap


**::실제 api로 호출함::**

**::전체 지도의 경우 약 2500번의 api가 호출되므로 가급적 사용 자제::**

**::사용 후 writeGridData()함수로 데이터 보존::**

**::실수로 사용되는것을 막기 위해 fetch부분이 주석처리 되어있음::**



7-1 과의 차이점은 실제로 데이터를 호출해 호출된 데이터를 사용한다는 것이다.
여기서는 minlat, maxlat, minlng, maxlng에 따라 호출되는 범위가 달라지고, 또한 지도에 표시되는 범위가 달라진다.


설정한 위도와 경도까지 gap만큼 fetch를 콜한다.
```javascript
var ajaxs = []
var count = 0;
for (j = maxlat; j >= minlat; j -= gap) {
        for (i = minlng; i <= maxlng; i += gap) {
            count++;
            ajaxs.push(fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + j + '&lon=' + i + '&appid=bae6700b1efedde528414da0f209d309'))
        }
    }
```


호출된 Promise배열(ajaxs) 은 Promise.all로 집계하여 사용한다.
```javascript
var vector = []
    Promise.all(ajaxs).then((values) => {
        let result = [];
        values.forEach(value => {				//promise배열을 풀어서 json 형태로 다시 저장한다
            result.push(value.json());
        });
        return Promise.all(result);		//모든데이터가 풀어지면 이 배열을 리턴한다.

    }).then(datas => {
        datas.forEach(data => {			
// 여기서 풍향 데이터는 속도 : m/s, 방향 : 360도로 오기 때문에
// 방향에 따라 cos, sin으로 벡터값을 바꿔줘야함.
// 아래 이미지 참고
            if (data.wind.deg < 90) {
                deg = data.wind.deg
                vector.push(parseFloat((data.wind.speed * parseFloat(Math.sin(deg * Math.PI / 180)) * -1).toFixed(3)))
                vector.push(parseFloat((data.wind.speed * parseFloat(Math.cos(deg * Math.PI / 180))).toFixed(3)))
            } else if (data.wind.deg < 180 && data.wind.deg >= 90) {
                deg = data.wind.deg - 90
                vector.push(parseFloat((data.wind.speed * parseFloat(Math.cos(deg * Math.PI / 180)) * -1).toFixed(3)))
                vector.push(parseFloat((data.wind.speed * parseFloat(Math.sin(deg * Math.PI / 180)) * -1).toFixed(3)))
            } else if (data.wind.deg < 270 && data.wind.deg >= 180) {
                deg = data.wind.deg - 180
                vector.push(parseFloat((data.wind.speed * parseFloat(Math.sin(deg * Math.PI / 180))).toFixed(3)))
                vector.push(parseFloat((data.wind.speed * parseFloat(Math.cos(deg * Math.PI / 180)) * -1).toFixed(3)))
            } else {
                deg = data.wind.deg - 270
                vector.push(parseFloat((data.wind.speed * parseFloat(Math.cos(deg * Math.PI / 180))).toFixed(3)))
                vector.push(parseFloat((data.wind.speed * parseFloat(Math.sin(deg * Math.PI / 180))).toFixed(3)))
            }
        })
        var line = 0;
        gridData = vector
        count = 0;
//모든 계산이 끝나고 모든 지점의 바람이 x,y 형태의 벡터로 계산이 되면 기존에 정적 데이터였던 gridData에 덮어쓴다.
//이후 앞에서 하던것처럼, 계산해 grid로 나눈다.
        for (i = 0; i < ((latgap / gap) + 1); i++) {
            grid[i] = []
            for (j = 0; j < ((lnggap / gap) + 1); j++) {
                grid[i][j] = []
                grid[i][j][0] = gridData[count++]
                grid[i][j][1] = gridData[count++]
                grid[i][j][2] = count / 2
            }
        }
        alert("준비가 완료되었습니다.")
    });
```


풍향은 바람이 불어오는 쪽을 가르킨다
고로 풍향이 90도 이면 
서쪽 -> 동쪽으로 부는 바람이 아닌
::**서쪽 <- 동쪽** 으로 부는 바람이다.::
또한 4방면에 따라 다음과 같이 계산한다
(여기서 삼각함수는 라디안이 아닌 degree로 계산한다)

바람의 세기를 V, 풍향을 deg라 할때 Vx, Vy는 
### deg = 0 ~ 89
deg = deg
Vx = -sin(deg)
Vy = cos(deg)

### deg = 90 ~ 179
deg = deg - 90
Vx = -cos(deg)
Vy = -sin(deg)

### deg = 180 ~ 269
deg = deg - 180
Vx = sin(deg)
Vy = -cos(deg)

### deg = 270 ~ 360
deg = deg - 270
Vx = cos(deg)
Vy = sin(deg)


