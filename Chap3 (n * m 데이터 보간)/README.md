# [windMap] 3 격자(grid)로 구성된 바람데이터로 정적 Canvas 그리기


4개의 꼭지점(2 * 2) 에서만 영향을 받을 때는 좌표 어느 지점이든 동일한 4개의 벡터로만 연산을 진행하면 됐었다.   
하지만 2 * 2가 아닌 3 * 3 또는 그 이상의  n * m 벡터들이 격자로 놓여져 있다면 어떡할까??

나는 벡터들을 그리드로 나누어 특정 좌표에서 **가장 가까운 벡터 4개를 골라** 그 4개의 벡터로 이중 선형 보간법(bilinear interpolation)을 통해 구하기로 해봤다.   

---

특정 좌표 지정  
->  
해당 좌표가 있는 구역 선택  
->  
해당 구역의 왼쪽 상단 벡터의 번호 얻음  
->  
좌상단 벡터를 기준으로 해당 구역의 꼭지점에 있는 4개의 벡터로 연산  
->  
연산된 벡터의 값으로 직선 긋기  

---


```
v1—————————v2—————————v3
|          |           |
|    1     |    2      |
v4—————————v5—————————v6
|    3     |    4      |
|          |           |
v7—————————v8—————————v9
```

해당 그림과 같이 9개의 벡터가 있는 경우 4개의 평면으로 쪼개지게 되며, 좌표가 어떤 평면 위에있냐에 따라 영향을 받는 벡터들이 달라진다.

예를들어 각 벡터가 100 만큼의 거리만큼 떨어져 있다고 한다
임의의 점 
p = (154,40)이라면 
p는 평면 2위에 존재하고 v2, v3, v5, v6 벡터의 영향을 받게 된다.

### 예시에서는 grid의 가 5열인 상태에서 진행한다. 
## 해당좌표가 있는 평면 구하기
```javascript
// var n = 가로 평면의 수
// var m = 세로 평면의 수
//gridxPx : 평면의 가로 픽셀 수
//gridxPy : 평면의 세로 픽셀 수
function selectGrid(x, y) {
    gridxPx = cnx / n
    gridyPx = cny / m
		//모서리의 길이(px)를 평면의 수로 나눈 값(한 평면의 픽셀)
    gridx = parseInt(x / gridxPx)
    gridy = parseInt(y / gridyPx)
		//좌표를 한 평면의 픽셀로 나눈 값(현재 좌표의 평면 위치)
    gridn = gridx + gridy * 5
		// 좌상단 벡터의 번호를 구하는 과정(벡터는 가로로 5개 있을때)
    return gridn
}
```

## 해당 좌표의 벡터 구하기
```javascript
function getVector(x, y) {
    gridn = selectGrid(x, y);
		//위 함수로 평면의 좌상단 벡터 번호 얻음
    g00 = grid[gridn]				//좌상단
    g10 = grid[gridn + 1]		//우상단
    g01 = grid[gridn + 5]		//좌하단
    g11 = grid[gridn + 6]		//우하단
		// 벡터쌍 배열에서, 4개의 벡터 선택

    x = (x % gridxPx) / gridxPx
    y = (y % gridyPx) / gridyPx
		// 평면의 픽셀만큼 모드 연산을 하고 -> 특정 평면에서의 좌표 얻음
		// 해당 평면에서의 좌표의 위치를 비율로 계산
		// 한 평면의 크기가 10,10인 평면에서 
		// (33,27) 위치에 있으면
		// 특정 평면에서 (3,7) 위치에 있다는 의미이고 이것은
		// x = 0.3, y = 0.7 의 비율로 존재한다는 의미이다.
		
    return interpolate(x, y, g00, g10, g01, g11)
}
```


## 이중 선형 보간값 구하기
```javascript
var interpolate = function (x, y, g00, g10, g01, g11) {
    d1 = x					// x의 비율
    d2 = 1 - x				// 그 나머지 비율

    let x1_vector_x = d1 * g10[0] + d2 * g00[0]
    let x1_vector_y = d1 * g10[1] + d2 * g00[1]
		//기본적인 원리는 Chap1과 같다.
		x2_vector_x = d1 * g11[0] + d2 * g01[0]
    	x2_vector_y = d1 * g11[1] + d2 * g01[1]

    	d3 = y
    	d4 = 1 - y
		//y와 그 나머지의 비율
    	result_vector_x = d3 * x2_vector_x + d4 * x1_vector_x
    	result_vector_y = d3 * x2_vector_y + d4 * x1_vector_y
    	result_vector_scale = Math.sqrt(result_vector_x * result_vector_x + result_vector_y * result_vector_y)

    	result_vector = [result_vector_x, result_vector_y, result_vector_scale]
    	//console.log(result_vector)
		return result_vector
}
```

위 함수들로 벡터 격자에서 특정 위치의 벡터를 알 수 있게 되었다.
Chap1과 같은 방법으로 특정 좌표에서 벡터의 크기만큼 선을 그리면 된다.


