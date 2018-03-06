/*
 * @Author: peter
 * @Date: 2017-10-12 10:15:52
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-20 13:49:52
 */

import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import 'element-ui/lib/theme-default/index.css';
import './assets/less/index.less';
import store from './store';
import './permission';
import IconSvg from '@/components/icon-svg';
import PopOver from '@/components/pop-over';
import Datepicker from '@/components/datepicker';
import DropSelect from '@/components/drop-select';
import SRadio from '@/components/radio/s-radio';
import SRadioGroup from '@/components/radio/s-radio-group';
import SRadioButton from '@/components/radio/s-radio-button';
import SelectItem from '@/components/select-item';
import ComBtn from '@/components/com-btn';
import initGlobalDirective from './directive';
import initGlobalFilter from './filter';
import CONFIG from './assets/js/config';
import 'animate.css';
import './mock';
import SCheckbox from '@/components/checkbox/s-checkbox';
import SCheckboxGroup from '@/components/checkbox/s-checkbox-group';
import SCheckboxButton from '@/components/checkbox/s-checkbox-button';
import ToolTip from '@/components/tool-tip';

Vue.config.productionTip = false;

// 注册全局的组件
Vue.component('icon-svg', IconSvg);
Vue.component('pop-over', PopOver);
Vue.component('date-picker', Datepicker);
Vue.component('drop-select', DropSelect);
Vue.component('select-item', SelectItem);
Vue.component('com-btn', ComBtn);
Vue.component('s-radio', SRadio);
Vue.component('s-radio-group', SRadioGroup);
Vue.component('s-radio-button', SRadioButton);
Vue.component('s-checkbox', SCheckbox);
Vue.component('s-checkbox-group', SCheckboxGroup);
Vue.component('s-checkbox-button', SCheckboxButton);
Vue.component('tool-tip', ToolTip);

// 注册ElementUI这个插件
Vue.use(ElementUI);

// 注册i18n插件
Vue.use(VueI18n);

// 注册全局指令
initGlobalDirective(Vue);

// 注册全局过滤器
initGlobalFilter(Vue);

// 配置i18n语言包
const i18n = new VueI18n({
    locale: CONFIG.lang,
    messages: {
        'zh-CN': require('./assets/i18n/zh').default,
        'en-US': require('./assets/i18n/en').default
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    store,
    i18n,
    components: { App }
});
