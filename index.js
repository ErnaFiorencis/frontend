const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')


canvas.width = 1074 //1024
canvas.height = 580 //576

const collisionsMap = []
for(let i = 0; i < collisionsNovo.length; i+=64){
   collisionsMap.push(collisionsNovo.slice(i, 64 + i))
}


const zoneMap = []
for(let i = 0; i < zonesDataNovo.length; i+=64){
   zoneMap.push(zonesDataNovo.slice(i, 64 + i))
}



const offset = {
    x: -1350,
    y: -755
}

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1000 || symbol === 1125){
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
                symbol: symbol
            }))
    }
    })
})

const zones = []
zoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1075){
            zones.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
                symbol: symbol
            }))
    }
    })
})




const playerImage = new Image()
playerImage.src = './img/character.png' 

const image = new Image()
image.src = './img/novo2.png'

const foregroundImage = new Image()
foregroundImage.src = './img/novof2.png'



const player = new Sprite({
    position: {
        x: canvas.width/2 - playerImage.width/2, 
        y:canvas.height/2 - playerImage.height/2
    },
    image: playerImage,
    frames: {max: 4, min: 2}
})

//
//,



const background = new Sprite({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: image

})

const foreground = new Sprite({
    position: {
    x: offset.x,
    y: offset.y
    },
    image: foregroundImage

})

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
    space:{
        pressed: false
    }
}

const testBoundary = new Boundary({
    position:{
        x: 400,
        y: 400
    }
})

const movable = [background, ...boundaries, foreground, ...zones]

function rectangularCollision({rec1, rec2}){
    //console.log(rec1)
    return(
        rec1.position.x + rec1.width >= rec2.position.x 
        // && player.position.x  <= testBoundary.position.x + testBoundary.width
        && rec1.position.x  <= rec2.position.x 
          && rec1.position.y  <= rec2.position.y 
        && rec1.position.y + rec1.height >= rec2.position.y )
}

const z = {
    initiated: false,
    recently: 50,
}

function checkLevel(level){
    if(!localStorage.getItem("user")){
        return false
    }
    console.log(level)
    return true
}

function animate(){
    const animationId = window.requestAnimationFrame(animate)

    background.draw()


    player.draw()
    foreground.draw()

    let moving = true
    player.moving = false

    if(z.initiated) return
    //console.log(zone.initiated)

    //activate a zone
    if(keys.w.pressed || keys.s.pressed || keys.d.pressed || keys.a.pressed || keys.space.pressed){

    for (let i = 0; i < zones.length; i++){
        const zone = zones[i]
        /*const overlapingArea = (Math.min(player.position.x + player.width, zone.position.x + zone.width
            ) - Math.max(player.position.x, zone.position.x)) *
            (Math.min(player.position.y + player.height, zone.position.y + zone.height
                ) - Math.max(player.position.y, zone.position.y))*/
        if( rectangularCollision({rec1:player, rec2: {...zone, position: {x: zone.position.x, y: zone.position.y + 3}}})
         //&& overlapingArea > (player.width * player.height) / 2
    ){
        //if(z.recently == 0){
            console.log("bakery")
        if(keys.space.pressed && lastKey == 'space'){
            console.log("activate zone")
            console.log(zone)
            z.initiated = true
            //console.log(zone.initiated)
            window.cancelAnimationFrame(animationId)
            document.getElementById("startBox").style.display = "block"
            document.getElementById("cancle").style.display = "block"
            document.getElementById("sideBarDisplay").style.display = "block"
            document.getElementById("sideBar").style.display = "none"
            chooseZone(zone["symbol"])
            console.log("tu")
            break
        }
        else{
            z.recently -= 1
        }
    }
    }
}
    
    //let moving = true
    //player.moving = false
    if(keys.w.pressed && lastKey == 'w'){
        player.frames.valy = 1;
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if( rectangularCollision({rec1:player, rec2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y + 3}}})
        ){
            console.log("col")
            if(boundary["symbol"] === 1125){
                if(!checkLevel(5)){
                    moving = false
                    break
                }
            }
            else{
                moving = false
                break
            }

        
        }
        }


        if(moving)
            movable.forEach((movable) => {movable.position.y += 3})
    }
    else if(keys.s.pressed && lastKey == 's'){
        player.frames.valy = 0;
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if( rectangularCollision({rec1:player, rec2: {...boundary, position: {x: boundary.position.x, y: boundary.position.y - 10}}})
        ){
            console.log("col")
            if(boundary["symbol"] === 1125){
                if(!checkLevel(5)){
                    moving = false
                    break
                }
            }
            else{
                moving = false
                break
            }
        
        }
        }
        if(moving)
            movable.forEach((movable) => {movable.position.y -= 3})
    }
    else if(keys.d.pressed && lastKey == 'd'){
        player.frames.valy = 3;
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if( rectangularCollision({rec1:player, rec2: {...boundary, position: {x: boundary.position.x - 3, y: boundary.position.y}}})
        ){
            console.log("col")
            moving = false
            break
        
        }
        }
        if(moving)
            movable.forEach((movable) => {movable.position.x-= 3})
    }
    else if(keys.a.pressed && lastKey == 'a'){
        player.frames.valy = 2;
        player.moving = true
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if( rectangularCollision({rec1:player, rec2: {...boundary, position: {x: boundary.position.x + 3, y: boundary.position.y}}})
        ){
            console.log("col")
            moving = false
            break
        
        }
        }
        if(moving)
            movable.forEach((movable) => {movable.position.x += 3})
    }



}
animate()


let lastKey = ''
window.addEventListener('keydown', (e) => {
    if(e.keyCode === 32){
        console.log("space")
        keys.space.pressed = true
        lastKey = 'space'
    }
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break       
        case 'h':
            keys.space.pressed = true
            lastKey = 'space'
            break    
    }
    
})


window.addEventListener('keyup', (e) => {
    if(e.keyCode === 32){
        console.log("space")
        keys.space.pressed = false
    }
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break       
        case 'h':
            keys.space.pressed = false
            break     
    }
    
})

// Add event listener for touchstart, touchmove, and touchend
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, false);

// Variables to track touch coordinates
let touchStartX = 0;
let touchStartY = 0;

// Constants to define swipe threshold values (adjust as needed)
const SWIPE_THRESHOLD = 50; // Minimum distance required for a swipe
const SWIPE_VERTICAL_THRESHOLD = 30; // Minimum vertical distance required for a vertical swipe

// Function to handle touchstart event
function handleTouchStart(event) {
    keys.s.pressed = false
    keys.w.pressed = false
    keys.a.pressed = false
    keys.d.pressed = false
  const touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

// Function to handle touchmove event
function handleTouchMove(event) {
  event.preventDefault(); // Prevent scrolling while swiping
}

// Function to handle touchend event
function handleTouchEnd(event) {
  const touch = event.changedTouches[0];
  const touchEndX = touch.clientX;
  const touchEndY = touch.clientY;

  // Calculate touch distance and direction
  const touchDistanceX = touchEndX - touchStartX;
  const touchDistanceY = touchEndY - touchStartY;

  // Determine the gesture type based on touch distance and direction
  if (Math.abs(touchDistanceX) > SWIPE_THRESHOLD) {
    // Horizontal swipe detected
    if (touchDistanceX > 0) {
      // Right swipe (corresponds to "D" key)
      //performAction('keydown', 'd');
      console.log("d")
      keys.d.pressed = true
      lastKey = 'd'
    } else {
      // Left swipe (corresponds to "A" key)
      //performAction('keydown', 'd');
      console.log("a")
      keys.a.pressed = true
      lastKey = 'a'
    }
  } else if (Math.abs(touchDistanceY) > SWIPE_THRESHOLD) {
    // Vertical swipe detected
    if (touchDistanceY > 0) {
      // Down swipe (corresponds to "S" key)
      //performAction('keydown', 's');
      console.log("s")
      keys.s.pressed = true
      lastKey = 's'
    } else {
      // Up swipe (corresponds to "W" key)
      //performAction('keydown', 'w');
      keys.w.pressed = true
      lastKey = 'w'
      console.log("w")
   

    }
  }
}

