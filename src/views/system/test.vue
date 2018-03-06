<template>
    <div>
        <input type="text" v-model="test1" >
    </div>
</template>

<script>
    export default {
        name: 'test',
        props: {
            value: {}
        },
        computed: {
            test1: {
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
