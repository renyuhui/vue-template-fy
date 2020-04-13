<template>
    <div>

        <el-button @click="dialogTableVisibleBtn">打开嵌套表格的 Dialog</el-button>
        <el-button @click="dialogFormVisibleBtn">打开嵌套表单的 Dialog</el-button>
        <el-button>table</el-button>
        <simple-uploader></simple-uploader>
        <h3>table表格</h3>
        <div>
            <el-button @click="upload">上传</el-button>
        </div>
        <complex-table :gridTable="gridTable" :gridColumn="gridColumn" :gridData="gridData" :paginationInfo="paginationInfo" @getTableData="getTableData"></complex-table>
        <h3>form表格</h3>
        <!--<complex-form-->
                <!--:formInfo="formInfo"-->
                <!--:formItem="formItem"-->
                <!--:name="name"-->
                <!--@getFormData="getFormData"-->
        <!--&gt;-->
        <!--</complex-form>-->

        <modal-table
                :title="modalTitle"
                :radio="radio"
                :gridTable="gridTable"
                :gridColumn="gridColumn"
                :gridData="gridData"
                :dialogTableVisible="dialogTableVisible"
                :paginationInfo="paginationInfo"
                @getdDialogTableData="modalTableData"
                @dialogTableVisible="modalTableVisible">
            <template v-slot:body></template>
        </modal-table>
        <modal-form
                :title="modalTitle"
                :form="form"
                :dialogFormVisible="dialogFormVisible"
                @dialogFormVisible="modalFormVisible"
                @getDialogFormData="modalFormData">
            <template v-slot:body>
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </template>
        </modal-form>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import IMGS from '@/assets/BI_charts/img_pzkz_1.png'

    import Bus from '@/components/Upload/bus';

    const ImgBase64 = require('@/assets/BI_charts/img_pzkz_1.png')
    const ZhengshuBase64 = require('@/assets/BI_charts/zhengshu_1.jpg')
    import ModalTable from '@/components/Modal/ModalTable'
    import ModalForm from '@/components/Modal/ModalForm'
    import ComplexTable from '@/components/Table/ComplexTable'
    import ComplexForm from '@/components/Form/ComplexForm'
    import SimpleUploader from '@/components/Upload/SimpleUploader'

    export default {
        name: 'Dashboard',
        components: {
            ModalTable,
            ModalForm,
            ComplexTable,
            ComplexForm,
            SimpleUploader
        },
        data: function () {
            return {
                code: '111111',
                dashboardContainer: {
                    height: 'calc( 100vh - 70px )',
                    padding: '15px',
                    margin: '10px',
                    fontSize: '30px',
                    lineHeight: '46px',
                    backgroundImage: 'url(' + IMGS + ')',
                    backgroundSize: '100% 100%'
                },
                modalTitle: 'table标题',
                gridTable: {
                    stripe: false,
                    border: true,
                    height: "350",

                },
                gridColumn: [
                    {
                        label: '选择',
                        key: 'radioItem',
                        property: 'radioItem',
                        type: 'selection',
                    },{
                        label: '性别',
                        key: 'sex',
                        property: 'sex',
                        type: 'select',
                        selectDefault: "0",
                        selectOption:[
                            {
                                name: "男",
                                value: "0"
                            },{
                                name: "女",
                                value: "1"
                            }
                        ]
                    },{
                        label: '日期',
                        key: 'date',
                        property: 'date',
                        width: 260,
                        type: 'datePicker',
                    },
                    {
                        label: '姓名',
                        key: 'name',
                        property: 'name',
                        type: 'inputText',
                    },
                    {
                        label: '地址',
                        key: 'address',
                        property: 'address',
                        type: '',
                    },
                    {
                        label: '地址1',
                        key: 'num',
                        property: 'num',
                        type: 'inputNum',
                        controls: true,
                        precision: 2
                    }
                ],
                radio: 0,
                gridData: [
                    {
                        radioItem: 0,
                        sex: '1',
                        date: '',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                        num: 0
                    }, {
                        radioItem: 0,
                        sex: '1',
                        date: '2016-05-04',
                        name: '张三',
                        address: '上海市普陀区金沙江路 1518 弄',
                        num: 0
                    }, {
                        radioItem: 0,
                        sex: '0',
                        date: '2016-05-01',
                        name: '李四',
                        address: '上海市普陀区金沙江路 1518 弄',
                        num: 0
                    }, {
                        radioItem: 0,
                        sex: '0',
                        date: '2016-05-03',
                        name: '王五',
                        address: '上海市普陀区金沙江路 1518 弄',
                        num: 0
                    }
                ],
                paginationInfo:{
                    layout: 'total, sizes, prev, pager, next, jumper',
                    paginationTitle: '',
                    pageSizes: [10,20,30,40,50,100],
                    pageSize: 10,
                    total: 240,
                    currentPage: 1,
                },
                formLabelWidth: '120px',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',

                },
                formInfo:{
                    form: {
                        name: '123',
                        inline: true,
                        region: '',
                        labelWidth: '300px',
                        date1: '',
                        date2: '',
                        delivery: false,
                        type: [],
                        resource: '',
                        desc: '',
                        rules:'',
                        rowXs: '12'
                    },
                },
                formItem: [
                    {
                        label: '输入框1',
                        labelWidth: '130px',
                        rowLg: 12,
                        required: '',
                        rules: '',
                        error: '',
                        showMessage: '',
                        inlineMessag: '',
                        size: '',
                        type: 'numberInput',
                        value: '',

                    },
                    {
                        label: '输入框2',
                        labelWidth: '130px',
                        rowLg: 12,
                        required: '',
                        rules: '',
                        error: '',
                        showMessage: '',
                        inlineMessag: '',
                        size: '',
                        type: 'stringInput',
                        value: '',

                    },
                    {
                        label: '输入框3',
                        labelWidth: '130px',
                        rowLg: 12,
                        required: '',
                        rules: '',
                        error: '',
                        showMessage: '',
                        inlineMessag: '',
                        size: '',
                        type: 'textareaInput',
                        value: '',

                    },
                    {
                        label: '输入框4',
                        labelWidth: '130px',
                        rowLg: 12,
                        required: '',
                        rules: '',
                        error: '',
                        showMessage: '',
                        inlineMessag: '',
                        size: '',
                        type: 'select',
                        attributes: {
                            options:[
                                {label: '上海',value:'0'},
                                {label: '北京',value:'1'},
                                {label: '广州',value:'2'},
                                {label: '深圳',value:'3'}
                            ]
                        },
                        value: '',

                    },
                    {
                        label: '输入框5',
                        labelWidth: '130px',
                        rowLg: 12,
                        required: '',
                        rules: '',
                        error: '',
                        showMessage: '',
                        inlineMessag: '',
                        size: '',
                        type: 'radio',
                        attributes: {
                            options:[
                                {label: '上海'},
                                {label: '北京'},
                                {label: '广州'},
                                {label: '深圳'}
                            ]
                        },
                        value: '上海',

                    },
                    {
                        label: '输入框6',
                        labelWidth: '130px',
                        rowLg: 12,
                        required: '',
                        rules: '',
                        error: '',
                        showMessage: '',
                        inlineMessag: '',
                        size: '',
                        type: 'checkbox',
                        attributes: {
                            options:[
                                {label: '上海'},
                                {label: '北京'},
                                {label: '广州'},
                                {label: '深圳'}
                            ]
                        },
                        value: [],

                    },
                    {
                        label: '输入框7',
                        labelWidth: '130px',
                        rowLg: 12,
                        required: '',
                        rules: '',
                        error: '',
                        showMessage: '',
                        inlineMessag: '',
                        size: '',
                        type: 'datePicker',
                        value: ''

                    }
                ],
                dialogTableVisible: false,
                dialogFormVisible: false,
            }
        },
        computed: {
            ...mapGetters([
                'name'
            ])
        },
        mounted() {
            // console.log(IMGS)
            // console.log(ImgBase64)
            // console.log(ZhengshuBase64)

            // 文件选择后的回调
            Bus.$on('fileAdded', () => {
                console.log('文件已选择')
            });
            // 文件上传成功的回调
            Bus.$on('fileSuccess', () => {
                console.log('文件上传成功')
            });
        },
        methods: {

            upload() {
                // 打开文件选择框
                Bus.$emit('openUploader', {
                    id: '1111'  // 传入的参数
                })
            },

            dialogTableVisibleBtn() {
                this.dialogTableVisible = true;
            },
            //弹框隐藏
            modalTableVisible(data){
                this.dialogTableVisible = false;
                console.log({...data})
            },
            //获取弹框数据
            modalTableData(data){
                console.log({...data})
            },

            dialogFormVisibleBtn() {
                this.dialogFormVisible = true;
            },
            //弹框隐藏
            modalFormVisible(data){
                this.dialogFormVisible = false;
                console.log({...data})
            },
            //获取弹框数据
            modalFormData(data){
                console.log({...data})
                // this.dialogFormVisible = false;
            },


            //获取表格数据
            getTableData(data){
                console.log(data)
            },
            getFormData(data){
                console.log(data)
            }

        },

        destroyed() {
            Bus.$off('fileAdded');
            Bus.$off('fileSuccess');
        },

        /*render() {
            let {name, code, dashboardContainer,dialogTableVisible,dialogFormVisible} = this;
            console.log(this, name, code)
            return (
                <div>
                    <el-button onClick="this.modalInfo.dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
                    <el-button onClick="this.dialogFormVisible()">打开嵌套表单的 Dialog</el-button>
                    <el-button>table</el-button>
                    <modal-table modalInfo="{modalInfo}"></modal-table>
                    <modal-form modalInfo="{modalInfo}"></modal-form>
                </div>
            )
        }*/
    }
</script>

<style lang="scss" scoped>
    /*.dashboard {*/
    /*&-container {*/
    /*margin: 30px;*/
    /*}*/
    /*&-text {*/
    /*font-size: 30px;*/
    /*line-height: 46px;*/
    /*}*/
    /*}*/
    .imgStyle {
        width: 80vw;
        height: 20vh;
    }
    /*.el-date-editor.el-input, .el-date-editor.el-input__inner{*/
        /*min-width: 220px;*/
    /*}*/

/*
    text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    display: -webkit-box;
*/

</style>
