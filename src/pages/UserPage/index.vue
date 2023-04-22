<template>
    <div class="user-container">
        <!-- 查询部分 -->
        <!-- 行内表单 -->
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="用户名称">
                <el-input v-model="searchForm.userName" placeholder="请输入用户名称"></el-input>
            </el-form-item>
            <el-form-item label="禁用状态">
                <el-select v-model="searchForm.status" placeholder="请选择" style="width: 100px;">
                    <el-option label="未禁用" value="0"></el-option>
                    <el-option label="已禁用" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="danger">搜索</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 操作部分 -->
        <!-- 按钮 -->
        <el-button type="primary" @click="addUser">新增</el-button>
        <el-button type="danger">删除</el-button>
        <!-- 列表展示部分 -->
        <!-- 表格 -->
        <el-table :data="userInfoList" style="width: 100%;margin-top: 10px;" border>
            <el-table-column prop="id" label="id" width="80" align="center">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="width">
            </el-table-column>
            <el-table-column prop="userName" label="姓名" width="width">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
                <template slot-scope="{row}">
                    <el-button type="primary" size="mini" icon="el-icon-edit" :disabled="row.status === 1" @click="updateUser(row)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
                    <el-button type="info" size="mini">上移</el-button>
                    <el-button type="info" size="mini">下移</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 新增||编辑用户信息部分 -->
        <!-- 对话框 + 表单 -->
        <el-dialog :title="userInfoForm.id ? '编辑' : '新增'"
            :visible.sync="showDialog" width="30%"
            :before-close="handleCloseDialog">
            <el-form :model="userInfoForm" :rules="rules" ref="userInfoForm" label-width="80px">
                <el-form-item label="日期" prop="date">
                    <el-input v-model="userInfoForm.date"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="userInfoForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model.number="userInfoForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="userInfoForm.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'UserPage',
    data() {
        // 自定义表单-电话-验证规则
        const validatePhone = (rule, value, callback) => {
            if(value.trim() === '') {
                callback(new Error('请输入电话'))
            } else if(value.length !== 11) {
                callback(new Error('请输入11位有效电话'))
            } else {
                callback()
            }
        }
        return {
            // 收集查询条件
            searchForm: {
                userName: '',
                status: '',
            },
            // 存储用户信息列表数据
            userInfoList: [
                {
                    id: 1,
                    date: '2023-4-22',
                    userName: '小明',
                    phone: '12345678901',
                    address: '浙江省杭州市滨江区',
                    status: 0,
                },
                {
                    id: 2,
                    date: '2023-4-22',
                    userName: '小红',
                    phone: '12345678902',
                    address: '浙江省杭州市萧山区',
                    status: 1,
                },
                {
                    id: 3,
                    date: '2023-4-22',
                    userName: '小王',
                    phone: '12345678903',
                    address: '浙江省杭州市上城区',
                    status: 0,
                },
                {
                    id: 4,
                    date: '2023-4-22',
                    userName: '小花',
                    phone: '12345678904',
                    address: '浙江省杭州市拱墅区',
                    status: 0,
                },
                {
                    id: 5,
                    date: '2023-4-22',
                    userName: '小喻',
                    phone: '12345678905',
                    address: '浙江省杭州市西湖区',
                    status: 1,
                },
            ],
            // 控制是否展示新增||编辑的对话框
            showDialog: false,
            // 收集新增或修改的用户信息
            userInfoForm: {},
            // 新增或修改用户信息时表单的验证规则
            rules: {
                date: [{ required: true, message: '请输入日期', trigger: 'blur' }],
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 6, message: '请输入2-6个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { type: 'number', message: '请输入数字', trigger: 'blur' },
                    // { validator: validatePhone, trigger: 'blur' },
                ],
                address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
            }
        }
    },
    methods: {
        // 点击新增按钮
        addUser() {
            // 展示对话框
            this.showDialog = true
        },
        // 关闭对话框前的回调
        handleCloseDialog(done) {
            // 清除表单数据
            this.userInfoForm = {}
            // 取消表单的校验
            this.$refs.userInfoForm.clearValidate()
            // 关闭对话框
            done()
        },
        // 点击取消按钮
        cancel() {
            // 清除表单数据
            this.userInfoForm = {}
            // 取消表单的校验
            this.$refs.userInfoForm.clearValidate()
            // 关闭对话框
            this.showDialog = false
        },
        // 点击编辑按钮的回调
        updateUser(row) {
            // 展示对话框
            this.showDialog = true
            // 扩展运算符，数据只有一层时，可理解为深拷贝
            this.userInfoForm = {...row}
        },
        // 点击确定按钮的回调
        submit() {
            // 表单验证是否通过
            this.$refs.userInfoForm.validate((valid) => {
                if(valid) {
                    // 根据是否有 id 判断是新增还是修改操作
                    if(this.userInfoForm.id) {
                        // 通过数组的splice()方法，替换数据
                        let index = this.userInfoForm.id - 1
                        this.userInfoList.splice(index, 1, this.userInfoForm)
                    } else {
                        // 通过数据的push()方法，添加数据
                        let id = this.userInfoList.length + 1
                        let status = 0
                        this.userInfoList.push(Object.assign(this.userInfoForm, {id, status}))
                    }
                    // 清空表单数据
                    this.userInfoForm = {}
                    // 关闭对话框
                    this.showDialog = false
                    this.$message({
                        type: 'success',
                        message: '提交成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '校验不通过，提交失败'
                    })
                }
            })
            
        }
    }
}
</script>

<style scoped>
.user-container {
    margin: 20px;
}
</style>