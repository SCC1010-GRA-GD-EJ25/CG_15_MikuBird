let imagenFondo
let imagenInicio
let personaje 
let pared
let x = 0 
let posY = 100
let dY =  3 
let estado = 0 //0: menu; 1: jugando; 2: Game Over 
let wallX = []
let wallY = []
let puntaje = 0
let puntajeMax = 0
let recordAnterior = 0
let musicaRecord
let musicaJuego



function preload() {
  // put preload code here
  musicaRecord = loadSound("./sounds/aplauso.wav")
  musicaJuego = loadSound("./sounds/edes.mp3")
 imagenFondo = loadImage("./images/fondojuego00.png")
 personaje = loadImage("./images/miku00.gif")
 imagenInicio = loadImage("./images/flappyedicionespecial.jpeg")
 pared = loadImage("./images/pared.png")


}

function setup() {
  // put setup code here
  createCanvas(1000,512)
  noCursor()
}

function draw() {
  // put drawing code here
  if (estado == 1){  
    imageMode(CORNER)
    background(255)
    image(imagenFondo,x,0)
    image(imagenFondo, x + imagenFondo.width,0)
    x = x - 5
    dY = dY + 1 
    posY = posY + dY
    if (x <= -imagenFondo.width) {
      x = 0 
    }
    //Obstaculos
    for (let i = 0; i<wallX.length; i++){
        imageMode(CENTER)
        image(pared, wallX[i],wallY[i]-500)
        image(pared, wallX[i],wallY[i]+500)

        if (wallX[i] < 0) {
          wallX[i] = width
          wallY[i] = random(200,300)
        }

    //Puntaje
    if ( wallX[i] ===  100){
      puntaje = puntaje + 1
      puntajeMax = max(puntajeMax,puntaje)
    }
        wallX[i] = wallX[i] - 5 //Para que se muevan los obstaculos
        if(posY < -60 || posY > height +60 || (abs(wallX[i]-100)  <60 && abs(wallY[i]-posY)>100)){
         musicaJuego.stop()
         
          estado = 0 
        }


    }
    //Personaje
    image(personaje,100,posY,60,60)
    text("Puntaje: " +puntaje,width/2-60,30)
  }else if ( estado === 0) {
    background(0)
    imageMode(CORNER)
    cursor()
    image(imagenInicio, 0,0,450,600)
    textSize(24)
    fill(255)
    text("Puntaje maximo: "+puntajeMax,600,100)
    text("Haga clic para comenzar",600,200)
    if(puntajeMax > recordAnterior){
      if(!musicaRecord.isPlaying()){
        musicaRecord.play()
      }
    }
  }
}

function mousePressed(){
  //posY = 100
  if(estado === 0){
    estado = 1
    posY = 100
    x = 0 
    dY = 3
    wallX = [500,800,1100]
    wallY[0] = random(200,300)
    wallY[1] = random(200,300)
    wallY[2] = random(200,300)
    puntaje = 0
    recordAnterior = puntajeMax
  
    noCursor()

    if(musicaRecord.isPlaying()){
      musicaRecord.stop()
    }
    musicaJuego.loop()
  }

  dY = -15 
}