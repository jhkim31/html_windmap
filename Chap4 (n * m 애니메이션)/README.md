# [windMap] 4. 격자(grid)벡터로 동적 Animation그리기

!!google-map-key 를 등록해야함!!

4개의 벡터에서 n * m개의 벡터가 된것을 제외하면, 정적 Canvas에 애니메이션을 추가하는것은 Chap2와 다르지 않다. 고로 여기서는 추가된 기능에 대해서만 기술하겠다.

## 1. 가장자리에서 삭제
* 각각의 line들은 벡터를 따라 이동하다 결국에는 Canvas 바깥으로 벗어나게 된다.
* 이럴 경우 index에러 뿐만 아니라 바깥으로 나갈경우 Canvas에 보여지는 line의 개수가 줄어들게 된다.
* 이런 경우를 방지하기 위해 line의 현재 좌표가 Canvas의 최대 범위를 벗어나면, 현재 객체를 삭제하고 새로운 객체를 추가한다.

## 2. 시간이 지나면 삭제
* Chap2에서는 시간이 지나면 결국 모든 line객체가 Canvas 바깥으로 나가는 문제가 있었다.
* 여기서는 랜덤 시간(특정 프레임)이 지나면 기존객체에다 새로운 객체를 덮어쓰는 방법으로, 객체의 소멸을 방지했다.
* 각 바람객체들은 각자 생성된 프레임 시간이 존재하며, 생성된 프레임 시간으로부터 약 1~4초가 지나면, 객체는 삭제된다.

```javascript
function buildobj(i) {
    x = getRandomArbitrary(0, cnx)
    y = getRandomArbitrary(0, cny)
    a[i] = new ob(x, y, i, currentFrame)
}
//line 객체를 생성하는 메소드다.

function removeObj(index) {
    buildobj(index)
}
//line객체를 덮어쓰는 메소드다.

function ob(x, y, index, frame) {
    this.index = index
    this.x = x;
    this.y = y;
    this.frame = frame
    this.dr = function () {
        if (this.x > cnx || this.y > cny || this.x < 0 || this.y < 0) {
            removeObj(this.index)
				// 라인 객체가 특정 범위를 벗어나면 새로운 객체를 만든다.
        } else {		
            if (currentFrame - this.frame > getRandomArbitrary(50, 250)) {
                removeObj(this.index)
            }		//객체가 만든어진자 50 ~ 250 프레임이 지나면 객체는 삭제된다.
            const ls = {
                x: this.x,
                y: this.y
            };
            nextVec = getVector(ls.x, ls.y)
            this.x = ls.x + nextVec[0]
            this.y = ls.y + nextVec[1]
            c.beginPath();
            c.lineWidth = 2;
            if (nextVec[2] > 5) {
                c.strokeStyle = "red";
            } else if (nextVec[2] > 3) {
                c.strokeStyle = "orange";
            } else {
                c.strokeStyle = "yellow";
            }

            c.moveTo(ls.x, ls.y);
            c.lineTo(this.x, this.y);
            c.stroke();
            c.closePath();
        }
    }
}
```

위의 추가 연산을 제외하고는,  
매 프레임마다 해당 벡터의 위치에서 벡터값 계산  
->  
해당 벡터값 만큼 이동  
->  
매 프레임마다 반복  
은 동일하다
