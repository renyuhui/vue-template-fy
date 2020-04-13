<template>
    <div>
        <el-radio-group
                v-model="radioValue"
                @change="getCurrentGroupRadioData"
        >
            <div
                    v-for="(item ,i) in attributes.options"
                    :key="i"
            >
                <el-radio-button
                        v-if="attributes.type === 'button'"
                        :label="item.label"
                        :disabled="item.disabled ? item.disabled : false"
                ></el-radio-button>
                <el-radio
                        v-else
                        :label="item.label"
                        :disabled="item.disabled ? item.disabled : false"
                ></el-radio>
            </div>
        </el-radio-group>
    </div>
</template>

<script>
    export default {
        name: "GroupRadio",
        data(){
            return {
                radioValue: this.value,
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
            getCurrentGroupRadioData(scope) {
                console.log(scope, this._props);
                let newData = {
                    value: scope,
                    keys: this._props.keys,
                    itemAttributes: this._props.attributes
                };
                this.$emit('getGroupRadioData', newData)
            },
        }
    }
</script>

<style scoped>

</style>
