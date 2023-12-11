// background.js

class Background {
    constructor(_treesData, _cloudsData, _mountsData, _backMountsData, _grassData) {
        this.trees = [];
        _treesData.forEach(item => {
            this.trees.push(new Tree(...item));
        });
        this.clouds = [];
        _cloudsData.forEach(item => {
            this.clouds.push(new Cloud(...item));
        });
        this.mounts = [];
        _mountsData.forEach(item => {
            this.mounts.push(new Mount(...item));
        });
        this.backMounts = [];
        _backMountsData.forEach(item => {
            this.backMounts.push(new BackMount(...item));
        });
        this.grass = [];
        _grassData.forEach(item => {
            this.grass.push(new Grass(...item));
        });
    }
    show() {
        this.backMounts.forEach(item => {
            item.show();
        });
        this.mounts.forEach(item => {
            item.show();
        });
        this.clouds.forEach(item => {
            item.show();
        });
        this.trees.forEach(item => {
            item.show();
        });
        this.grass.forEach(item => {
            item.show();
        });
    }
    update(_offset) {
        for (let mount of this.mounts) {
            mount.offset = _offset;
        }
        for (let backMount of this.backMounts) {
            backMount.offset = _offset;
        }
    }
}

class Sky {
    constructor() {
    }
    static preload() {
        Sky.img = loadImage('data/image/sky/sky.png');
    }
    static show() {
        image(Sky.img, 0, 0, canvasWidth, canvasHeight);
    }
}

class Ground {
    constructor() {

    }
    static show() {
        push();
        noStroke();
        fill(color("#3B7A77"));
        rect(0, horizonHeight, canvasWidth, canvasHeight - horizonHeight);
        fill(color("#FFA857"));
        rect(0, horizonHeight - 1, canvasWidth, 2);
        pop();
    }
}

class Tree {
    constructor(_t, _x) {
        this.type = _t;
        this.x = _x;
    }
    static preload() {
        Tree.img = [];
        Tree.WH = [
            { width: 348, height: 228 },
            { width: 260, height: 324 },
            { width: 310, height: 307 },
            { width: 245, height: 131 },
        ];//data of the width and height of each tree
        for (let i = 0; i < 4; i++) {
            Tree.img[i] = loadImage('data/image/tree/tree' + i + '.png');
        }
    }
    show() {
        image(Tree.img[this.type], this.x, horizonHeight - Tree.WH[this.type].height);
    }
}

class Grass {
    constructor(_t, _x) {
        this.type = _t;
        this.x = _x;
    }
    static preload() {
        Grass.img = [];
        Grass.WH = [
            { width: 23, height: 19 },
            { width: 23, height: 17 },
            { width: 33, height: 23 },
        ];//data of the width and height of each Grass
        for (let i = 0; i < 3; i++) {
            Grass.img[i] = loadImage('data/image/grass/grass' + i + '.png');
        }
    }
    show() {
        image(Grass.img[this.type], this.x, horizonHeight - Grass.WH[this.type].height);
    }
}

class Cloud {
    constructor(_t,  _s, _a, _x, _y) {
        this.type = _t;
        this.area = _a;
        this.speed = _s;
        this.x = _x;
        this.y = _y;
        this.newX = this.x;
    }
    static preload() {
        Cloud.img = [];
        for (let i = 0; i < 7; i++) {
            Cloud.img[i] = loadImage('data/image/cloud/cloud' + i + '.png');
        }
        Cloud.WH = [
            { width: 400, height: 65 },
            { width: 241, height: 73 },
            { width: 366, height: 71 },
            { width: 181, height: 55 },
            { width: 256, height: 84 },
            { width: 329, height: 60 },
            { width: 166, height: 96 }
        ];
    }
    show() {
        this.newX += this.speed;
        if(this.newX > this.x + this.area || this.newX < this.x - this.area) {
            this.speed = -this.speed;
        }
        image(Cloud.img[this.type], this.newX, this.y);
    }
}

class Mount {
    constructor( _t, _x) {
        this.type = _t;
        this.offset = 0;
        this.x = _x;
    }
    static preload() {
        Mount.img = [];
        Mount.WH = [
            { width: 973, height: 384 },
            { width: 655, height: 380 },
            { width: 487, height: 343 },
            { width: 622, height: 214 },
            { width: 543, height: 220 },
            { width: 459, height: 189 },
            { width: 628, height: 162 },
            { width: 580, height: 88 },
            { width: 899, height: 97 },
            { width: 518, height: 65 }
        ];
        for (let i = 0; i < 9; i++) {
            Mount.img[i] = loadImage('data/image/mount/mount' + i + '.png');
        }
    }
    show() {
        push();
        translate(this.offset * 0.12, 0);
        image(Mount.img[this.type], this.x, horizonHeight - Mount.WH[this.type].height);
        pop();
    }
}

class BackMount {
    constructor(_t, _x, _y) {
        this.type = _t;
        this.offset = 0;
        this.x = _x;
        this.y = _y;
    }
    static preload() {
        BackMount.img = [];
        BackMount.WH = [
            { width: 1100, height: 222 },
            { width: 1018, height: 234 },
            { width: 564, height: 174 },
            { width: 997, height: 231 }
        ];
        for (let i = 0; i < 4; i++) {
            BackMount.img[i] = loadImage('data/image/backMount/backMount' + i + '.png');
        }
    }
    show() {
        push();
        translate(this.offset * 0.08, 0);
        image(BackMount.img[this.type], this.x, this.y);
        pop();
    }
}
