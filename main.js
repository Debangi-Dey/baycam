img = ""
status1 = ""
Objects = []
song = ""

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    v1 = createCapture(VIDEO)
    v1.hide()
    objD = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "status : detecting object"
}

function modelLoaded() {
    console.log("model Loaded")
    status1 = true
    objD.detect(v1, gotResults)
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        Objects = results
    }
}

function draw() {
    image(v1, 0, 0, 600, 500)
    if (status1 != "") {
        r = random(255)
        g = random(255)
        b = random(255)
        objD.detect(v1, gotResults)
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected"
            fill(r, g, b)
            perc = floor(Objects[i].confidence * 100)
            text(Objects[i].label + " " + perc + "%", Objects[i].x - 30, Objects[i].y)
            noFill()
            stroke(r, g, b)
            rect(Objects[i].x - 30, Objects[i].y, Objects[i].width, Objects[i].height)
            if (Objects[i].label == "person") {
                document.getElementById("no-obj").innerHTML = "baby is in room"
                song.stop()
            } else {
                document.getElementById("no-obj").innerHTML = "baby out of sight"
                song.play()
            }

            if (Objects.length == 0) {
                document.getElementById("no-obj").innerHTML = "baby out of sight"
                song.play()
            }
        }
    }
    /*
    text("dog", 45, 45)
    fill("red")
    noFill()
    stroke("brown")
    rect(30, 60, 250, 350)
    text("cat", 220, 45)
    fill("red")
    noFill()
    stroke("brown")
    rect(200, 60, 250, 350)
    */
}