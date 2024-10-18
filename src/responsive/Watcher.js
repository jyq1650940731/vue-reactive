
import Dep from './Dep';

let uid = 0;
export default class Watcher {
    constructor(target, expression, callback) {
        this.id = uid++;
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        this.value = this.get();
    }
    //当属性首次被使用和视图更新时触发
    get() {
        //进入依赖收集
        Dep.target = this;
        const obj = this.target;
        let value;
        try {
            value = this.getter(obj); //获取
        } finally {
            //当前Watcher退出依赖收集，让下个Watcher进入
            obj.target = null;
        }
        return value;  //获取最内层属性
    }
    update() {
        this.run();
    }
    run() {
        this.getAndInvoke(this.callback);
    }
    getAndInvoke(cb) {
        const value = this.get();
        const oldValue = this.value;
        if (value !== this.value || typeof value === 'object') {
            //获取最新更新
            this.value = value;
            cb.call(this.target, value, oldValue);
        }
    }
}
//深度优先 返回一个查找最内层的属性的方法
function parsePath(exp) {
    const segments = exp.split('.')
    return (obj) => {
        for (const i of segments) {
            obj = obj[i];
        }
        return obj;
    }
}