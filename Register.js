import React,{useState} from 'react';
import {Form,Input,Radio,Button,Select} from 'antd'
const {Option}=Select

const Register=()=>{

  const [employer,setEmployer]=useState('')
  const [gender,setGender]=useState('male')

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeAccount = (e)=>{
    setEmployer(e.target.value)
  }

  const onChangeGender = (e)=>{
    setGender(e.target.value)
  }

  return (
   <div> 
    <Form
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    >
      <Form.Item 
      label='Email' 
      name='Email'
      rules={[
        {
          required:true,
          validator:(_,value)=>{
            let reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (!reg.test(value))
              return Promise.reject('请检查邮箱格式')   
            return Promise.resolve() 
          }
        }
      ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item 
      label='password' 
      name='password'
      rules={[
        {
          required:true,
          validator:(_,value)=>{
            if (value.length<6)
              return Promise.reject('密码不得短于6位')
            else {
              let reg= /^(?![^a-zA-Z]+$)(?!\D+S)/
              if (!reg.test(value))
                return Promise.reject('密码须由字母和数字组成')
            }    
            return Promise.resolve()
          }
        }
      ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label='register as:'
        name="account"
        rules={[
          {
            required:true,
            message:'请选择'
          }
        ]}
      >
        <Radio.Group onChange={onChangeAccount} value={employer}>
          <Radio value={'employer'}>employer</Radio>
          <Radio value={'employee'}>employee</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label='userName'
        name='userName'
        rules={[
          {
            required:true,
            message:'请填写'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='gender:'
        name="gender"
        rules={[
          {
            required:true,
            message:'请选择'
          }
        ]}
      >
        <Radio.Group onChange={onChangeGender} value={gender}>
          <Radio value={'male'}>male</Radio>
          <Radio value={'female'}>female</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label='skills'
        name='skills'
      >
        <Input />
        <Input />
        <Input />
      </Form.Item>

      <Form.Item
        label='eduction level'
        name='eduction-level'
      >
        <Select
          defaultValue='Graduate'
        >
          <Option value='High School'>High School</Option>
          <Option value='Undergraduate'>Undergraduate</Option>
          <Option value='Graduate'>Graduate</Option>
          <Option value='PhD'>PhD</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Register
        </Button>
      </Form.Item>

    </Form>
</div>
  )
}

export default Register