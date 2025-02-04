# [windMap] 2. 바람 데이터를 동적 Animation으로 그리기

기존 랜덤 좌표에서 바람의 x, y 성분을 구하는 과정은 동일하다.
바뀐점은 **매 프레임마다 해당 연산을 하여 프레임이 이어지면 선이 마치 연결된것**처럼 보이게 하는 것이다.

바람을 정적으로 그릴때와는 다르게 하나하나 객체로 구현하고 매 프레임마다 객체가 가지고 있는 좌표에서 다음 좌표를 연산해 계산한다.

---
1. 현재 위치에서 바람의 세기를 구한다.  
->  
2. 바람의 세기만큼 이동한 위치를 구한다.  
->  
3. 현재 위치를 최신화한다.   
->  
4. `1 - 3` 를 반복한다.  
---

### 선(line) 객체
```javascript
function ob(x, y) {
    this.x = x;
    this.y = y;

    this.dr = function () {
      const ls = {						//현재 좌표 저장
        x: this.x,				
        y: this.y
      };
      nextVec = getVector(ls.x, ls.y)
      this.x = ls.x + nextVec.vector_x
      this.y = ls.y + nextVec.vector_y
//현재 위치 refresh
      c.beginPath();
      c.lineWidth = 1;
      c.strokeStyle = "red";

      c.moveTo(ls.x, ls.y);
      c.lineTo(this.x, this.y);
      c.stroke();
//저장해둔 좌표에서부터, Vector만큼 더한 곳까지 선(line)을 그린다

      c.closePath();    
    }
  }
```



### 애니메이션 함수
```javascript
  function anim() {
    requestAnimationFrame(anim);						
//애니메이션을 위해 해당 함수를 재귀로 호출한다
    c.fillStyle = "rgba(255,255,255,0.3)";
    c.fillRect(0, 0, 1000, 1000);
//애니메이션을 위한 설정이다
    a.forEach(function (e, i) {
      e.dr();
    });
//애니메이션에서 반복할 부분이다.
//위에서 말한 연산을 모든 객체에서 반복한다.
  }
```







