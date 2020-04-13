<template>
    <div>
        <uploader
                ref="simpleUploader"
                :key="uploader_key"
                :options="options"
                :autoStart="false"
                class="simple-uploader"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError"
        >
            <uploader-unsupport></uploader-unsupport>
            <uploader-btn
                    style="margin-bottom: 10px;"
                    :attrs="attrs"
                    :directory="true"
                    :single="true"
                    ref="simpleUploadBtn"
            >选择文件夹</uploader-btn>
            <!--<uploader-drop>

            </uploader-drop>-->
            <uploader-list></uploader-list>
        </uploader>
    </div>
</template>

<script>
    import {ACCEPT_CONFIG} from './config';

    export default {
        name: "SimpleUploader",
        data: ()=> ({
            // uploader_key: new Date().getTime(),//这个用来刷新组件--解决不刷新页面连续上传的缓存上传数据（注：每次上传时，强制这个值进行更改---根据自己的实际情况重新赋值）
            // options: {
            //     // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
            //     target: '/uploadCategory',//SpringBoot后台接收文件夹数据的接口
            //     testChunks: false//是否分片-不分片
            // },
        }),
        props:{
            uploader_key: new Date().getTime(),//这个用来刷新组件--解决不刷新页面连续上传的缓存上传数据（注：每次上传时，强制这个值进行更改---根据自己的实际情况重新赋值）
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
        },
        methods:{

            onFileSuccess: function (rootFile, file, response, chunk) {
                console.log(rootFile, file, response, chunk)
                //这里可以根据response（接口）返回的数据处理自己的实际问题（如：从response拿到后台返回的想要的数据进行组装并显示）
                //注，这里从文件夹每上传成功一个文件会调用一次这个方法
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
                    this.$emit('fileSuccess');
                    console.log('上传成功');
                }
            },
            onFileProgress(rootFile, file, chunk) {
                console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
            },
            onFileError(rootFile, file, response, chunk) {
                this.$message({
                    message: response,
                    type: 'error'
                })
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
        }
    }
</script>

<style scoped>
    .simple-uploader {
        width: 90%;
        padding: 15px;
        margin: 40px auto 0;
        font-size: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    }

    .simple-uploader .uploader-btn {
        margin-right: 4px;
    }

    .simple-uploader .uploader-list {
        max-height: 440px;
        overflow: auto;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
