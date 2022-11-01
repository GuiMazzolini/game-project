const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576

const gravity = 0.5


let player = new Player()
let platforms = []
backgroundSetup = []
let scrollOffset = 0
let bugs = []

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function init() {
    let platformImage = new Image()
    platformImage.src = "./img/platform.png"
    let playerImage = new Image()
    playerImage.src = "./img/programmer.png"
    let backImage = new Image()
    backImage.src = "./img/skybackground.png"
    let bugImage = new Image()
    bugImage.src = "./img/htmlbug.png"

    player = new Player(playerImage)
        
    bugs = [new Bug(1900, 480, bugImage), new Bug(3100, 310, bugImage)]


    platforms = [new Platform(0, 520, 1000, platformImage), 
                new Platform(1000, 520, 500, platformImage), 
                new Platform(1650, 520, 950, platformImage), 
                new Platform(2600, 450, 300, platformImage),
                new Platform(2900, 350, 300, platformImage),
                new Platform(3200, 250, 300, platformImage),
                new Platform(3800, 520, 1000, platformImage)]


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

    backgroundSetup = [new BackgroundImage(0, 0, backImage), 
                        new BackgroundImage(1024, 0, backImage), 
                        new BackgroundImage(2048, 0, backImage),
                        new BackgroundImage(3072, 0, backImage)
                    ]
    
    scrollOffset = 0
}

function initCss() {
    let platformImage = new Image()
    platformImage.src = "./img/platform.png"
    let playerImage = new Image()
    playerImage.src = "./img/mario.png"
    let backImage = new Image()
    backImage.src = "./img/skybackground.png"
    let bugImage = new Image()
    bugImage.src = "./img/htmlbug.png"

    player = new Player(playerImage)
        
    bugs = [new Bug(1900, 480, bugImage), 
            new Bug(3100, 310, bugImage)]


    platforms = [new Platform(0, 520, 1000, platformImage), 
                new Platform(1000, 520, 500, platformImage), 
                new Platform(1650, 520, 950, platformImage), 
                new Platform(2600, 450, 300, platformImage),
                new Platform(2900, 350, 300, platformImage),
                new Platform(3200, 250, 300, platformImage),
                new Platform(3800, 520, 1000, platformImage)]


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

    backgroundSetup = [new BackgroundImage(0, 0, backImage), 
                        new BackgroundImage(1024, 0, backImage), 
                        new BackgroundImage(2048, 0, backImage),
                        new BackgroundImage(3072, 0, backImage)
                    ]
    
    scrollOffset = 0
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    backgroundSetup.forEach((background) => {
        background.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })

    bugs.forEach((bug) => {
        bug.draw()
    })

    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0){
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach((platform) => {
                platform.x -= 5 
            })
            bugs.forEach((bug) => {
                bug.x -=5
            })
            backgroundSetup.forEach((background) => {
                background.x -= 3
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= 5
            platforms.forEach((platform) => {
            platform.x += 5
        })
            backgroundSetup.forEach((background) => {
                background.x += 3
        })
        bugs.forEach((bug) => {
            bug.x += 5
        })
    }
    }
    bugs.forEach((bug) => {
        console.log(Math.hypot(bug.x - player.position.x, bug.y - player.position.y))
        if (Math.hypot(bug.x - player.position.x, bug.y - player.position.y) < 60) {
		init()
        } 
    })

    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.y &&
            player.position.y + player.height + player.velocity.y >= platform.y &&
            player.position.x + player.width >= platform.x &&
            player.position.x <= platform.x + platform.width) {
            player.velocity.y = 0
        }
    })

    if (scrollOffset > 4000) {
        console.log("you win")
        initCss()
    }

    if (player.position.y > canvas.height) {
        init()
    }
}

init()
animate()

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            keys.left.pressed = true
            break
        case 38:
            
            player.velocity.y -= 0.1
            break
        case 39:
            
            keys.right.pressed = true
            break
        case 40:
            
            break
    }
})
addEventListener('keyup', ({ keyCode }) => {
    switch(keyCode) {
        case 37:
            keys.left.pressed = false
            
            break
        case 38:
            
            player.velocity.y -= 10
            break
        case 39:
            keys.right.pressed = false
            
            break
        case 40:
            
            break
    }
})

