<template>
    <label class="ui-checkbox-button" :class="{
        'is-checked': isChecked,
        'is-disabled': disabled,
        'is-selectAll': isSelectAll
    }">
        <input
        v-if="trueLabel || falseLabel"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="model"
        @change="handleChange">
        <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange">
        <span class="ui-checkbox-button-label" v-if="$slots.default || label">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'sCheckboxButton',
        componentName: 'sCheckboxButton',
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
            }
        },
        created () {
            this.checked && this.addToStore();
        }
    };
</script>

<style lang="less" scoped>
    @import (reference) '../../assets/less/index.less';
    .ui-checkbox-button {
        position: relative;
        display: inline-block;
        cursor: pointer;
        line-height: 1;

        input[type='checkbox'] {
            display: none;
        }

        .ui-checkbox-button-label {
            display: inline-block;
            padding: 0 20px;
            height: 30px;
            line-height: 30px;
            vertical-align: middle;
            font-size: 12px;
            text-align: center;
            background-color: @base-white;
            border: 1px solid @base-bdr;
            border-right: 0;
        }

        &:first-of-type {
            >.ui-checkbox-button-label {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }
        }

        &:last-of-type {
            >.ui-checkbox-button-label {
                border-right: 1px solid @base-bdr;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }
        }
    }

    .ui-checkbox-button.is-checked {
        >.ui-checkbox-button-label {
            background-color: @base-main;
            color: #fff;
            border-top: 1px solid @base-main;
            border-bottom: 1px solid @base-main;
        }

        &:first-of-type {
            >.ui-checkbox-button-label {
                border-left: 1px solid @base-main;
            }
        }

        &:last-of-type {
            >.ui-checkbox-button-label {
                border-right: 1px solid @base-main;
            }
        }
    }


    .ui-checkbox-button.is-disabled {


        .ui-checkbox-button-label {
            color: @base-font-disabled;
            cursor: not-allowed;
            background-image: none;
            background-color: @base-bg-disabled;
            border-color: @base-bdr-disabled;
        }

        &:first-of-type {
            >.ui-checkbox-button-label {
                border-left: 1px solid @base-bdr-disabled;
            }
        }

        &:last-of-type {
            >.ui-checkbox-button-label {
                border-right: 1px solid @base-bdr-disabled;
            }
        }
        
    }
</style>

