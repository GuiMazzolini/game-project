class Player {
    constructor(image) {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 5
        }
        this.image = image
        this.width = 70
        this.height = 90
        this.jumping = false
    }
    
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
    
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
      
    }
}