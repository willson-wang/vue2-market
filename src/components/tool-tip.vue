<template>
    <el-tooltip  :placement="placement" :effect="effect" v-model="isToolTipShow" :popper-class="className">
        <div slot="content">
            <slot name="content"></slot>
        </div>
        <slot></slot>
    </el-tooltip>
</template>

<script>
    export default {
        name: 'toolTip',
        props: {
            // tips出现的位置
            placement: {
                type: String,
                default: 'top'
            },
            effect: {
                type: String,
                default: 'dark'
            },
            className: {}
        },
        data () {
            return {
                isToolTipShow: false
            };
        },
        methods: {
            changeToolTipStatus () {
                this.isToolTipShow = false;
            }
        }
    };
</script>
