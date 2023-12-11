// ui.js
// user's interface

class Popup {
    constructor(_t) {
        this.type = _t;
        this.width = 550;
        this.height = 300;
        this.buttonWidth = 160;
        this.buttonHeight = 40;
        this.x = (canvasWidth - this.width) / 2;
        this.y = (canvasHeight - this.height) / 2;
        this.lingzhiDigit = new Digit();
        this.peachDigit = new Digit();
        this.visible = false;
    }
    static preload() {
        Popup.img = [];
        for (let i = 0; i < 3; i++) {
            Popup.img[i] = loadImage('data/image/ui/popup' + i + '.png');
        }
    }
    show(_lingzhiNum, _peachNum) {
        if (this.visible) {
            Mask.show();
            image(Popup.img[this.type], this.x, this.y)
            if (this.type === 2) {
                push();
                translate(this.x + 265, this.y + 180);
                this.lingzhiDigit.show(_lingzhiNum);
                pop();
                push();
                translate(this.x + 411, this.y + 180);
                this.peachDigit.show(_peachNum);
                pop();
            }
        }
    }
    checkButton() {
        // click the button to close the popup.
        if (
            mouseX > this.x + 195 &&
            mouseX < this.x + 195 + this.buttonWidth &&
            mouseY > this.y + 260 &&
            mouseY < this.y + 260 + this.buttonHeight
        ) {
            this.visible = false;
        }
    }
}

class Mask {
    constructor() {

    }
    static show() {
        push();
        rectMode(CENTER);
        fill('rgba(0,0,0,0.8)');
        rect(canvasWidth / 2, canvasHeight / 2, canvasWidth, canvasHeight);
        pop();
    }
}

class ScoreWindow {
    constructor(_lingzhiNum, _peachNum) {
        this.width = 220;
        this.height = 70;
        this.x = (canvasWidth - this.width) / 2;
        this.y = canvasHeight - 10 - this.height;
        this.lingzhiNum = _lingzhiNum;
        this.peachNum = _peachNum;
        this.lingzhiDigit = new Digit();
        this.peachDigit = new Digit();
    }
    static preload() {
        ScoreWindow.img = loadImage('data/image/ui/scoreWindow.png');
    }
    show() {
        image(ScoreWindow.img, this.x, this.y);
        push();
        translate(this.x + 75, this.y + 15);
        this.lingzhiDigit.show(this.lingzhiNum);
        pop();
        push();
        translate(this.x + 178, this.y + 15);
        this.peachDigit.show(this.peachNum);
        pop();
    }
    update(_lingzhiNum, _peachNum) {
        this.lingzhiNum = _lingzhiNum;
        this.peachNum = _peachNum;
    }
}

class Digit {
    constructor() {
    }
    static preload() {
        Digit.img = loadImage('data/image/ui/digits.png');
    }
    show(_num) {
        image(Digit.img, 0, 0, 30, 40, 30 * (_num), 0, 30, 40)
    }
}