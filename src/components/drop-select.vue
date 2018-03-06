/*
 * @Author: peter 
 * @Date: 2017-12-04 18:55:02 
 * @Last Modified by: peter
 * @Last Modified time: 2017-12-06 11:52:55
 */
<template>
    <!-- 下拉菜单 -->
    <!-- 当el-button与span写在一个内时，总有一个不生效 -->
    <div class="ui-dropdown f-l">
        <el-dropdown v-if="isBtn && !isSplitBtn" :trigger="triggerType" :hide-on-click="isClickHiden" :split-button="isSplitBtn" @command="getDropDownValue" type="primary">
            <el-button type="primary" >
                {{title}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in dropDownList" :key="index" :command="item.key">{{item.value}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-if="!isBtn && !isSplitBtn" :trigger="triggerType" :hide-on-click="isClickHiden" :split-button="isSplitBtn" @command="getDropDownValue" type="primary">
            <span class="el-dropdown-link" v-if="!isBtn && !isSplitBtn">
                {{title}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in dropDownList" :key="index" :command="item.key">{{item.value}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-if="isSplitBtn" :trigger="triggerType" :hide-on-click="isClickHiden" :split-button="isSplitBtn" @command="getDropDownValue" type="primary">
            <span v-if="isSplitBtn">{{title}}</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in dropDownList" :key="index" :command="item.key">{{item.value}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: 'dropSelect',
        props: {
            // 触发事件类型
            triggerType: {
                type: String,
                default: 'hover'
            },
            // 是否选择值之后隐藏select选项面板
            isClickHiden: {
                type: Boolean,
                default: true
            },
            // 是否使用分开按钮点击显示下拉选项
            isSplitBtn: {
                type: Boolean,
                default: false
            },
            // 是否按钮显示下拉选项
            isBtn: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '下拉菜单'
            },
            // 下拉选项值
            dropDownList: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        methods: {
            getDropDownValue (command) {
                this.$emit('dropDownValue', command);
            }
        }
    };
</script>

<style lang="less" scoped>
</style>
