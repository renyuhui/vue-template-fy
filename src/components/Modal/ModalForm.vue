<template>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <slot name="header" class="dialog-header"></slot>
        <el-form :model="form">
            <slot name="body" class="dialog-body"></slot>
        </el-form>
        <slot name="footer" class="dialog-footer"></slot>

        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onOk">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "ModalTable",

        props:{
            formLabelWidth: '120px',
            dialogFormVisible: false,
            title: '',
            form: {},

        },
        methods:{
            onOk() {
                let data = this._props;
                this.$emit('dialogFormVisible', data)
            },
            onCancel() {
                let data = this._props;
                this.$emit('dialogFormVisible', data)
            },
            handleClose(){
                let data = this._props;
                this.$emit('dialogFormVisible', data)
            },
        }
    }
</script>

<style scoped>

</style>