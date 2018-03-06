<template>
    <label class="ui-radio"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label,
        'is-focus': focus
      }">
        <input type="radio" 
            :value="label" 
            v-model="model"
            @focus="focus = true"
            @blur="focus = false"
            :name="name"
            :disabled="isDisabled"
        >
        <span></span>
        <span class="ui-radio-label" :style="styles">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'basicRadio',
        componentName: 'basicRadio',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            label: {},
            styles: {},
            value: {},
            name: {
                type: String
            }
        },
        data () {
            return {
                focus: false
            };
        },
        methods: {
            dispatch (componentName, eventName, params) {
                var parent = this.$parent || this.$root;
                var name = parent.$options.componentName;

                while (parent && (!name || name !== componentName)) {
                    parent = parent.$parent;

                    if (parent) {
                        name = parent.$options.componentName;
                    }
                }
                if (parent) {
                    parent.$emit.apply(parent, [eventName].concat(params));
                }
            }
        },
        computed: {
            isDisabled () {
                return this.isGroup
                ? this._radioGroup.disabled || this.disabled
                : this.disabled;
            },
            // 判断是否是radio组
            isGroup () {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'sRadioGroup') {
                        parent = parent.$parent;
                    } else {
                        this._radioGroup = parent;
                        return true;
                    }
                }
                return false;
            },
            model: {
                get () {
                    return this.isGroup ? this._radioGroup.value : this.value;
                },
                set (val) {
                    if (this.isGroup) {
                        // 向父组件sRadioGroup传递值
                        this.dispatch('sRadioGroup', 'input', [val]);
                    } else {
                        this.$emit('input', val);
                    }
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-radio {
        position: relative;
        display: inline-block;
        cursor: pointer;
        line-height: 1;
        margin-right: 12px;

        input[type='radio'] {
            display: none;
        }

        input[type='radio']+span {
            position: relative;
            display: inline-block;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: @base-white;
            border: 1px solid @base-bdr;
            outline: none;
            vertical-align: middle;
            

            &:hover {
                border: 1px solid @base-main;
            }
        }

        input[type='radio']+span::after {
            position: absolute;
            left: 50%;
            top: 50%;
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: @base-main;
            transform: translate(-50%,-50%) scale(0);
            transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
        }

        .ui-radio-label {
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            margin-left: 6px;
        }
    }

    .ui-radio.is-checked {
        input[type='radio']+span::after {
            transform: translate(-50%,-50%) scale(1);
        }
    }

    .ui-radio.is-disabled {
        input[type='radio']+span {
            background-color: @base-bg-disabled;
            border-color: @base-bdr-disabled;
            cursor: not-allowed;
        }

        input[type='radio']+span::after {
            background-color: @base-white;
        }

        .ui-radio-label {
            color: @base-font-disabled;
            cursor: not-allowed;
        }
        
    }
</style>

