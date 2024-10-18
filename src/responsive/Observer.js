
import { def } from "./utils"; //封装的defineProperty方法
import defineReactive from "./defineReactive";
import { arrayMethods } from "./arrary";
import observe from './observe';
import Dep from './Dep';
//将obj对象中的属性都转成响应式
export default class Observer {
    constructor(value) {
        console.log("Observer构造器: ", value);
        //对象中的每个子对象都添加一个dep实例
        this.dep = new Dep();
        //给实例添加__ob__实例，值就是本次new的实例
        def(value, '__ob__', this, false);
        if (Array.isArray(value)) {
            //改变数组原型
            Object.setPrototypeOf(value, arrayMethods);
            this.observeArray(value);
        } else
            this.walk(value);
    }
    //对象
    walk(value) {
        for (let key in value) { // 遍历当前层属性设置数据劫持
            defineReactive(value, key);
        }
    }
    //数组
    observeArray(value) {
        for (let key of value) {
            //递归遍历
            observe(key);
        }
    }
}