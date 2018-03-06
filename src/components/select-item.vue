/*
 * @Author: peter 
 * @Date: 2017-12-04 18:55:20 
 * @Last Modified by:   peter 
 * @Last Modified time: 2017-12-04 18:55:20 
 */
<template>
  <div class="ui-select">
      <el-select v-model="currentSelect"  placeholder="请选择" :disabled="isDisabled" :clearable="isClearable" :multiple="isMultiple" :filterable="isFilterable" :size="size" :popper-class="className" @change="getCurrentSelectValue" @clear="clearSelectItem" @remove-tag="clearMultipleItem">
          <el-option 
            v-for="item in options"
            :key="item.value || item.name"
            :value="item.value || item.name"
            :label="item.label || item.title"
            :disabled="item.disabled"
          >
            <slot name="content"></slot>
          </el-option>
      </el-select>
  </div>
</template>

<script>
    export default {
        name: 'select',
        data () {
            return {
                currentSelect: this.initSelectValue
            };
        },
        props: {
            options: {
                type: Array,
                default () {
                    return [];
                }
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            // 是否可清空当前选中项，只有单选的时候才会生效
            isClearable: {
                type: Boolean,
                default: false
            },
            // 是否启用多选
            isMultiple: {
                type: Boolean,
                default: false
            },
            // 是否启用label搜索
            isFilterable: {
                type: Boolean,
                default: false
            },
            // 选择框尺寸
            size: {
                type: String,
                default: 'normal'
            },
            // Select 下拉框的类名
            className: {
                type: String,
                default: ''
            },
            initSelectValue: {
                type: String || Number,
                default: ''
            }
        },
        computed: {},
        methods: {
            getCurrentSelectValue () {
                this.$emit('currentSelectValue', this.currentSelect);
            },
            clearSelectItem (val) {
                console.log(val);
            },
            clearMultipleItem (val) {
                console.log(val);
            }
        }
    };
</script>

<style lang="less" scoped>

</style>

