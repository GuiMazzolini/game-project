class Bug {
    constructor(x, y, image) {
        this.x = x
        this.y = y
        this.image = image
        this.width = 50
        this.height = 50
    }
    
    draw(){
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}