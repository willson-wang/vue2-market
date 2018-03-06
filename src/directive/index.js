/*
 * @Author: peter
 * @Date: 2017-12-04 18:52:27
 * @Last Modified by:   peter
 * @Last Modified time: 2017-12-04 18:52:27
 */
import directives from './directives';

export default function initGlobalDirective (Vue) {
    console.log(Object.keys(directives));
    Object.keys(directives).forEach(key => {
        console.log(key);
        Vue.directive(key, directives[key]);
    });
}
