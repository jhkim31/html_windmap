import {Windmap as WindMap} from "./windmap.js";
window.map = L.map('map').setView([36, 128], 8);
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png').addTo(map);

var windmap = new WindMap(31, 44, 115, 138, 0.5);

window.onload = () => {
    windmap.init();
}


document.getElementById('playWind').addEventListener('click', windmap.toggleWindLayer)

