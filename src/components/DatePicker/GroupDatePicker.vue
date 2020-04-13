<template>
    <div>
        <el-date-picker
                v-model="dateValue"
                :type="attributes.date ? attributes.type : 'date'"
                :readonly="attributes.readonly ? attributes.readonly : false"
                :disabled="attributes.disabled ? attributes.disabled : false"
                :editable="attributes.editable ? attributes.editable : true"
                :clearable="attributes.clearable ? attributes.clearable : true"
                :size="attributes.size ? attributes.size : 'small'"
                :start-placeholder="attributes.startPlaceholder ? attributes.startPlaceholder : ''"
                :end-placeholder="attributes.endPlaceholder ? attributes.endPlaceholder : ''"
                :format="attributes.format ? attributes.format : 'yyyy-MM-dd'"
                :align="attributes.align ? attributes.align : 'left'"
                :popper-class="attributes.popperClass ? attributes.popperClass : ''"
                :picker-options="attributes.pickerOptions ? attributes.pickerOptions : {}"
                :range-separator="attributes.rangeSeparator ? attributes.rangeSeparator : '-'"
                :default-value="attributes.defaultValue ? attributes.defaultValue : ''"
                :default-time="attributes.defaultTime ? attributes.defaultTime : ''"
                :value-format="attributes.valueFormat ? attributes.valueFormat : ''"
                :name="attributes.name ? attributes.name : ''"
                :unlink-panels="attributes.unlinkPanels ? attributes.unlinkPanels : false"
                :validate-event="attributes.validateEvent ? attributes.validateEvent : true"
                :placeholder="attributes.placeholder ? attributes.placeholder : '选择日期'"
                @change="getCurrentGroupDatePickerData"
        >
        </el-date-picker>
    </div>

</template>

<script>
    export default {
        name: "GroupDatePicker",
        data() {
            return {
                dateValue: this.value
            }
        },
        props: {
            value: null,
            keys: null,
            attributes: null
        },
        created() {

        },
        methods: {
            //返回input数据
            getCurrentGroupDatePickerData(data) {
                console.log(data);
                let newData = {
                    value: data,
                    keys: this._props.keys,
                    itemAttributes: this._props.attributes
                };
                this.$emit('getGroupDatePickerData', newData)
            },
        }
    }
</script>

<style scoped>

</style>
