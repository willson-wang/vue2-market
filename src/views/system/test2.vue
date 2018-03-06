<template>
    <div>
        <input type="checkbox"  v-model="test">
    </div>
</template>

<script>
    export default {
        name: 'test2',
        props: {
            value: {}
        },
        computed: {
            test: {
                get () {
                    return this.value;
                },
                set (val) {
                    console.log(val);
                    this.$emit('input', val);
                }
            }
        }
    };
</script>
