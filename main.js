const map = document.getElementById('map')
const mapImg = document.getElementById('map__img')
const menuMoves = document.getElementById('menu__moves')


function zoom(event) {
    scale += event.deltaY * -0.001;
    // Restrict scale
    scale = Math.min(Math.max(0.5, scale), 4);
    // Apply scale transform
    map.style.transform = `scale(${scale})`;
  }
  let scale = 1;


var img_ele = null,
  x_cursor = 0,
  y_cursor = 0,
  x_img_ele = 0,
  y_img_ele = 0;

function start_drag() {
    img_ele = this;
    x_img_ele = window.event.clientX - mapImg.offsetLeft;
    y_img_ele = window.event.clientY - mapImg.offsetTop;

}

function stop_drag() {
    img_ele = null;
}

function while_drag() {
    var x_cursor = window.event.clientX;
    var y_cursor = window.event.clientY;
    if (img_ele !== null) {
        img_ele.style.left = (x_cursor - x_img_ele) + 'px';
        img_ele.style.top = ( window.event.clientY - y_img_ele) + 'px';

        //console.log(img_ele.style.left+' - '+img_ele.style.top);

    }
}
  
// enable pan
mapImg.addEventListener('mousedown', start_drag);
map.addEventListener('mousemove', while_drag);
map.addEventListener('mouseup', stop_drag);
// enable zoom
map.onwheel = zoom;
// disable right-click the image
mapImg.addEventListener('contextmenu', event => event.preventDefault());


let moveID = 1
let moveIDtoURL = {
    13: 'https://psv4.userapi.com/c520036/u467135438/docs/d30/3df43ae5d0e4/karta_13_khod.png',
    12: 'https://psv4.userapi.com/c520036/u467135438/docs/d1/bd6914a79cd8/karta_12_khod.png',
    11: 'https://psv4.userapi.com/c856420/u467135438/docs/d4/beba5a2c48ae/Karta_11khod.png',
    10: 'https://psv4.userapi.com/c856336/u467135438/docs/d2/58c6db83707e/Karta_10khod.png',
    9: 'https://psv4.userapi.com/c536132/u467135438/docs/d21/83914503070a/Karta_9khod.png',
    8: 'https://psv4.userapi.com/c856420/u467135438/docs/d5/ef2c8952df9f/Karta_8khod.png',
    7: 'https://psv4.userapi.com/c856220/u467135438/docs/d8/0550b876ff54/Karta_7khod.png',
    6: 'https://psv4.userapi.com/c532036/u467135438/docs/d35/6a2515204b13/Karta_6khod.png',
    5: 'https://psv4.userapi.com/c856424/u467135438/docs/d2/718e0914cea8/Karta_5khod.png',
    4: 'https://psv4.userapi.com/c856428/u467135438/docs/d13/f6400a7f93ba/Karta_4khod.png',
    3: 'https://psv4.userapi.com/c856536/u467135438/docs/d5/301bb3a695ab/Karta_3khod.png',
    2: 'https://psv4.userapi.com/c856324/u467135438/docs/d2/095a7a8a83e5/Karta_2khod.png',
    1: 'https://psv4.userapi.com/c856336/u467135438/docs/d3/f3de76e32df4/Karta_1khod.png',
}


function updateURL(event) {
    if (event.target.classList.contains('move')) {
        moveID = event.target.innerText
        let newURL = moveIDtoURL[moveID]
        if (newURL) {
            mapImg.src = newURL
        } else {
            mapImg.src = ''
        } 
    }}

menuMoves.addEventListener('touchstart', event => { updateURL(event) })
menuMoves.addEventListener('click', event => { updateURL(event) })