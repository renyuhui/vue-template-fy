<template>
    <div>
        <el-input-number
                :value="value"
                :key="keys"
                :placeholder="attributes.placeholder ? attributes.placeholder : '请填写'"
                :controls="attributes.controls ? attributes.controls : true"
                :step="attributes.step ? attributes.step : 1"
                :disabled="attributes.disabled ? attributes.disabled : false"
                :size="attributes.size ? attributes.size : 'small'"
                :name="attributes.name ? attributes.name : ''"
                :max="attributes.max ? attributes.max : Infinity"
                :min="attributes.max ? attributes.min : -Infinity"
                :precision="attributes.precision ? attributes.precision : 0"
                :controls-position="attributes.controlsPosition ? attributes.controlsPosition : 'right'"

                @change="getCurrentNumberInputData"

        ></el-input-number>
    </div>
</template>

<script>
    export default {
        name: "NumberInput",
        props: {
            value: null,
            keys:null,
            attributes: null
        },
        created() {

        },
        methods: {
            //返回input数据
            getCurrentNumberInputData(scope) {
                console.log(scope,this._props);
                let newData = {
                    value: scope,
                    keys: this._props.keys,
                    itemAttributes: this._props.attributes
                };
                this.$emit('getNumberInputData', newData)
            },
        }
    }
</script>

<style scoped>

</style>
