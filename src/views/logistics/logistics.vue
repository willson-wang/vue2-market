<template>
    <div class="ui-order">
        <h1>这是物流页</h1>
        <tinymce v-model="myContent1" tinymce-id="tinymce1"></tinymce>
        <div class='editor-content' v-html="myContent1"></div>
        <tinymce v-model="myContent2" tinymce-id="tinymce2" :height="100"></tinymce>
        <div class='editor-content' v-html="myContent2" ></div>
    </div>
</template>

<script>
    import Tinymce from '@/components/tinymce';
    export default {
        name: 'logistics_one',
        components: {
            Tinymce
        },
        data () {
            return {
                myContent1: 'tinymce1',
                myContent2: 'tinymce2'
            };
        }
    };
</script>

<style lang="less" scoped>

</style>