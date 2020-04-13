<template>
    <div>
        <el-button-group>

            <div
                    v-for="(item ,i) in attributes.options"
                    :key="i"
            >
                <el-button
                        :size="attributes.size ? attributes.size : 'small'"
                        :type="attributes.type ? attributes.type : ''"
                        :plain="attributes.plain ? attributes.plain : false"
                        :round="attributes.round ? attributes.round : false"
                        :circle="attributes.circle ? attributes.circle : false"
                        :loading="attributes.loading ? attributes.loading : false"
                        :disabled="attributes.disabled ? attributes.disabled : false"
                        :icon="attributes.icon ? attributes.icon : ''"
                        :autofocus="attributes.autofocus ? attributes.autofocus : false"
                        :native-type="attributes.nativeType ? attributes.nativeType : button"
                >

                </el-button>
            </div>
            <!--<el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-share"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>-->
        </el-button-group>
    </div>
</template>

<script>
    export default {
        name: "GroupButton",
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
