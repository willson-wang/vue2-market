<template>
    <label class="ui-checkbox" :class="{
        'is-checked': isChecked,
        'is-disabled': disabled,
        'is-selectAll': isSelectAll,
        'is-reveser': reveser
    }" >
        <input
        v-if="trueLabel || falseLabel"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange"
        >
        <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange">
        <span @click.stop="stopHandler"></span>
        <span  class="ui-checkbox-label" :style="styles" v-if="$slots.default || label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'sCheckbox',
        componentName: 'sCheckbox',
        data () {
            return {
                selfModel: false
            };
        },
        props: {
            value: {},
            label: {},
            isSelectAll: Boolean,
            disabled: Boolean,
            checked: Boolean,
            reveser: Boolean,
            name: String,
            styles: {},
            trueLabel: [String, Number],
            falseLabel: [String, Number]
        },
        computed: {
            model: {
                get () {
                    return this.isGroup
                        ? this.store : this.value !== undefined
                        ? this.value : this.selfModel;
                },
                set (val) {
                    if (this.isGroup) {
                        let isLimitExceeded = false;
                        (this._checkboxGroup.min !== undefined &&
                        val.length < this._checkboxGroup.min &&
                        (isLimitExceeded = true));

                        (this._checkboxGroup.max !== undefined &&
                        val.length > this._checkboxGroup.max &&
                        (isLimitExceeded = true));

                        isLimitExceeded === false &&
                        this.dispatch('sCheckboxGroup', 'input', [val]);
                    } else {
                        this.$emit('input', val);
                        this.selfModel = val;
                    }
                }
            },
            isChecked () {
                if ({}.toString.call(this.model) === '[object Boolean]') {
                    return this.model;
                } else if (Array.isArray(this.model)) {
                    return this.model.indexOf(this.label) > -1;
                } else if (this.model !== null && this.model !== undefined) {
                    return this.model === this.trueLabel;
                }
            },
            isGroup () {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options.componentName !== 'sCheckboxGroup') {
                        parent = parent.$parent;
                    } else {
                        this._checkboxGroup = parent;
                        return true;
                    }
                }
                return false;
            },
            store () {
                return this._checkboxGroup ? this._checkboxGroup.value : this.value;
            }
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
            },
            addToStore () {
                if (
                Array.isArray(this.model) &&
                this.model.indexOf(this.label) === -1
                ) {
                    this.model.push(this.label);
                } else {
                    this.model = this.trueLabel || true;
                }
            },
            handleChange (ev) {
                this.$emit('change', ev);
                if (this.isGroup) {
                    this.$nextTick(_ => {
                        this.dispatch('sCheckboxGroup', 'change', [this._checkboxGroup.value]);
                    });
                }
            },
            // 阻止冒泡，即这里span会冒泡一次，input checkbox也会冒泡一次，所以需要阻止span的冒泡
            stopHandler () {
                return false;
            }
        },
        created () {
            this.checked && this.addToStore();
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-checkbox {
        position: relative;
        display: inline-block;
        cursor: pointer;
        line-height: 1;
        margin-right: 12px;

        input[type='checkbox'] {
            display: none;
        }

        input[type='checkbox']+span {
            position: relative;
            display: inline-block;
            width: 18px;
            height: 18px;
            background-color: @base-white;
            border: 1px solid @base-bdr;
            outline: none;
            vertical-align: middle;
            border-radius: 2px;
            

            &:hover {
                border: 1px solid @base-main;
            }
        }

        input[type='checkbox']+span::after {
            position: absolute;
            top: 1px;
            left: 5px;
            width: 4px;
            height: 8px;
            content: '';
            border: 2px solid @base-white;
            border-left: 0;
            border-top: 0;
            transform: rotate(45deg) scaleY(0);
            transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
            transform-origin: center;
        }

        .ui-checkbox-label {
            display: inline-block;
            vertical-align: middle;
            font-size: 12px;
            margin-left: 6px;
        }
    }

    .ui-checkbox.is-checked {
        input[type='checkbox']+span {
            background-color: @base-main;
        }

        input[type='checkbox']+span::after {
            transform: rotate(45deg) scaleY(1);
        }
    }

    

    .ui-checkbox.is-reveser {
        input[type='checkbox']+span {
            background-color: @base-white;
        }

        input[type='checkbox']+span::after {
            border: 2px solid @base-main;
            border-left: 0;
            border-top: 0;
        }
    }

    .ui-checkbox.is-disabled {
        input[type='checkbox']+span {
            background-color: @base-bg-disabled;
            border-color: @base-bdr-disabled;
            cursor: not-allowed;
        }

        input[type='checkbox']+span::after {
            border: 2px solid @base-bdr-disabled;
            border-left: 0;
            border-top: 0;
        }

        .ui-checkbox-label {
            color: @base-font-disabled;
            cursor: not-allowed;
        }
        
    }
</style>

