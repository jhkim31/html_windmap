# [windMap] 1. 바람 데이터를 Canvas에 정적으로 그리기

바람의 흐름을 표현하는 애니메이션을 구현하기 위해 우선 애니메이션이 아닌 정적으로 바람을 표현하는것부터 구현 해보기로 함.

접근 방법은 4 지점의 바람 데이터가 있으면 그 네 점 안에 포함된 지점은, 4 지점의 평균값과 같다고 생각하고 접근했다. 

쌍 선형 보간법, bilinear interpolation



쉽게 접근해 보면 다음과 같다.  

`A———————————B————————————C`


* 직선상의 세 점이 있다. (B 는 A 와 C의 중간)  
* A 지점에서 바람의 세기(방향은 A -> C로 분다고 한다.)는  0m/s라 한다.  
* C 지점에서 바람의 세기(방향은 A -> C로 분다고 한다.)는 10m/s라 한다.  
* **B**에서 바람의 세기는 **5m/s** 정도라고 추론할 수 있다.
* 또한 B는 **A로 가까워 질수록 바람의 세기가 약해지고**, **C로 가까워 질수록 바람의 세기가 세진다는 것** 또한 추론할 수 있다.  
이것이 1차원에서의 linear Interploation이다.

1차원 (선, linear)에서의 문제를 2차원(면, bilinear)으로 확장시킨것 뿐이다.  

4 지점의 바람 데이터가 있다고 할때 
(x좌표, y좌표, x방향 바람 세기, y방향 바람 세기)
1. (0,0,-3,5)  
2. (500,0,-4,2)  
3. (0,500,4,-3)  
4. (500,500,5,2)  



### 임의의 점 `p(vec_x, vec_y)`에서의 `x방향 바람세기` 와 `y방향 바람세기` 를 구해본다.
```
1-----------2
|           |
|       p   |
|           |
3-----------4
```

`p (vec_x, vec_y)`에서의 벡터를 구하는 방법은 다음과 같다
1. `t1 (vec_x, 0)` 에서의 벡터를 선형 보간법(1,2점)으로 구한다
2. `t2 (vec_x, 500)` 에서의 벡터를 선형 보간법(3,4점)으로 구한다.
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



격자 내 랜덤으로 포인트 생성해, 그 지점에서 벡터를 구한 후 구한 벡터만큼 선을 그려보겠다


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


























