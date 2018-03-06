<template>
    <label :class="[{
        'is-disabled': isDisabled,
        'is-active': value === label
      }, isScreen ? 'ui-radio-button-type_screen' : 'ui-radio-button']"
           @click="handlerClick">
        <input type="radio" 
            :value="label" 
            v-model="value"
            :name="name"
            :disabled="isDisabled"
        >
        <span class="ui-radio-label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'sRadioButton',
        componentName: 'sRadioButton',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            label: {},
            name: {
                type: String
            },
            isScreen: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {};
        },
        computed: {
            isDisabled () {
                return this.disabled || this._radioGroup.disabled;
            },
            // 判断是否是radio组
            _radioGroup () {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'sRadioGroup') {
                        parent = parent.$parent;
                    } else {
                        return parent;
                    }
                }
                return false;
            },
            value: {
                get () {
                    return this._radioGroup.value;
                },
                set (val) {
                    // v-model的绑定的值，都可以直接通过$emit('input')来进行传值
                    this._radioGroup.$emit('input', val);
                }
            }
        },
        methods: {
            handlerClick () {
                // 在计算旧值与新值时能够取得正确的值
                this.$emit('click');
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-radio-button {
        position: relative;
        display: inline-block;
        cursor: pointer;
        line-height: 1;
        input[type='radio'] {
            display: none;
        }

        .ui-radio-label {
            display: inline-block;
            padding: 0 24px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            vertical-align: middle;
            background-color: @base-white;
            border: 1px solid @base-bdr;
            font-size: 12px;
            border-right: 0;
            border-left: 0;


        }

        &:first-of-type {
            >.ui-radio-label {
                border-left: 1px solid @base-bdr;
                border-top-left-radius: 25% 50%;
                border-bottom-left-radius: 25% 50%;
            }
        }

        &:last-of-type {
            >.ui-radio-label {
                border-right: 1px solid @base-bdr;
                border-top-right-radius: 25% 50%;
                border-bottom-right-radius: 25% 50%;
            }
        }

    }

    .ui-radio-button.is-active {
        >.ui-radio-label {
            background-color: @base-main;
            color: @base-white;
            border-top: 1px solid @base-main;
            border-bottom: 1px solid @base-main;
        }

        &:first-of-type {
            >.ui-radio-label {
                border-left: 1px solid @base-main;
            }
        }

        &:last-of-type {
            >.ui-radio-label {
                border-right: 1px solid @base-main;
            }
        }
    }

    .ui-radio-button.is-disabled {

        .ui-radio-label {
            color: @base-font-disabled;
            cursor: not-allowed;
            background-image: none;
            background-color: @base-bg-disabled;
            border-color: @base-bdr-disabled;
        }

        &:first-of-type {
            >.ui-radio-label {
                border-left: 1px solid @base-bdr-disabled;
            }
        }

        &:last-of-type {
            >.ui-radio-label {
                border-right: 1px solid @base-bdr-disabled;
            }
        }

    }

    /*筛选框按钮*/
    .ui-radio-button-type_screen {
        position: relative;
        display: inline-block;
        cursor: pointer;
        line-height: 40px;
        width: 153px;
        padding-left: 20px;
        height: 40px;
        input[type='radio'] {
            display: none;
        }

        .ui-radio-label {
            display: inline-block;
            padding: 5px;
            height: 22px;
            line-height: 12px;
            text-align: center;
            vertical-align: middle;
            background-color: @base-white;
            font-size: 14px;
            border-radius: 2px;
        }

        /** &:first-of-type {
             >.ui-radio-label {
                 border-left: 1px solid @base-bdr;
                 border-top-left-radius: 25% 50%;
                 border-bottom-left-radius: 25% 50%;
             }
         }

         &:last-of-type {
             >.ui-radio-label {
                 border-right: 1px solid @base-bdr;
                 border-top-right-radius: 25% 50%;
                 border-bottom-right-radius: 25% 50%;
             }
         } **/

    }

    .ui-radio-button-type_screen.is-active {
        >.ui-radio-label {
            background-color: @base-shallow-blue-bg;
            color: @base-white;
        }
    }

    .ui-radio-button-type_screen.is-disabled {

        .ui-radio-label {
            color: @base-font-disabled;
            cursor: not-allowed;
            background-image: none;
            background-color: @base-bg-disabled;
            border-color: @base-bdr-disabled;
        }

        &:first-of-type {
            >.ui-radio-label {
                border-left: 1px solid @base-bdr-disabled;
            }
        }

        &:last-of-type {
            >.ui-radio-label {
                border-right: 1px solid @base-bdr-disabled;
            }
        }


    }
</style>



