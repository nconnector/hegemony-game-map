const map = document.getElementById('map')
const img = document.getElementById('map__img')


function zoom(event) {
    scale += event.deltaY * -0.005;
    // Restrict scale
    scale = Math.min(Math.max(1, scale), 4);
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
    x_img_ele = window.event.clientX - img.offsetLeft;
    y_img_ele = window.event.clientY - img.offsetTop;

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
  
img.addEventListener('mousedown', start_drag);
map.addEventListener('mousemove', while_drag);
map.addEventListener('mouseup', stop_drag);
map.onwheel = zoom;
