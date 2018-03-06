/*
 * @Author: peter 
 * @Date: 2017-12-04 18:57:21 
 * @Last Modified by:   peter 
 * @Last Modified time: 2017-12-04 18:57:21 
 */
<template>
  <div class="ui-login-wrap">
        <el-form ref='loginForm' :model='loginForm' label-width='80px' :rules="rules">
            <el-form-item label='用户名' prop="name">
                <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item label='密码' prop='password'>
                <el-input v-model="loginForm.password" type='password'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' :loading="loading" @click='SubmitForm("loginForm")' >
                    登陆
                </el-button>
            </el-form-item>
        </el-form>
  </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        data () {
            return {
                loginForm: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入正确的用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 15,
                            message: '长度在3-15位字符之间',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入正确的密码',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 15,
                            message: '长度在3-15位字符之间',
                            trigger: 'blur'
                        }
                    ]
                },
                loading: false
            };
        },
        methods: {
            ...mapActions([
                'LoginByuserName',
                'myTest'
            ]),
            SubmitForm (formName) {
                console.log(this.$refs);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        console.log('登陆');
                        this.LoginByuserName({
                            username: this.loginForm.name,
                            password: this.loginForm.password
                        }).then(() => {
                            this.loading = false;
                            this.$router.push('/');
                        }).catch(error => {
                            console.log(error);
                            this.loading = false;
                        });
                    } else {
                        console.log('不符合要求');
                        console.log(this);
                        return false;
                    }
                });
            },
            getList () {
                this.myTest();
                // let param = new URLSearchParams()
                // param.append('user_name', this.loginForm.name)
                // param.append('pwd', this.loginForm.password)
                // param.append('warehouse_id', '119')

                // const data = {
                //     user_name: this.loginForm.name,
                //     pwd: this.loginForm.password,
                //     warehouse_id: '119'
                // }
                // axios.post('/login/login/UserLogin', data).then(response => {
                //     console.log(response.data)
                // }).catch(error => {
                //     console.log(error)
                // })
                // axios({
                //     method: 'post',
                //     url: '/login/login/UserLogin',
                //     data: param
                // }).then(response => {
                //     console.log(response.data)
                // }).catch(error => {
                //     console.log(error)
                // })
            },
            myPromise1 () {
                return new Promise((resolve, reject) => {
                    console.log(resolve);
                    resolve(1111);
                });
            },
            myPromise2 () {
                return new Promise((resolve, reject) => {
                    // resolve(5555)
                    reject(new Error('这是一个错误'));
                });
            }
        },
        created () {
            this.myPromise2().then(response => {
                console.log(11111111);
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        }
    };
</script>

<style lang="less" scoped>
    // @import '../../assets/less/index.less';

    .ui-login-wrap {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 25%;
        height: 300px;
        background-color: #D3DCE6;
        padding: 100px 50px 80px 20px;
        border-radius: 10px;
    }
</style>


