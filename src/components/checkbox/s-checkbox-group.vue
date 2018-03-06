<template>
  <div class="ui-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: 'sCheckboxGroup',
        componentName: 'sCheckboxGroup',
        props: {
            value: {},
            min: Number,
            max: Number,
            size: String,
            fill: String,
            textColor: String
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
                // this.dispatch('ElFormItem', 'el.form.change', [value]);
            }
        }
    };
</script>

<style lang="less" scoped>
    .ui-checkbox-group {
        font-size: 0;
    }
</style>

