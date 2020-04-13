<template>
    <div>
        <el-input
                :value="value"
                :key="keys"
                :type="attributes.type ? attributes.type : 'text'"
                :placeholder="attributes.placeholder ? attributes.placeholder : '请填写'"
                :maxlength="attributes.maxlength ? attributes.maxlength : ''"
                :minlength="attributes.minlength ? attributes.minlength : ''"
                :clearable="attributes.clearable ? attributes.clearable : false"
                :show-word-limit="attributes.showWordLimit ? attributes.showWordLimit : false"
                :show-password="attributes.showPassword ? attributes.showPassword : false"
                :disabled="attributes.disabled ? attributes.disabled : false"
                :size="attributes.size ? attributes.size : 'small'"
                :autocomplete="attributes.autocomplete ? attributes.autocomplete : 'off'"
                :name="attributes.name ? attributes.name : ''"
                :readonly="attributes.readonly ? attributes.readonly : false"
                :max="attributes.max ? attributes.max : ''"
                :min="attributes.max ? attributes.min : ''"
                :tabindex="attributes.tabindex ? attributes.tabindex : ''"
                @input="getCurrentStringInputData"

        ></el-input>
    </div>
</template>

<script>
    export default {
        name: "StringInput",
        props: {
            value: null,
            keys:null,
            attributes: null
        },
        created() {

        },
        methods: {
            //返回input数据
            getCurrentStringInputData(scope) {
                console.log(scope,this._props);
                let newData = {
                    value: scope,
                    keys: this._props.keys,
                    itemAttributes: this._props.attributes
                };
                this.$emit('getStringInputData', newData)
            },
        }
    }
</script>

<style scoped>

</style>
