// collectable.js

class Collectable {
    constructor(_lingzhisData, _peachesData) {
        this.lingzhis = [];
        _lingzhisData.forEach(item => {
            this.lingzhis.push(new Lingzhi(...item));
        });
        this.peaches = [];
        _peachesData.forEach(item => {
            this.peaches.push(new Peach(...item));
        });
    }
    show() {
        this.lingzhis.forEach(item => {
            item.show();
        });
        this.peaches.forEach(item => {
            item.show();
        });
    }
    reload() {
        for(let item of this.lingzhis){
            item.isFound = false;
            item.isCounted = false;
        }
        for(let item of this.peaches){
            item.isFound = false;
            item.isCounted = false;
        }
    }
}

class Lingzhi {
    constructor(_t, _x) {
        this.type = _t;
        this.WH = [
            { width: 42, height: 51 },
            { width: 57, height: 72 },
            { width: 69, height: 63 },
            { width: 65, height: 79 },
        ];
        this.width = this.WH[this.type].width;
        this.height = this.WH[this.type].height;
        this.x = _x;
        this.y = horizonHeight - this.height;
        this.isCounted = false;
        this.isFound = false;
    }
    static preload() {
        Lingzhi.img = [];
        for (let i = 0; i < 4; i++) {
            Lingzhi.img[i] = loadImage('data/image/lingzhi/lingzhi' + i + '.png');
        }
    }
    show() {
        image(Lingzhi.img[this.type], this.x, this.y);
    }
    found() {
        this.isFound = true;
    }
    update() {
    }
}

class Peach {
    constructor(_x, _y) {
        this.width = 41;
        this.height = 38;
        this.x = _x;
        this.y = _y;
        this.isCounted = false;
        this.isFound = false;
    }
    static preload() {
        Peach.img = loadImage('data/image/peach/peach0.png');
    }
    show() {
        image(Peach.img, this.x, this.y);
    }
    found() {
        this.isFound = true;
    }
    update() {
    }
}