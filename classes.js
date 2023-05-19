class Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, min: 1}
    }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, valy: 0, elapsed: 0}
        this.image.onload = () => {
            //this.width = this.image.width / this.frames.max
            this.width = this.image.width / this.frames.max
            this.height = this.image.height / this.frames.max
        }
        this.moving = false
    }

    draw() {
        c.drawImage(
            // croping
            this.image, 
            this.frames.val * this.width,
            this.frames.valy * this.height,
            this.image.width / this.frames.max,
            this.image.height / this.frames.max,
            //actual position
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max * this.frames.min,
            this.image.height / this.frames.max * this.frames.min,
            )
        
        if(!this.moving) return

        if (this.frames.max > 1){
            this.frames.elapsed++
        }
        if(this.frames.elapsed % 10 === 0)
        if(this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
    
    }
}

class Boundary {
    static width = 48
    static height = 48
    static symbol = 0
    constructor({position, symbol}) {
        this.position = position,
        this.symbol = (symbol == undefined ?  0 : symbol),
        this.width = 48
        this.height = 48 // 48 == 16x16 puta uvecanje od 300% 16x3
    }
    draw(){
        c.fillStyle = 'rgba(255,0,0, 0.25)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}