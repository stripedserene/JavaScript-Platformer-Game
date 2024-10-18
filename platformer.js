// variables 

var player = new Rectangle({
    width: 10,
    height: 25,
    x: 0,
    y: 0,
    color: 'red'
  })
  
  
  
  var win_text = new Text({
    text: 'you win!',
    size: 175,
    color: 'purple',
    fontfamily: 'times new roman'
  })
  
  win_text.hide()
  
  var playerMoveRight = false
  var playerMoveLeft = false
  var playerJump = false
  var playerCanJump = true
  
  // Basic player movement
  var playerDX = 0
  var playerDY = -5
  
  var gravity = -5
  
  forever(() => {
    player.y += playerDY
  })
  
  forever(() => {
    player.x += playerDX
  })
  
  // Player movement keys
  onKeyDown(() => {
    if (keysDown.includes('D')) {
      playerMoveRight = true
    }
    if (keysDown.includes('A')) {
      playerMoveLeft = true
    }
    if (keysDown.includes('W')) {
      playerJump = true
    }
  })
  
  
  forever(() => {
    if (playerMoveRight === true) {
      playerDX += 0.5
    }
    
    if (playerMoveLeft === true) {
      playerDX -= 0.5
    }
    
    if (playerMoveRight === false && playerMoveLeft === false) {
      playerDX = 0
    }
    
    if (playerJump === true && playerCanJump === true) {
      var jumpTimer = 2
      playerDY = 20
      playerCanJump = false
    }
    if (playerJump === false || playerCanJump === false) {
      playerDY -= 1
      if (playerDY <= gravity) {
        playerDY = gravity
      }
    }
  })
  
  forever(() => {
    if (playerDX >= 5 && playerMoveRight === true) {
      playerDX = 5
      player.penDown()
    }
    if (playerDX <= -5 && playerMoveLeft === true) {
      playerDX = -5
      player.penDown()
    }
  })
  
  forever(() => {
    if (playerMoveLeft === true) {
      playerMoveRight = false
    }
    if (playerMoveRight === true) {
      playerMoveLeft = false
    }
  })
  
  // Advanced player movement
  forever(() => {
    onKeyUp(() => {
      if (playerMoveRight === true) {
        playerMoveRight = false 
        if (keysDown.includes('D') && playerMoveRight === false) {
          playerMoveRight = true
        }
      }
      if (playerMoveLeft === true) {
        playerMoveLeft = false 
        if (keysDown.includes('A') && playerMoveLeft === false) {
          playerMoveLeft = true
        }
      }
      
      if (playerJump === true) {
        playerJump = false
        if (keysDown.includes('W') && playerJump === false) { 
          playerJump = true
        }
      }
    })
  })
  
  // Platforms
  
  var startingPoint = null
  function make_starting_point() {
    startingPoint = new Rectangle({
      width: 100,
      height: 25,
      color: 'green'
    })
    startingPoint.x = minX + 200
    startingPoint.y = randomNumber()
    player.x = startingPoint.x 
    player.y = startingPoint.y + 30
    startingPointX = startingPoint.x
    startingPointY = startingPoint.y
  }
  make_starting_point()
  
  var p = 2
  var platforms = []
  function make_platfroms() {
    var previous_platform = make_platfrom(startingPoint.x, startingPoint.y)
    repeat(5, () => {
      previous_platform = make_platfrom(previous_platform.x, previous_platform.y)
      p += 1
    })
    forever(() => {
      platforms.forEach(platform => {
        if (player.touching(platform)) { 
          player.y = platform.y + 27
          playerCanJump = true
        }
      })
      if (p === 7) {
        make_end_point(previous_platform.x, previous_platform.y)
        p += 1
      }
    })
  }
  
  function make_platfrom(x, y){
    var platform = new Rectangle({
      width: random(25, 100), 
      height: 25,
      color: 'orange',
      x: x + 200,
      y: y + randomNumber(y)
    })
    platforms.push(platform)
    return platform
  }
  make_platfroms()
  
  
  function randomNumber(y) {
    var num1 = random(150, 200)
    var num2 = random(0, 1)
    if (num2 === 0 && y - num1 > minY) {
      num1 = num1 * -1
    }
    else{
      num1 = num1
    }
    if (y + num1 < maxY) {
      num1 = num1
    }
    else {
      num1 = num1 * -1
    }
    return num1
  }
  
  function make_end_point(x, y) {
    var end_point = new Rectangle({
      width: 75,
      height: 25,
      x: x + 200,
      y: y + randomNumber(y),
      color: 'blue'
    })
    forever(() => {
      if (player.touching(end_point)) {
        freeze()
        win_text.show()
      }
    })
  }
  
  // Platfrom collisions 
  forever(() => {
    if (player.touching(startingPoint)){
      player.y = startingPoint.y + 27
      playerCanJump = true
    }
  })
  
  
  
  
  
  
  
  
  
  
  