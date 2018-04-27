
import { getLogger } from "../../lib/log-config";
const loggerOth = getLogger('oth');

/**
 * 方法体
 */
export class FunCommon {
    constructor() {
        this.Prefix = 'onethink';
    }

    objToArray(obj) {
        var array = [];
        for (var key in obj) {
            array.push(obj[key]);
        }
        return array;
    }



}

export function isType(o) {
    return ({}).toString.call(o);
}

export function toJson(o) {
    if (!o || isType(o) === '[object Array]' && o.length < 1) {
        loggerOth.info("toJson(o) length " + o.length + "<1 && " + isType(o));
        return null;
    }
    o = JSON.stringify(o);
    o = JSON.parse(o);
    return o;
}