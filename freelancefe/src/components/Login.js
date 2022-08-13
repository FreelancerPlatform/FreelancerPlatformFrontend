import React from "react";
import { Button, Form, Input, message, Radio, Space } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { login } from "../utils";

class Login extends React.Component {
  formRef = React.createRef();
  state = {
    role: "applicant",
    loading: false,
  };

  onFinish = () => {
    console.log("finish form");
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleLogin = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      const { role } = this.state;
      const resp = await login(formInstance.getFieldsValue(true), role);
      this.props.handleLoginSuccess(resp.token, role === "employer");
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleRadioOnChange = (e) => {
    this.setState({
      role: e.target.value,
    });
  };

  render() {
    return (
      <div style={{ width: 500, margin: "20px auto" }}>
        <Form
          name="basic"
          ref={this.formRef}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (value.length < 6)
                    return Promise.reject(
                      "The password should be longer than 6 characters"
                    );
                  else {
                    let reg = /^(?![^a-zA-Z]+$)(?!\D+S)/;
                    if (!reg.test(value))
                      return Promise.reject(
                        "The password should include letters and numbers"
                      );
                  }
                  return Promise.resolve();
                },
                message: "Please input a valid email",
              },
            ]}
          >
            <Input
              disabled={this.state.loading}
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: false,
                message: "Please input your name",
              },
            ]}
          >
            <Input
              disabled={this.state.loading}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password
              disabled={this.state.loading}
              placeholder="Password"
            />
          </Form.Item>
        </Form>
        <Space style={{ display: "flex", justifyContent: "center" }}>
          <Radio.Group
            disabled={this.state.loading}
            onChange={this.handleRadioOnChange}
            value={this.state.role}
          >
            <Radio value={"applicant"} defaultChecked>
              Applicant
            </Radio>
            <Radio value={"employer"}>Employer</Radio>
          </Radio.Group>
        </Space>
        <br></br>
        <Space style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={this.handleLogin}
            disabled={this.state.loading}
            type="primary"
          >
            Login
          </Button>
          <Button
            onClick={this.props.handleNeedRegister}
            disabled={this.state.loading}
          >
            Take Me to Register
          </Button>
        </Space>
      </div>
    );
  }
}

export default Login;
