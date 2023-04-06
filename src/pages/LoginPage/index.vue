<template>
    <div>
        <div class="background">
            <img src="https://windliangblog.oss-cn-beijing.aliyuncs.com/computer-1869306_1920.jpg">
        </div>
        <div class="login-container">
            <div class="title">登录</div>
            <!-- Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，
                并将 form-Item 的 prop 属性设置为需要验证的特殊键值即可;
                status-icon属性为输入框添加了表示校验结果的反馈图标 -->
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" status-icon class="login" label-width="0">
                <el-form-item label="" prop="account">
                    <el-input 
                        v-model="ruleForm.account" 
                        placeholder="请输入账号"
                    ></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input 
                        type="password" 
                        v-model="ruleForm.password" 
                        placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="button" type="primary" @click="submitForm">
                        登录
                    </el-button>
                    <el-button class="button" @click="resetForm">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            ruleForm: {
                account: '',
                password: '',
            },
            rules: {
               account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
               password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 6, message: '请输入3-6个字符', trigger: 'blur' },
            ],
            }
        }
    },
    methods: {
        async submitForm() {
           const res = await fetch("/api/login", {
             method: "POST",
             headers: {
                "Content-Type": "application/json;charset=utf-8",
             },
             body: JSON.stringify({
                userName: this.ruleForm.account,
                password: this.ruleForm.password,
             })
           })
           const resJson = await res.json()
           this.urls = resJson.data
        },
        resetForm() {},
    }
}
</script>

<style lang="less" scoped>

.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 200px;
    z-index: 10;
    
    .login {
        width: 400px;
        .button {
            width: calc((400px - 10px)/2);
        }
    }
    .title {
        margin-bottom: 30px;
        font-size: 30px;
        color: #fff;
    }
}
.background {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
</style>