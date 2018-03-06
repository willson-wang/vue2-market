<template>
    <div class="ui-radio-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'sRadioGroup',
        componentName: 'sRadioGroup',
        props: {
            value: {},
            disabled: {}
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
        watch: {
            value (value) {
                console.log(value);
                this.$emit('radioChange', value);
                // this.dispatch('ElFormItem', 'el.form.change', [this.value]);
            }
        }
    };
</script>

<style lang="less" scoped>
    .ui-radio-group {
        font-size: 0;
    }
</style>

