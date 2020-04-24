/*
 * @Description: 代理邀请设置
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div style="padding-top:40px"> 
        <el-form :model="dataForm"
            ref="dataForm"
            label-width="150px">
           <el-form-item label-width="180px" label="代理方式：" prop="checkList">
                <el-checkbox-group v-model="dataForm.checkList"  >
                          <el-checkbox v-for="item in agentLevelList" :label="item.value" :key="item.value">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label-width="180px" label="总部邀请代理链接：">
                {{dataForm.url}}<el-button style="margin-left:10px"  class="tag-read" :data-clipboard-text="dataForm.url" @click="copy">复制链接</el-button>
            </el-form-item>
            <el-form-item label-width="180px" label="总部邀请代理链接：">
                <div id="qrcode" ref="qrCodeDiv"></div>
                <el-button style="margin-top:10px;" type="保存到本地"
                        @click="downcodes()">下载到本地</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                        @click="dataFormSubmit()">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import Clipboard from 'clipboard';
import {
     timeStamp2String,
} from '@/api/globalAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            isDiscount:'0',
            agentid:'',
            agentLevelList:[{name:'董事',value:1},{name:'钻石',value:2},{name:'省代',value:3},{name:'市代',value:4},{name:'VIP399套餐',value:5}],
            dataForm:{
                checkList:[],
                url:'http://ws.zhanchengwlkj.com/zhuce.html?id=0'
            },
            timelist:[

            ],
            stock_type:1,
        };
    },
    components:{
        // AddDepModal,
    },
    props: {
    },
    methods:{
        /**
         * @msg: 时间处理
         * @param {type} 
         * @return: 
         */
        timechange(time,type){
            return timeStamp2String(time,type)
        },
         copy() {
            var clipboard = new Clipboard('.tag-read')
            clipboard.on('success', e => {
                this.$message({
                    type: 'success',
                    message: '复制成功',
                });
              // 释放内存
              clipboard.destroy()
            })
            clipboard.on('error', e => {
              // 不支持复制
              console.log('该浏览器不支持自动复制')
              // 释放内存
              clipboard.destroy()
            })
          },
        dataFormSubmit () {
          let that=this;
            this.$refs['dataForm'].validate((valid) => {
                if(valid){
                    const params =this.dataForm
                    console.log(params)
                }
            })
        },errorMsg (message) {
            this.$message({
                message: message,
                type: 'error',
                duration: 1500
            })
        },codeshow(){
            new QRCode(this.$refs.qrCodeDiv, {
            text: 'http://ws.zhanchengwlkj.com/zhuce.html?id=0',
            width: 200,
            height: 200,
            colorDark: "#333333", //二维码颜色
            colorLight: "#ffffff", //二维码背景色
            correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
            })
        },downcodes(){
            let myCanvas = document.getElementById('qrcode').getElementsByTagName('canvas');
            let img=document.getElementById('qrcode').getElementsByTagName('img')
            // // //创建一个a标签节点
            let a= document.createElement("a")
            // //设置a标签的href属性（将canvas变成png图片）
            let imgURL=myCanvas[0].toDataURL('image/jpg');
            let ua = navigator.userAgent;
            if (ua.indexOf("Trident") != -1 && ua.indexOf("Windows") != -1) { // IE内核 并且  windows系统 情况下 才执行;
                var bstr = atob(imgURL.split(',')[1])
                var n = bstr.length
                var u8arr = new Uint8Array(n)
                while (n--) {
                  u8arr[n] = bstr.charCodeAt(n)
                }
                var blob = new Blob([u8arr])
                window.navigator.msSaveOrOpenBlob(blob, '下载' + '.' + 'png')
            }else if(ua.indexOf("Firefox") > -1){ //火狐兼容下载
                let blob = this.base64ToBlob(imgURL); //new Blob([content]);
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
                a.download = ' ';//下载图片名称，如果填内容识别不到，下载为未知文件，所以我这里就不填为空
                a.href = URL.createObjectURL(blob);
                a.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));//兼容火狐
            }else{ //谷歌兼容下载
                img.src=myCanvas[0].toDataURL('image/jpg');
                // a.href = myCanvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream')
                a.href=img.src
                //设置下载文件的名字
                a.download = "下载"
                 //点击
                a.click()
            }
        }
    },
    mounted(){
      this.codeshow()
    }
}
</script>

<style scoped lang="less">
.el-row{
    padding: 10px;
    border:1px solid #000;
}
.mbline{
  margin-top:24px;
  padding-left: 20px;
  line-height: 40px;
  background: rgb(249, 249, 249);
}
</style>

