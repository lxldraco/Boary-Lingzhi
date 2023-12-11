//flabPole.js

class FlagPole {
    constructor(_x) {
        this.height = 394;
        this.x = _x;
        this.y = horizonHeight - this.height + 10;
        this.rock = new Rock(1, this.x);
        this.flag = new Flag(this.x + 37, horizonHeight - 129);
        this.isReached = false;
    }
    static preload() {
        FlagPole.img = loadImage('data/image/flag/flagPole.png');
    }
    reload() {
        this.flag = new Flag(this.x + 37, horizonHeight - 129);
        this.isReached = false;
    }
    show() {
        image(FlagPole.img, this.x, this.y);
        this.rock.show();
        this.flag.show();
    }
    reached() {
        this.isReached = true;
    }
    raiseFlag() {
        if (this.flag.y > this.flag.topHeight)
            this.flag.y -= 3;
    }
}

class Flag {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.width = 75;
        this.height = 129;
        this.topHeight = horizonHeight - 335;
    }
    static preload() {
        Flag.img = loadImage('data/image/flag/flag.png');
    }
    show() {
        image(Flag.img, this.x - this.width / 2, this.y)
    }
}