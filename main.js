// get the viewport height and multiply it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

const map = document.getElementById('map')
const mapImg = document.getElementById('map__img')
const menu = document.getElementById('menu')
const moves_default = document.getElementById('menu__moves')
const moves_dropdown = document.getElementById('menu__moves__full')


// set starting layout 
const latest_move = 22 // TODO!!
mapImg.setAttribute('src', getURL(latest_move))

const moves_per_column = 20
const max_moves = 40
for (i = 0; i < max_moves; i++) {
    let div = document.createElement('div')
    div.className = i + 1 == latest_move ? 'button image active' : 'button image'
    div.innerText = i + 1
    div.setAttribute('data-id', i + 1)
    moves_dropdown.append(div)
    // only last column is appended to default moves 
    if (i >= max_moves - moves_per_column) {
        let div2 = document.createElement('div')
        div2.className = i + 1 == latest_move ? 'button image active' : 'button image'
        div2.innerText = i + 1
        div2.setAttribute('data-id', i + 1)
        moves_default.append(div2)
    }
}


// zoom functionality
let scale = 1;
function zoom(event) {
    scale += event.deltaY * -0.001
    // Restrict scale
    scale = Math.min(Math.max(0.5, scale), 4)
    // Apply scale transform
    map.style.transform = `scale(${scale})`
}


// Pan Functionality
let img_ele = null
let x_cursor = 0
let y_cursor = 0
let x_img_ele = 0
let y_img_ele = 0

function start_drag(event) {
    img_ele = this;
    if (event.type == 'mousedown') {
        x_img_ele = window.event.clientX - mapImg.offsetLeft
        y_img_ele = window.event.clientY - mapImg.offsetTop
    } else if (event.type == 'touchstart') {
        let touch = event.touches[0] || event.changedTouches[0]
        x_img_ele = touch.clientX - mapImg.offsetLeft
        y_img_ele = touch.clientY - mapImg.offsetTop
    }
}

function stop_drag() {
    img_ele = null
}

function while_drag(event) {
    if (event.type == 'mousemove') {
        x_cursor = window.event.clientX
        y_cursor = window.event.clientY
    } else if (event.type = 'touchmove') {
        let touch = event.touches[0] || event.changedTouches[0]
        x_cursor = touch.clientX
        y_cursor = touch.clientY
    }
    if (img_ele !== null) {
        img_ele.style.left = (x_cursor - x_img_ele) + 'px'
        img_ele.style.top = (y_cursor - y_img_ele) + 'px'
        //track movement in console
        //console.log(img_ele.style.left+' - '+img_ele.style.top)

    }
}

// enable pan
mapImg.addEventListener('mousedown', start_drag)
map.addEventListener('mousemove', while_drag)
map.addEventListener('mouseup', stop_drag)
mapImg.addEventListener('touchstart', start_drag)
map.addEventListener('touchmove', while_drag)
map.addEventListener('touchend', stop_drag)
// enable zoom
map.onwheel = zoom
// disable right-click the image
mapImg.addEventListener('contextmenu', event => event.preventDefault())




// UI - Buttons
let moveID = 1

function getURL(key) {
    let url = ''
    let keys = {
        'Правители': 'images/names.png',
        'Ресурсы': 'images/resources.jpg',
        'Климат': 'images/climate.jpg',
        'Этнос': 'images/ethnicity.jpg',
        'Религия': 'images/religion.png',
    }
    if (/^[1-9][0-9]*$/.test(key)) {
        url = `images/karta_${key}_khod.png`
    }
    else if (keys[key] !== undefined) {
        url = keys[key]
    }
    return url
}

function updateURL(event) {
    if (event.target.classList.contains('image')) {
        moveID = event.target.innerText
        let newURL = getURL(moveID)
        if (newURL) {
            mapImg.src = newURL
            document.querySelectorAll('.button.active').forEach(item => item.classList.remove('active'))
            //event.target.classList.add('active')
            document.querySelectorAll(`.button.image[data-id="${moveID}"]`).forEach(item => item.classList.add('active'))
            event.stopPropagation()
            event.preventDefault()
        } else {
            mapImg.src = ''
        }
    }

    else if (event.target.classList.contains('menu__header__item')) {
        // remove active class from former active header item
        const activeMenuHeader = document.querySelector('.menu__header__item.active')
        const activeDropdownItem = document.querySelector('.dropdown__item.active')
        const itemId = event.target.dataset.dropdown

        if (activeMenuHeader) {
            activeMenuHeader.classList.remove('active')
            if (activeDropdownItem) {
                activeDropdownItem.classList.remove('active')
                activeDropdownItem.style.visibility = 'hidden'
            }
            if (activeMenuHeader.dataset.dropdown == 'menu__moves__full') {
                // if moves__full disabled, enable moves__default 
                moves_default.style.visibility = 'visible'
            }
        }
        // add active class to new active header item based on value
        console.log(`past active = ${activeMenuHeader}`)
        console.log(`new  active = ${event.target}`)
        if (activeMenuHeader !== event.target) {
            event.target.classList.add('active')
            if (itemId) {
                const dropdownMenuItem = document.querySelector(`#${itemId}`)
                dropdownMenuItem.style.visibility = 'visible'
                dropdownMenuItem.classList.add('active')
                if (itemId == 'menu__moves__full') {
                    // if moves__full enabled, disable moves__default 
                    moves_default.style.visibility = 'hidden'
                }
                event.stopPropagation()
                event.preventDefault()
            }
            else {
                // timeout 0.5 sec remove active status from header item
                setTimeout(() => event.target.classList.remove('active'), 500)
            }
        }
    }
}

menu.addEventListener('touchend', event => { updateURL(event) })
menu.addEventListener('click', event => { updateURL(event) })