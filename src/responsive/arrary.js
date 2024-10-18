import { def } from "./utils";
import observe from './observe';
const arrayPrototype = Array.prototype;
//以array.prototype为原型创建一个对象
export const arrayMethods = Object.create(arrayPrototype);
//改写的数组
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodsNeedChange.forEach((method) => {
    //备份原始方法
    const original = arrayMethods[method];

    //重写，进行数据劫持
    def(arrayMethods, method, function () {
        let inserted = [];
        let args = [...arguments];
        //执行原有方法功能
        const result = original.apply(this, arguments);
        //处理新增元素
        switch (method) {
            case 'push':
            case 'shift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        //对新添加的函数设置数据劫持
        if (inserted) {
            this.__ob__.observeArray(inserted);
        } 
        //判断数组被更改
        console.log('响应');
        //返回结果
        return result;
    }, false);
})