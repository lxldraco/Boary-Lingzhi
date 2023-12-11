//player.js

class Player {
    constructor(_playerData) {
        this.width = 50;
        this.height = 80;
        this.x = 0.5 * canvasWidth;
        this.y = horizonHeight - this.height;
        this.isFalling = false;
        this.walkRight = true;
        this.walkLeft = true;
        this.jumpStrength = 60;
        this.gravity = 3;
        this.speed = 5;
        this.type = 0;
        this.bottomHeight = horizonHeight - this.height;
        this.isPlummeting = false;
        this.start = _playerData.start;
        this.end = _playerData.end;
    }
    static preload() {
        Player.img = [];
        for (let i = 0; i < 4; i++) {
            Player.img[i] = loadImage('data/image/player/player' + i + '.png');
        }
    }
    show() {
        switch (this.type) {
            //Stand, facing frontwards
            case 0:
                image(Player.img[0], this.x, this.y);
                break;
            //Jump, facing forwards
            case 1:
                image(Player.img[1], this.x, this.y);
                break;
            //Jump left
            case 2:
                image(Player.img[2], this.x, this.y);
                break;
            //Jump right
            case 3:
                image(Player.img[3], this.x, this.y);
                break;
            //Walk left
            case 4:
                push();
                scale(-1, 1);
                image(Player.img[2], -(this.x + this.width), this.y);
                pop();
                break;
            //Walk right
            case 5:
                push();
                scale(-1, 1);
                image(Player.img[3], -(this.x + this.width), this.y);
                pop();
                break;
            default:
                break;
        }

    }
    update(_gameStatus, _newStrength) {
        this.jumpStrength = max(this.jumpStrength, _newStrength * 61);
        if (keyIsPressed && !this.isFalling && !this.isPlummeting && _gameStatus === "Available") {
            //Walk right 'd'
            if (keyIsDown(68)) {
                this.x += this.speed;
                this.type = 2;
            }
            //Walk left 'a'
            if (keyIsDown(65)) {
                this.x -= this.speed;
                this.type = 4;
            }
            //Jump up 'w'
            if (keyIsDown(87)) {
                this.y -= this.jumpStrength;
                this.isFalling = true;
                this.type = 1;
            }
            //Jump right
            if (keyIsDown(87) && keyIsDown(68)) {
                this.x += this.speed * 30;
                if (this.y < horizonHeight - 200) {
                    this.y -= this.jumpStrength * 0.1;
                }
                this.isFalling = true;
                this.type = 3;
            }
            //Jump left
            if (keyIsDown(87) && keyIsDown(65)) {
                this.x -= this.speed * 30;
                if (this.y < horizonHeight - 200) {
                    this.y -= this.jumpStrength * 0.1;
                }
                this.isFalling = true;
                this.type = 5;
            }
        }
        if (this.isFalling) {
            // gravity determines the falling speed.
            this.y += this.gravity;
            if (this.y > this.bottomHeight) {
                this.y = this.bottomHeight;
                this.type = 0;
                this.isFalling = false;// reset isFalling as false to prevent double jumps.
            }
        }

        //Constrain the player in the area from "start" to "end"
        if (this.x < this.start) {
            this.x = this.start;
        }
        if (this.x > this.end) {
            this.x = this.end;
        }
    }
    trapped(_trap) {
        this.isFalling = true;
        this.isPlummeting = true;
        this.bottomHeight = horizonHeight + (_trap.height - player.height) - 2;
    }
    reload() {
        this.width = 50;
        this.height = 80;
        this.x = 0.5 * canvasWidth;
        this.y = horizonHeight - this.height;
        this.isFalling = false;
        this.walkLeft = true;
        this.walkRight = true;
        this.jumpStrength = 60;
        this.gravity = 3;
        this.speed = 5;
        this.type = 0;
        this.bottomHeight = horizonHeight - this.height;
        this.isPlummeting = false;
    }
}