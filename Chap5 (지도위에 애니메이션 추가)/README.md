# [windMap] 5. 지도 위에 격자(grid)벡터 Animation Overlay하기

Canvas를 Map위에 Overlay할때 

* position: absolute;
* z-index설정
* pointer-events: none;  

```css
#map
    position:absolute;
    z-index: 0;
}
#canvas {
    position: absolute;
    z-index: 1;
    opacity: 0.4;
    pointer-events: none;
}
```


을 해준다.
`pointer-events:none;` 설정이 없으면, z-index상 Canvas가 위에 있기 때문에, 이벤트가 Canvas로 다 들어가게 된다.

그렇게 되면 지도를 조작할 수 없게 되므로 저 설정을 통해 canvas의 이벤트를 꺼준다.

이렇게 되면 지도 위에 Overlay할 수 있게 된다.
허나 아직 지도의 움직임에 따라 바람이 바뀌지는 않는다. 
