import { URLSearchParams } from '@angular/http';

import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * 
 */
export class ConstantsController {

    APISERVER = '//127.0.0.1/api';

    private isTypes(o: any) {
        return ({}).toString.call(o);
    }

    /**
     * 公共请求参数格式化
     * @param object 
     */
    forData(object: any) {
        let urlSearchParams = new URLSearchParams();
        let valueType = this.isTypes(object);
        if (valueType === '[object Object]') {
            for (let key in object) {
                urlSearchParams.append(key, object[key]);
            }
        }
        if (valueType === '[object String]') {
            urlSearchParams.append(valueType, valueType);
        }
        return urlSearchParams;
    }

}


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}