// obstacle.js

class Obstacle {
    constructor(_rocksData, _trapsData) {
        this.rocks = [];
        _rocksData.forEach(item => {
            this.rocks.push(new Rock(...item));
        });
        this.traps = [];
        _trapsData.forEach(item => {
            this.traps.push(new Trap(...item));
        });
    }
    show() {
        this.rocks.forEach(item => {
            item.show();
        });
        this.traps.forEach(item => {
            item.show();
        });
    }
}

class Trap {
    constructor(_t, _x) {
        this.type = _t;
        this.x = _x;
        this.width = 80;
        this.height = 100;
    }
    static preload() {
        Trap.img = [];
        for (let i = 0; i < 1; i++) {
            Trap.img[i] = loadImage('data/image/trap/trap' + i + '.png');
        }
    }
    show() {
        image(Trap.img[0], this.x, horizonHeight);
    }
}

class Rock {
    constructor(_t, _x) {
        this.type = _t;
        this.WH = [
            { width: 75, height: 41 },
            { width: 84, height: 58 },
            { width: 88, height: 53 },
            { width: 71, height: 45 },
            { width: 64, height: 45 },
            { width: 66, height: 33 },
        ];
        this.width = this.WH[this.type].width;
        this.height = this.WH[this.type].height;
        this.x = _x;
        this.y = horizonHeight - this.height;
    }
    static preload() {
        Rock.img = [];
        for (let i = 0; i < 6; i++) {
            Rock.img[i] = loadImage('data/image/rock/rock' + i + '.png');
        }
    }
    show() {
        image(Rock.img[this.type], this.x, this.y);
    }
}