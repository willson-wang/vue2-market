<template>
    <div class="ui-order">
        <h1>这是系统页</h1>
        <div>
            <s-checkbox-group v-model="myCheckedList" @change="getCheckboxChangeValue">
                <s-checkbox  :reveser="true" :disabled="false" label="sport" >运动</s-checkbox>
                <s-checkbox :reveser="true" :disabled="false" label="football">踢球</s-checkbox>
                <s-checkbox :reveser="true" :disabled="false" label="swim">游泳</s-checkbox>
            </s-checkbox-group>    
        </div>
        <div>
            <s-checkbox-group v-model="myCheckedList1" @change="getCheckboxChangeValue">
                <s-checkbox-button :disabled="false" label="sport" >运动</s-checkbox-button>
                <s-checkbox-button :disabled="false" label="football">踢球</s-checkbox-button>
                <s-checkbox-button :disabled="false" label="swim">游泳</s-checkbox-button>
            </s-checkbox-group>    
        </div>
        <div>
            <input type="text" v-model="txt" @keypress="changeTxt">
            <input type="text" v-model="txt1" @keypress="changeTxt">
        </div>
        <div>
            <input type="checkbox" v-model="checkbox1" @change="changeBox">
            <input type="checkbox" v-model="checkbox2" @change="changeBox">
        </div>  
        <div style="margin-top: 30px">
            <tool-tip effect="light" class-name="ui-tooltip ui-tooltip-top-light">
                <span slot="content" class="ui-tooltip-info">这是提示</span>
                <span>tooltip</span>
            </tool-tip>
        </div>
        <div style="margin-top: 30px">
            <tool-tip effect="light" class-name="ui-tooltip ui-tooltip-bottom-light" placement="bottom">
                <span slot="content" class="ui-tooltip-info">这是提示</span>
                <span>tooltip</span>
            </tool-tip>
        </div>
        <div style="margin-top: 30px">
            <tool-tip effect="light" class-name="ui-tooltip ui-tooltip-left-light" placement="left">
                <span slot="content" class="ui-tooltip-info">这是提示</span>
                <span>tooltip</span>
            </tool-tip>
        </div>
        <div style="margin-top: 30px">
            <tool-tip effect="light" class-name="ui-tooltip ui-tooltip-right-light" placement="right">
                <span slot="content" class="ui-tooltip-info">这是提示</span>
                <span>tooltip</span>
            </tool-tip>
        </div>
        <div @click="getTest">
            <p>
                <span>点我</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'system',
        components: {},
        data () {
            return {
                myCheckedList: ['swim'],
                myCheckedList1: ['swim'],
                txt: 'aaa',
                checkbox1: true
            };
        },
        computed: {
            txt1: {
                get () {
                    return this.txt;
                },
                set (val) {
                    console.log(val);
                    // this.$emit('input', val);
                    this.txt = val;
                }
            },
            checkbox2: {
                get () {
                    return this.checkbox1;
                },
                set (val) {
                    console.log(val);
                    this.checkbox1 = val;
                }
            }
        },
        methods: {
            getCheckboxChangeValue (val) {
                console.log(val);
            },
            changeTxt () {
            },
            changeBox () {},
            getTest () {
                console.log(111111);
            }
        }
    };
</script>

<style lang="less" scoped>
    
</style>