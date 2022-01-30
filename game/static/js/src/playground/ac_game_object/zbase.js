let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);  //把这个类加入到存储元素的全局数组内

        this.has_called_start = false;
        this.timedelta = 0;
    }

    start() {   //只在第一帧执行
    }

    update() {  //每一帧都会执行
    }

    on_destroy() {  //被销毁前执行一次
    }

    destroy() { //销毁该物体
        this.on_destroy();

        for (let i = 0; i < AC_GAME_OBJECTS.length; i++) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);   //从数组中删除元素的函数splice()
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp) {
    for (let i = 0; i < AC_GAME_OBJECTS.length; i++) {
        let obj = AC_GAME_OBJECTS[i];

        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;

    requestAnimationFrame(AC_GAME_ANIMATION);
}

requestAnimationFrame(AC_GAME_ANIMATION);   //HTML5的API，可以调用1帧的函数
