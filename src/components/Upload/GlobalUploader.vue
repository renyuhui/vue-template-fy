<template>
    <div id="global-uploader">
        <!-- 上传 -->
        <uploader
                ref="uploader"
                :options="options"
                :autoStart="false"
                @file-added="onFileAdded"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError"
                class="uploader-app"
        >
            <uploader-unsupport></uploader-unsupport>

            <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>

            <uploader-list v-show="panelShow">
                <div class="file-panel" slot-scope="props" :class="{'collapse': collapse}">
                    <div class="file-title">
                        <h2>文件列表</h2>
                        <div class="operate">
                            <el-button @click="fileListShow" type="text" :title="collapse ? '展开':'折叠' ">
                                <i class="iconfont" :class="collapse ? 'inuc-fullscreen': 'inuc-minus-round'"></i>
                            </el-button>
                            <el-button @click="close" type="text" title="关闭">
                                <i class="iconfont icon-close"></i>
                            </el-button>
                        </div>
                    </div>

                    <el-collapse-transition>
                        <div v-show="showStuats">
                        <ul id="global-uploader-list" class="file-list">
                            <li v-for="file in props.fileList" :key="file.id">
                                <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
                            </li>
                            <div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
                        </ul>
                        </div>
                    </el-collapse-transition>
                </div>
            </uploader-list>

        </uploader>

    </div>
</template>

<script>
    /**
     *   全局上传插件
     *   调用方法：Bus.$emit('openUploader', {}) 打开文件选择框，参数为需要传递的额外参数
     *   监听函数：Bus.$on('fileAdded', fn); 文件选择后的回调
     *            Bus.$on('fileSuccess', fn); 文件上传成功的回调
     */
    import {ACCEPT_CONFIG} from './config';
    import Bus from './bus';
    import SparkMD5 from 'spark-md5';

    // import {Ticket} from '@/assets/js/utils';
    // import api from '@/api';

    export default {
        name: "GlobalUploader",
        data: ()=> ({
            options: {
                target: '',  //目标上传地址URL，默认值为 '/'。
                chunkSize: 1024*1024*2,  //(1MB) 分片时按照该值来分。最后一个上传分片的大小是可能是大于等于1倍的这个值但是小于两倍的这个值大小
                simultaneousUploads: 3,  //并发上传数，默认 3。
                fileParameterName: 'upfile',  // 上传文件时文件的参数名，默认 file。
                maxChunkRetries: 3,  // 最大自动失败重试上传次数，值可以是任意正整数，如果是 undefined 则代表无限次，默认 0
                chunkRetryInterval: null,  // 重试间隔，值可以是任意正整数，如果是 null 则代表立即重试，默认 null
                testChunks: true,   //是否开启服务器分片校验
                // 服务器分片校验函数，秒传及断点续传基础
                checkChunkUploadedByResponse: function (chunk, message) {
                    console.log(chunk, message)
                    let objMessage = JSON.parse(message);
                    if (objMessage.skipUpload) {
                        return true;
                    }
                    return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
                },
                headers: {  // 额外的一些请求头，例如有时我们需要在header中向后台传递token，默认为对象: {}
                    // Authorization: Ticket.get() && "Bearer " + Ticket.get().access_token
                },
                query() {},

            },
            attrs: {
                accept: ACCEPT_CONFIG.getAll() // 上传文件类型
            },
            panelShow: false,   //选择文件后，展示上传panel
            collapse: false,
            showStuats: true,
        }),
        mounted() {
            Bus.$on('openUploader', query => {
                this.params = query || {};
                if (this.$refs.uploadBtn) {
                    console.log(query);
                    document.getElementById('global-uploader-btn').click();
                }
            });
        },
        computed: {
            //Uploader实例
            uploader() {
                return this.$refs.uploader.uploader;
            }
        },
        methods: {

            onFileAdded(file) {
                this.panelShow = true;
                this.computeMD5(file);
                Bus.$emit('fileAdded');//添加了一个文件，一般用作文件校验，如果给 file 增加 ignored 属性为 true 的话就会被过滤掉
            },
            onFileProgress(rootFile, file, chunk) {
                console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
            },
            onFileSuccess(rootFile, file, response, chunk) {
                let res = JSON.parse(response);
                // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
                if (!res.result) {
                    this.$message({ message: res.message, type: 'error' });
                    // 文件状态设为“失败”
                    // this.statusSet(file.id, 'failed');
                    return
                }
                // 如果服务端返回需要合并
                if (res.needMerge) {
                    // 文件状态设为“合并中”
                    // this.statusSet(file.id, 'merging');
                    // api.mergeSimpleUpload({
                    //     tempName: res.tempName,
                    //     fileName: file.name,
                    //     ...this.params,
                    // }).then(res => {
                    //     // 文件合并成功
                    //     Bus.$emit('fileSuccess');
                    //     this.statusRemove(file.id);
                    // }).catch(e => {});
                    // 不需要合并
                } else {
                    Bus.$emit('fileSuccess');
                    console.log('上传成功');
                }
            },
            onFileError(rootFile, file, response, chunk) {
                this.$message({
                    message: response,
                    type: 'error'
                })
            },
            /**
             * 计算md5，实现断点续传及秒传
             * @param file
             */
            computeMD5(file) {
                let fileReader = new FileReader();
                let time = new Date().getTime();
                let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
                let currentChunk = 0;
                const chunkSize = 10 * 1024 * 1000;
                let chunks = Math.ceil(file.size / chunkSize);
                let spark = new SparkMD5.ArrayBuffer();
                // 文件状态设为"计算MD5"
                // this.statusSet(file.id, 'md5');
                file.pause();
                loadNext();
                fileReader.onload = (e => {
                    spark.append(e.target.result);
                    if (currentChunk < chunks) {
                        currentChunk++;
                        loadNext();
                        // 实时展示MD5的计算进度
                        this.$nextTick(() => {
                            console.log('校验MD5 '+ ((currentChunk/chunks)*100).toFixed(0)+'%')
                            // let myStatus = document.getElementsByClassName(`myStatus_${file.id}`);
                            // myStatus.innerText('校验MD5 '+ ((currentChunk/chunks)*100).toFixed(0)+'%')
                        })
                    } else {
                        let md5 = spark.end();
                        this.computeMD5Success(md5, file);
                        console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
                    }
                });
                fileReader.onerror = function () {
                    // this.error(`文件${file.name}读取出错，请检查该文件`)
                    file.cancel();
                };
                function loadNext() {
                    let start = currentChunk * chunkSize;
                    let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                    fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
                }
            },
            computeMD5Success(md5, file) {
                // 将自定义参数直接加载uploader实例的opts上
                Object.assign(this.uploader.opts, {
                    query: {
                        ...this.params,
                    }
                })
                file.uniqueIdentifier = md5;
                file.resume();
                // this.statusRemove(file.id);
            },
            fileListShow() {
                if (this.showStuats) {
                    this.showStuats = !this.showStuats;
                    this.collapse = true;
                } else {
                    this.showStuats = !this.showStuats;
                    this.collapse = false;
                }
                // let $list = $('#global-uploader .file-list');
                // if ($list.is(':visible')) {
                //     $list.slideUp();
                //     this.collapse = true;
                // } else {
                //     $list.slideDown();
                //     this.collapse = false;
                // }
            },
            close() {
                this.uploader.cancel();
                this.panelShow = false;
            },
            /**
             * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
             * @param id
             * @param status
             */
            statusSet(id, status) {
                let statusMap = {
                    md5: {
                        text: '校验MD5',
                        bgc: '#fff'
                    },
                    merging: {
                        text: '合并中',
                        bgc: '#e2eeff'
                    },
                    transcoding: {
                        text: '转码中',
                        bgc: '#e2eeff'
                    },
                    failed: {
                        text: '上传失败',
                        bgc: '#e2eeff'
                    }
                }
                this.$nextTick(() => {
                    $(`<p class="myStatus_${id}"></p>`).appendTo(`.file_${id} .uploader-file-status`).css({
                        'position': 'absolute',
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'zIndex': '1',
                        'backgroundColor': statusMap[status].bgc
                    }).text(statusMap[status].text);
                })
            },
            statusRemove(id) {
                this.$nextTick(() => {
                    $(`.myStatus_${id}`).remove();
                })
            },
            error(msg) {
                this.$notify({
                    title: '错误',
                    message: msg,
                    type: 'error',
                    duration: 2000
                })
            }
        },
        watch: {},
        destroyed() {
            Bus.$off('openUploader');
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    #global-uploader {
        position: fixed;
        z-index: 20;
        right: 15px;
        bottom: 15px;
        .uploader-app {
            width: 520px;
        }
        .file-panel {
            background-color: #fff;
            border: 1px solid #e2e2e2;
            border-radius: 7px 7px 0 0;
            box-shadow: 0 0 10px rgba(0, 0, 0, .2);
            .file-title {
                display: flex;
                height: 40px;
                line-height: 40px;
                padding: 0 15px;
                border-bottom: 1px solid #ddd;
                .operate {
                    flex: 1;
                    text-align: right;
                }
            }
            .file-list {
                position: relative;
                height: 240px;
                overflow-x: hidden;
                overflow-y: auto;
                background-color: #fff;
                > li {
                    background-color: #fff;
                }
            }
            &.collapse {
                .file-title {
                    background-color: #E7ECF2;
                }
            }
        }
        .no-file {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
        }
        /deep/.uploader-file-icon {
            &:before {
                content: '' !important;
            }
            &[icon=image] {
                background: url(../../assets/upload/image-icon.png);
            }
            &[icon=video] {
                background: url(../../assets/upload/video-icon.png);
            }
            &[icon=document] {
                background: url(../../assets/upload/text-icon.png);
            }
        }
        /deep/.uploader-file-actions > span {
            margin-right: 6px;
        }
    }
    /* 隐藏上传按钮 */
    #global-uploader-btn {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
</style>
