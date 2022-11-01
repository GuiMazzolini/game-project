class Platform {
    constructor(x, y, width, image) {
        this.x = x,
        this.y = y
        this.image = image
        this.width = width
        this.height = 50
        
    }

    draw() {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}