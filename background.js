class BackgroundImage {
    constructor(x, y, image) {
        this.x = x
        this.y = y
        this.image = image
        this.width = 1024
        this.height = 600
    }

    draw() {
        c.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}