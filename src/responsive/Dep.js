let uid = 0;
export default class Dep {
    constructor() {
        this.id = uid++;
        //当前属性的依赖集合
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    //收集
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target);
        }
    }
    //通知更新
    notify() {
        //浅拷贝
        const subs = this.subs.slice();
        for (let i = 0; i < subs.length; i++) {
            console.log("依赖通知");
            subs[i].update();
        }
    }
}