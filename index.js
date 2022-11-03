const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576

let openPopup = document.getElementById("open-popup")
let finalPopup = document.getElementById("final-popup")
let closePopup = document.getElementById("close-btn")
function GameOver() {
    openPopup.classList.add("change-popup")
}
function endPopup() {
    finalPopup.classList.add("change-popup")
}
function closeBtn() {
    openPopup.classList.remove("change-popup")
    document.location.reload()
}

const gravity = 0.5
let player = new Player()
let platforms = []
let backgroundSetup = []
let finishLine = 0
let bugs = []
let diplomas = []
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}
function game() {

let timeoutHandle;
function countdown(minutes, seconds) {
    function tick() {
        let counter = document.querySelector(".countdown");
        counter.innerHTML =
            minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        seconds--
        if (minutes == 0 && seconds == 0 ) {
            player = ''
            clearInterval(timeoutHandle)
            GameOver()
        }
        if (seconds >= 0) {
            timeoutHandle = setTimeout(tick, 1000);
        } else {
            if (minutes >= 1) {
                setTimeout(function () {
                    countdown(minutes - 1, 59);
                }, 1000);
            }
        }
    }
    tick();
}
countdown(2, 00)

let lives = document.querySelector(".lives")
let countLives = 3


function init() {

    finishLine = 0

    let platformImage = new Image()
    platformImage.src = "./img/platform.png"
    let playerImage = new Image()
    playerImage.src = "./img/programmer.png"
    let backImage = new Image()
    backImage.src = "./img/skybackground.png"
    let bugImage = new Image()
    bugImage.src = "./img/htmlbug.png"
    let diplomaImage = new Image()
    diplomaImage.src = "./img/graduated.png"

    player = new Player(playerImage)
           
    bugs = [new Bug(1900, 480, bugImage, 50, 50), new Bug(3100, 310, bugImage, 50, 50)]

    platforms = [new Platform(0, 520, 1000, platformImage), 
                new Platform(1000, 520, 500, platformImage), 
                new Platform(1650, 520, 950, platformImage), 
                new Platform(2600, 450, 300, platformImage),
                new Platform(2900, 350, 300, platformImage),
                new Platform(3200, 250, 300, platformImage),
                new Platform(3800, 520, 1000, platformImage)]

    backgroundSetup = [new BackgroundImage(0, 0, backImage), 
                        new BackgroundImage(1024, 0, backImage), 
                        new BackgroundImage(2048, 0, backImage),
                        new BackgroundImage(3072, 0, backImage)]

    diplomas = [new Diploma(4400, 400, diplomaImage)] 
}

function initCss() {
    
    finishLine = 4050
    let platformImage = new Image()
    platformImage.src = "./img/platform2.png"
    let playerImage = new Image()
    playerImage.src = "./img/programmer.png"
    let backImage = new Image()
    backImage.src = "./img/background2.png"
    let bugImage = new Image()
    bugImage.src = "./img/bug2.png"
    let diplomaImage = new Image()
    diplomaImage.src = "./img/graduated.png"

    player = new Player(playerImage)
    
    bugs = [new Bug(700, 450, bugImage, 80, 80),
            new Bug(1900, 450, bugImage, 80, 80), 
            new Bug(3100, 280, bugImage, 80, 80),
            new Bug(4000, 450, bugImage, 80, 80)]

    platforms = [new Platform(0, 520, 1000, platformImage), 
                new Platform(1100, 450, 300, platformImage), 
                new Platform(1650, 520, 950, platformImage), 
                new Platform(2600, 450, 300, platformImage),
                new Platform(2900, 350, 300, platformImage),
                new Platform(3200, 450, 300, platformImage),
                new Platform(3700, 520, 1000, platformImage)]

    backgroundSetup = [new BackgroundImage(0, 0, backImage), 
                        new BackgroundImage(1024, 0, backImage), 
                        new BackgroundImage(2048, 0, backImage),
                        new BackgroundImage(3072, 0, backImage)]
                
    diplomas = [new Diploma(4350, 400, diplomaImage)] 
}

function initJs() {

    finishLine = 8050

    let platformImage = new Image()
    platformImage.src = "./img/platform3.png"
    let playerImage = new Image()
    playerImage.src = "./img/programmer.png"
    let backImage = new Image()
    backImage.src = "./img/background3.jpg"
    let bugImage = new Image()
    bugImage.src = "./img/bug3.png"
    let diplomaImage = new Image()
    diplomaImage.src = "./img/graduated.png"

    player = new Player(playerImage)
        
    bugs = [new Bug(1900, 430, bugImage, 100, 100), 
            new Bug(1900, 310, bugImage, 100, 100),
            new Bug(2500, 280, bugImage, 100, 100), 
            new Bug(3100, 280, bugImage, 100, 100),
            new Bug(4400, 240, bugImage, 100, 100), 
            new Bug(3400, 230, bugImage, 100, 100)]

    platforms = [new Platform(0, 520, 2000, platformImage), 
                new Platform(500, 420, 500, platformImage), 
                new Platform(1000, 320, 500, platformImage), 
                new Platform(1500, 220, 500, platformImage),
                new Platform(2300, 350, 1000, platformImage),
                new Platform(3300, 300, 300, platformImage),
                new Platform(3600, 250, 300, platformImage),
                new Platform(3900, 150, 300, platformImage)
            ]

    backgroundSetup = [new BackgroundImage(0, 0, backImage), 
                        new BackgroundImage(1024, 0, backImage), 
                        new BackgroundImage(2048, 0, backImage),
                        new BackgroundImage(3072, 0, backImage)]

    diplomas = [new Diploma(4400, 400, diplomaImage)] 
}

function animate() {
    requestAnimationFrame(animate)
          
    backgroundSetup.forEach((background) => {
        background.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })

    bugs.forEach((bug) => {
        bug.draw()
    })

    diplomas.forEach((diploma) => {
        diploma.draw()
    })
      
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed && finishLine === 0 && player.position.x > 0){
        player.velocity.x = -5
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            finishLine += 5
            platforms.forEach((platform) => {
                platform.x -= 5 
            })
            diplomas.forEach((diploma) => {
                diploma.x -=5
            })
            bugs.forEach((bug) => {
                bug.x -=5
            })
            backgroundSetup.forEach((background) => {
                background.x -= 3
            })
        } else if (keys.left.pressed && finishLine > 0) {
            finishLine -= 5
            platforms.forEach((platform) => {
            platform.x += 5
        })
            backgroundSetup.forEach((background) => {
                background.x += 3
        })
        bugs.forEach((bug) => {
            bug.x += 5
        })
        diplomas.forEach((diploma) => {
            diploma.x +=5
        })
    }
    }

    bugs.forEach((bug) => {
        if (Math.hypot(bug.x - player.position.x, bug.y - player.position.y) < 60) {
        countLives--
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

    if (finishLine == 4000) {
        initCss()
    } if (finishLine == 8000) {
        initJs()
    } if (finishLine == 12000) {
        player = ''
        clearInterval(timeoutHandle)
        endPopup()
    }


    if (player.position.y > canvas.height) {
        countLives--
        init()
    }

    if(countLives == 0) {
        player = ''
        clearInterval(timeoutHandle)
        GameOver()
        
        }
    lives.innerHTML = countLives
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
}
let startPage = document.getElementById("start-page")
function startBtn() {
   
    startPage.classList.add("start-visibility")
    game()
}


