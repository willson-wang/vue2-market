/*
 * @Author: peter 
 * @Date: 2017-12-04 18:54:58 
 * @Last Modified by:   peter 
 * @Last Modified time: 2017-12-04 18:54:58 
 */
<template>
    <div class="ui-datepiker">
        <el-date-picker
            v-model = "selectTime"
            :type = "dateType"
            :placeholder = "placeholder"
            :picker-options = "pickerOptions"
            range-separator = "~"
            :size = "size"
            @change = "getCurrentTime"
        >
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: 'datePiker',
        props: {
            // 日期类型
            dateType: {
                type: String,
                default: 'date'
            },
            // 是否启用快捷方式
            isPickerOptions: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '选择日期'
            },
            // 日期选择器的尺寸
            size: {
                type: String,
                default: 'normal'
            }
        },
        computed: {
            pickerOptions () {
                return this.isPickerOptions ? (this.dateType === 'datetimerange' || this.dateType === 'daterange') ? this.pickerOptions2 : this.pickerOptions1 : this.pickerOptions0;
            }
        },
        data () {
            return {
                selectTime: '',
                pickerOptions0: {
                    disabledDate (time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions1: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick (picker) {
                                picker.$emit('pick', new Date());
                            }
                        },
                        {
                            text: '昨天',
                            onClick (picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        },
                        {
                            text: '一周前',
                            onClick (picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }
                    ]
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick (picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            };
        },
        methods: {
            getCurrentTime () {
                this.$emit('pikerDate', this.selectTime);
            }
        }
    };
</script>
