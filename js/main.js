// main.js

const canvasWidth = 1200;
const canvasHeight = 675;
const horizonHeight = canvasHeight * 0.7;

let backgrounds;
let obstacles;
let collectables;
let player;
let flagPole;

let treesData;
let cloudsData;
let mountsData;
let backMountsData;
let grassData;
let rocksData;
let trapsData;
let lingzhisData;
let peachesData;
let flagPoleData;

let cameraPosX = 0;
let popupWelcome;
let popupGameOver;
let popupGameWin;
let scoreWindow;
let gameStatus = "Welcome";
// "Welcome","Available","Over", "Win"
let lingzhiNum = 0;
let peachNum = 0;

function preload() {
    // Asynchronously load json file
    loadJSON('data/levels/level_1.json', loadData);
    // Handle data with the Callback funtion 'loadData'
    function loadData(data) {
        treesData = data.treesData;
        cloudsData = data.cloudsData;
        mountsData = data.mountsData;
        backMountsData = data.backMountsData;
        rocksData = data.rocksData;
        trapsData = data.trapsData;
        lingzhisData = data.lingzhisData;
        peachesData = data.peachesData;
        flagPoleData = data.flagPoleData;
        grassData = data.grassData;
        playerData = data.playerData;

        // Create instances after data is loaded
        backgrounds = new Background(treesData, cloudsData, mountsData, backMountsData, grassData);
        obstacles = new Obstacle(rocksData, trapsData);
        collectables = new Collectable(lingzhisData, peachesData);
        flagPole = new FlagPole(flagPoleData);
        player = new Player(playerData);

        popupWelcome = new Popup(0);
        popupGameOver = new Popup(1);
        popupGameWin = new Popup(2);
        scoreWindow = new ScoreWindow(lingzhiNum, peachNum);

        // Preload image resources
        Sky.preload();
        Tree.preload();
        Cloud.preload();
        Mount.preload();
        BackMount.preload();
        Grass.preload();
        Rock.preload();
        Trap.preload();
        Lingzhi.preload();
        Peach.preload();
        Player.preload();
        Flag.preload();
        FlagPole.preload();
        Popup.preload();
        ScoreWindow.preload();
        Digit.preload();
    }
}


function setup() {
    noCanvas();
    createCanvas(canvasWidth, canvasHeight);
    frameRate(30);
}

function draw() {
    Sky.show();
    Ground.show();
    scoreWindow.show();

    // Make the background scenery scroll
    push();
    translate(-cameraPosX, 0);
    backgrounds.update(player.x - canvasWidth / 2);
    backgrounds.show();
    obstacles.show();
    // If the player collide the collectables, collectables don't show.
    for (let item of collectables.lingzhis) {
        if (collide(player, item)) {
            item.found();
        }
        if (!item.isFound) {
            item.update();
            item.show();
        }
        //To ignore those counted.
        if (item.isFound && !item.isCounted) {
            lingzhiNum++;
            item.isCounted = true;
            scoreWindow.update(lingzhiNum, peachNum);
        }
    }
    for (let item of collectables.peaches) {
        if (collide(player, item)) {
            item.found();
        }
        if (!item.isFound) {
            item.update();
            item.show();
        }
        //To ignore those counted.
        if (item.isFound && !item.isCounted) {
            peachNum++;
            item.isCounted = true;
            scoreWindow.update(lingzhiNum, peachNum);
        }
    }
    // If the player drops into the trap,the player will drops to the bottom of the trap and cannot move any more.
    for (let item of obstacles.traps) {
        if (trapped(player, item)) {
            player.trapped(item);
            gameStatus = "Over";
            // Wait for 2s
            setTimeout(() => {
                popupGameOver.visible = true;
            }, 2000);
        }
    }

    // When the distance between the player and the flagpole is less than 15, it can be considered "reached"
    if (abs(player.x - flagPole.x) < 15) {
        flagPole.reached();
    }
    if (flagPole.isReached) {
        flagPole.raiseFlag();
        flagPole.show();
        gameStatus = "Win";
        // Wait for 3s
        setTimeout(() => {
            popupGameWin.visible = true;
        }, 3000);
    }
    else flagPole.show();

    player.update(gameStatus, peachNum);
    player.show();

    //Update cameraPosX based on the player's x postion
    if (player.x < cameraPosX + 300) {
        cameraPosX += player.x - (cameraPosX + 300);
    }
    if (player.x > cameraPosX + canvasWidth - 400) {
        cameraPosX += player.x - (cameraPosX + canvasWidth - 400);
    }
    pop();
    switch (gameStatus) {
        case "Welcome":
            popupWelcome.visible = true;
            popupWelcome.show();
            break;
        case "Over":
            popupGameOver.show();
            break;
        case "Win":
            popupGameWin.show(lingzhiNum, peachNum);
            break;
        default:
            break;
    }
}

function mousePressed() {
    switch (gameStatus) {
        case "Welcome":
            popupWelcome.checkButton();
            gameStatus = "Available";
            break;
        case "Over":
            popupGameOver.checkButton();
            gameReload();
            break;
        case "Win":
            popupGameWin.checkButton();
            gameReload();
            break;
        default:
            break;
    }
}

//Detect two rect-shaped objects' collision
function collide(obj_1, obj_2) {
    return (obj_1.x < obj_2.x + obj_2.width &&
        obj_1.x + obj_1.width > obj_2.x &&
        obj_1.y < obj_2.y + obj_2.height &&
        obj_1.y + obj_1.height > obj_2.y);
}


function trapped(obj_1, obj_2) {
    return obj_1.x > obj_2.x && obj_1.x + obj_1.width < obj_2.x + obj_2.width
}

function gameReload() {
    gameStatus = "Welcome";
    popupGameOver.visible = false;
    popupGameWin.visible = false;
    cameraPosX = 0;
    lingzhiNum = 0;
    peachNum = 0;
    player.reload();
    player.update(gameStatus, peachNum);
    collectables.reload();
    flagPole.reload();
    scoreWindow.update(lingzhiNum, peachNum);
}