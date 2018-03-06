/*
 * @Author: peter
 * @Date: 2017-12-04 18:52:32
 * @Last Modified by:   peter
 * @Last Modified time: 2017-12-04 18:52:32
 */
export function formatDate (time, option) {
    const newDate = new Date(time);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    console.log(time);
    return year + '-' + month + '-' + day;
}
