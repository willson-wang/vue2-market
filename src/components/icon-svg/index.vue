/*
 * @Author: peter 
 * @Date: 2017-12-04 18:54:49 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-06 11:57:34
 */
<template>
  <span class='icon-wrap' :class="className">
      <icon :name="iconName" :scale="iconFont" :isdown="isDown"></icon>
  </span>
</template>

<script>
    import Icon from 'vue-svg-icon/Icon.vue';
    export default {
        name: 'icon-svg',
        components: {
            Icon
        },
        props: {
            // icon的名称
            iconName: {
                type: String,
                required: true
            },
            // icon的大小
            iconFont: {
                type: Number,
                default: 1.6
            },
            // 是否下拉形式
            isDown: {
                type: Boolean,
                default: false
            },
            className: {
                type: String,
                default: ''
            }
        },
        watch: {
            isDown (val) {
                let el = document.querySelector('.' + this.className + ' > svg');
                if (val) {
                    el.style.display = 'block';
                    el.style.opacity = '1';
                } else {
                    el.style.opacity = '0';
                }
            }
        },
        created () {
            this.$nextTick(() => {
                if (!this.className) return;
                let el = document.querySelector('.' + this.className + ' > svg');
                el.style.display = 'none';
            });
        }
    };
</script>

<style lang="less" scoped>
// 设置line-height的目的是不让其从父元素继承line-height影响对齐方式 
    .icon-wrap {
        display: inline-block;
        margin-right: 5px;
        font-size: 12px;
        vertical-align: middle;
        line-height: 1;
        svg {
            transition: opacity .5s;
        }
    }
</style>

