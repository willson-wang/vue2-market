/*
 * @Author: peter
 * @Date: 2017-12-04 18:51:29
 * @Last Modified by:   peter
 * @Last Modified time: 2017-12-04 18:51:29
 */
import { Message, MessageBox, Notification } from 'element-ui';

export function message ({ message, type, customClass, onClose }) {
    Message({
        message: message,
        type: type,
        customClass: customClass,
        duration: 3000, // 默认1s后关闭
        showClose: true,
        onClose: onClose
    });
}

export function messageBox ({ title, message, type, customClass, callback }) {
    MessageBox({
        title: title,
        message: message,
        type: type,
        customClass: customClass,
        callback: callback,
        showCancelButton: true,
        lockScroll: true,
        closeOnClickModal: true,
        closeOnPressEscape: true
    });
}

export function notification ({ title, message, type, customClass, onClose }) {
    Notification({
        title: title,
        message: message,
        type: type,
        customClass: customClass,
        onClose: onClose,
        duration: 3000,
        offset: 0
    });
}
