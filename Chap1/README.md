# [windMap] 1. 4방향 벡터로 정적 Canvas 그리기

특정 벡터들에 의해 영향을 받는 Field를 그리기 위해 나는 처음 사각형의 4 지점에서 벡터들이 있을때 그 벡터들의 영향을 받는 4각형 Field를 그리는 것부터 시작, 접근 했다.

접근 방법은 4 지점의 벡터가 있으면 그 사이의 점들은 4 벡터들의 평균값과 같다고 생각하고 접근했다 (쌍 선형 보간법, bilinear interpolation)



쉽게 접근해 보겠다
A———————————B————————————C
직선상의 세 점이 있다고 한다 (B 는 A 와 C의 중간)
A 지점에서 바람의 세기(방향은 고려하지 않고, A -> C로 분다고 한다.)는  0m/s라 한다.
C 지점에서 바람의 세기(방향은 고려하지 않고, A -> C로 분다고 한다.)는 10m/s라 한다.
그럼 상식적으로 **B**에서 바람의 세기는 **5m/s** 언저리쯤이라고 추론할 수 있다.
또한 B는 **A로 가까워 질수록 바람의 세기가 약해지고**, **C로 가까워 질수록 바람의 세기가 세진다는 것** 또한 추론할 수 있다.

1차원 (선)에서의 문제를 2차원(면)으로 확장시킨것 뿐이다.

4 지점에 벡터가 있다고 할때 
(x좌표, y좌표, x벡터, y벡터)
1. (0,0,-3,5)
2. (500,0,-4,2)
3. (0,500,4,-3)
4. (500,500,5,2)



### 임의의 점 p에서의 Vx와 Vy를 구해본다.
`p = (vec_x, vec_y, Vx, Vy)` , 단 (0 < randX < 500, 0 < randY < 500)

1—————————t1—————————2
⎜					 ⎜
⎜		   p		 ⎜
⎜					 ⎜
⎜					 ⎜
3—————————t2—————————4


`p(vec_x, vec_y)`에서의 벡터를 구하는 방법은 다음과 같다
1. t1 (vec_x, 0) 에서의 벡터를 선형 보간법(1,2점)으로 구한다
2. t2 (vec_x, 500) 에서의 벡터를 선형 보간법(3,4점)으로 구한다.
3. `p (vec_x, vec_y)` 에서의 벡터를 선형보간법(t1, t2점) 으로 구한다

```javascript
var A = [
    { 'x': 0, 'y': 0, 'vector_x': -3, 'vector_y': 5 },
    { 'x': 500, 'y': 0, 'vector_x': -4, 'vector_y': 2 },
    { 'x': 0, 'y': 500, 'vector_x': 4, 'vector_y': -3 },
    { 'x': 500, 'y': 500, 'vector_x': 5, 'vector_y': 2 }
]
function getVector(vec_x, vec_y) {
    var x = vec_x
    var y = vec_y

    d1 = x - A[0]['x']				// 1에서 p까지의 거리
    d2 = A[1]['x'] - x				// p에서 2까지의 거리

    let x1_vector_x = (d1 / (d1 + d2)) * A[1].vector_x + (d2 / (d1 + d2)) * A[0].vector_x
    let x1_vector_y = (d1 / (d1 + d2)) * A[1].vector_y + (d2 / (d1 + d2)) * A[0].vector_y
//d1의 비율 * 점2의 벡터 + d2의 비율 * 점1의 벡터


    let t1 = { 'x': x, 'y': A[0].y, 'vector_x': x1_vector_x, 'vector_y': x1_vector_y }
// 그렇게 구해진 t1에서의 벡터

    let x2_vector_x = (d1 / (d1 + d2)) * A[3].vector_x + (d2 / (d1 + d2)) * A[2].vector_x
    let x2_vector_y = (d1 / (d1 + d2)) * A[3].vector_y + (d2 / (d1 + d2)) * A[2].vector_y
// d1의 비율 * 점4의 벡터 + d2의 비율 * 점3의 베거

    let t2 = { 'x': x, 'y': A[3].y, 'vector_x': x2_vector_x, 'vector_y': x2_vector_y }
//그렇게 구해진 t2에서의 벡터

    d3 = y - t1.y						// t1에서 p까지의 거리
    d4 = t2.y - y						// p에서 t2까지의 거리
    
    result_vector_x = (d3 / (d3 + d4)) * t2.vector_x + (d4 / (d3 + d4)) * x1_vector_x
    result_vector_y = (d3 / (d3 + d4)) * t2.vector_y + (d4 / (d3 + d4)) * x1_vector_y
//d3의 비율 * t2의 벡터 + d4의 비율 *  t1의 벡터

    result = { 'x': x, 'y': y, 'vector_x': result_vector_x, 'vector_y': result_vector_y }
//그렇게 구해진 p에서의 벡터

    return result
}
```



격자 내 랜덤으로 포인트 생성

포인트에서 벡터 구함

해당 포인터에서 구한 벡터만큼 직선 그림
```javascript
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
```
























