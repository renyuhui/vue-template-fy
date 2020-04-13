<template>
    <el-dialog :title="title" :visible.sync="dialogTableVisible" :before-close="handleClose">
        <slot name="header" class="dialog-header"></slot>
        <el-table :data="gridData">
            <el-table-column label="单选" property="radioItem" width="50">
                <template scope="scope">
                    <el-radio :label="1" v-model="scope.row.radioItem" @change.native="getCurrentRow(scope,scope.$index,scope.row)">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
            <slot name="body" class="dialog-body"></slot>
        </el-table>
        <div class="pagination-block">
            <div class="demonstration">{{paginationInfo.paginationTitle}}</div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationInfo.currentPage"
                :page-sizes="paginationInfo.pageSizes"
                :page-size="paginationInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationInfo.total">
            </el-pagination>
        </div>
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

        props: {
            radio: 0,
            gridData: null,
            title: '',
            dialogTableVisible: false,
            paginationInfo:{
                layout: 'total, sizes, prev, pager, next, jumper',
                paginationTitle: '',
                pageSizes: [],
                pageSize: 10,
                total: 0,
                currentPage: 1,
            }
        },

        mounted() {

        },

        methods: {
            //确定
            onOk() {
                let data = this._props;
                this.$emit('dialogTableVisible', data)
            },
            //取消
            onCancel() {
                let gridData = this.gridData;
                gridData.forEach(function(item,i){
                    item.radioItem = 0;
                });
                this.gridData = gridData;
                let data = this._props;
                this.$emit('dialogTableVisible', data)
            },
            //关闭
            handleClose(){
                let gridData = this.gridData;
                gridData.forEach(function(item,i){
                    item.radioItem = 0;
                });
                this.gridData = gridData;
                let data = this._props;
                this.$emit('dialogTableVisible', data)
            },

            //切换每页显示数量
            handleSizeChange(val) {
                let gridData = this.gridData;
                gridData.forEach(function(item,i){
                    item.radioItem = 0;
                });
                this.gridData = gridData;
                this.paginationInfo.pageSize = val;
                this.$emit('getdDialogTableData', this._props)
                console.log(`每页 ${val} 条`);
            },
            // 切换当前页数
            handleCurrentChange(val) {
                let gridData = this.gridData;
                gridData.forEach(function(item,i){
                    item.radioItem = 0;
                });
                this.gridData = gridData;
                this.paginationInfo.currentPage = val;
                this.$emit('getdDialogTableData', this._props)
                console.log(`当前页: ${val}`);
            },
            getCurrentRow(scope,e,row){
                console.log(scope,e,row)
                // this.radio = e;
                let gridData = this.gridData;
                gridData.forEach(function(item,i){
                    if(i == e){
                        item.radioItem = 1;
                    }else{
                        item.radioItem = 0;
                    }
                });
                this.gridData = gridData;

                this.$emit('getdDialogTableData', this._props)
            }

        }
    }
</script>

<style scoped>
    .pagination-block{
        float: right;
    }
</style>