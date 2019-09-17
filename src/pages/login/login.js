import React, {Component} from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './login.less'
import logo from './images/p1.png'

/*
登录的路由组件
*/
const Item = Form.Item;
class Login extends Component{
    
    handleSubmit = (e)=>{
        e.preventDefault();
        //统一进行表单验证(表单是所有数据进行校验)
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('校验成功,提交登录的ajax请求', values);
            }else{
              console.log('校验失败')
            }
          });
        // const values = this.props.form.getFieldsValue() 自己获取表单数据
        // console.log(values)
    }

    //自定义验证密码
    validatePwd = (rule, value, callback) => {
        console.log(rule, value)
        // callback('xxx') 验证不同通过的提示信息
        if(!value){callback('用户名不能为空')}
        else if(value.length>12){callback('用户名最多不超过12位')}
        else if(value.length<4){callback('用户名最少不过4位')}
        else if(!/^[a-zA-Z0-9_]+$/.test(value)){callback('用户名必须是字母数字下划线组成！')}
        else {callback()}
    }
    render() {
        //得到具有强大功能的form对象
        const form = this.props.form
        //从const得到一个装饰器函数 getFieldDecorator,第一个参数是key，第二个是配置对象
        //配置对象:属性名是一些特定的名称
        const {getFieldDecorator} = form
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo'></img>
                    <h1>React项目:后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {/* 声明式验证:直接使用别人定义好的验证规则进行验证 */}
                    { 
                        getFieldDecorator('username',{
                        rules: [
                            { required: true, whitespace:true, message: '用户名不能为空!' },
                            { max: 12, message: '用户名最多不超过12位' },
                            { min: 4, message: '用户名最少不过4位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是字母数字下划线组成！' }
                        ],
                        initialValue: 'admin'
                        })(
                            <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    />
                        )
                    }
                    </Form.Item>
                    <Form.Item>
                    {/* 自定义式验证:直接使用别人定义好的验证规则进行验证 */}
                    {
                        getFieldDecorator('password',{
                            rules:[
                                {validator: this.validatePwd}
                            ]
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />
                        )
                    }
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/*
1.高阶组件
    1）本质就是一个函数
    2）接受一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向北包装组件传入特定属性
    3）作用:扩展组件的功能
    4) 高阶组件也是高阶函数:接受一个组件函数，返回是一个新的组件函数
2.高阶函数
    <a>接受函数类型的参数
    <b>返回值是函数
    常见 <a>定时器setTimeout()/setInterval()
        <b>Promise()
        <c>数组遍历API:forEach()/filter()/map()/find()/findIndex()
        <d>函数对象的bind()
        <e>Form.create()()/getFieldDecorator()()
3.高阶函数更具有扩展性
*/
// 包装Form组件生成一个新的组件:Form(Login)
// 新组建回想Form组件传递一个强大的对象属性:from
const WrapLogin = Form.create()(Login)
export default WrapLogin
/* 
1.前台表单验证 
2.手机表单输入数据
*/