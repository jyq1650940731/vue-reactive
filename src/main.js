import observe from './responsive/observe';
import './responsive/arrary';
import Watcher from './responsive/Watcher';
const obj = {
    a: 1,
    b: 2,
    c: {
        c1: 333
    },
    d: [1, 2, 3, 43, 5],
    e: {
        e1: {
            e2: 3
        }
    }
}

observe(obj);
// obj.b++;
// obj.c.c1++;
// obj.d.push(6);
// obj.d.splice(2, 1, 88, 99)
new Watcher(obj, 'e.e1.e2', (val) => {
    console.log("视图更新", val);
});
// obj.e.e1.e2 = 4;
console.log(obj.e.e1.e2);