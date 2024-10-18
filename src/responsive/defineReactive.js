
import observe from "./observe";
import Dep from './Dep';
export default function defineReactive(obj, key, val) {
    const dep = new Dep();
    if (arguments.length === 2) {
        //传的是对象或空
        val = obj[key];
    }
    const childOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            console.log('访问了' + key + '属性');
            //收集依赖
            if (Dep.target) {
                dep.depend();
                if(childOb) 
                    childOb.dep.depend();
            }
            return val;
        },
        set(newVal) {
            console.log('修改了' + key + '属性');
            if (val === newVal) return;
            val = newVal;
            //通知依赖：当数据发生改变时，通知组件更新
            dep.notify();
            //当设置新值时也进行数据劫持
            observe(val);
        }
    })
}