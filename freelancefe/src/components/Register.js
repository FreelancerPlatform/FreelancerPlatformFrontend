import React from "react";
import { Form, Input, Radio, Button, Select, message, Space } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { register } from "../utils";

const { Option } = Select;

class Register extends React.Component {
  formRef = React.createRef();
  state = {
    role: "applicant",
    loading: false,
    gender: "na",
    education_level: "UNDER_GRADUATE",
  };

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onChangeGender = (e) => {
    this.setState({ gender: e });
  };

  onChangeEducation = (e) => {
    this.setState({ education_evel: e });
  };

  handleRadioOnChange = (e) => {
    this.setState({
      role: e.target.value,
    });
  };

  handleRegister = async () => {
    const formInstance = this.formRef.current;

    try {
      await formInstance.validateFields();
    } catch (error) {
      return;
    }

    this.setState({
      loading: true,
    });

    let credentials = formInstance.getFieldsValue(true);
    if (this.state.role === "applicant") {
      credentials.skill = credentials.skill.toUpperCase().split(",");
      if (!credentials.certification) credentials.certification = [];
      else credentials.certification = credentials.certification.split(",");
    } else {
      delete credentials["skill"];
      delete credentials["certification"];
    }
    credentials.gender = this.state.gender;
    credentials.education_level = this.state.education_level;

    try {
      const resp = await register(credentials, this.state.role);
      message.success("Register Successfully");
      this.props.handleRegisterSuccess(resp.token, this.state.role);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <div style={{ width: 800, margin: "20px auto" }}>
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
        <Form
          onFinish={this.handleRegister}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
          labelWrap
          ref={this.formRef}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  let reg =
                    /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                  if (!reg.test(value))
                    return Promise.reject("Please check your email format");
                  return Promise.resolve();
                },
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
                required: true,
                message: "Please input your name!",
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
                validator: (_, value) => {
                  if (value.length < 6)
                    return Promise.reject(
                      "The password should include more than than 6 letters and numbers"
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
              },
            ]}
          >
            <Input.Password
              disabled={this.state.loading}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: false,
                message: "Please select your gender",
              },
            ]}
          >
            <Select defaultValue="na" onChange={this.onChangeGender}>
              <Option value="female">Female</Option>
              <Option value="male">Male</Option>
              <Option value="na">Prefer not to specify</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Education Level" name="education_level">
            <Select
              defaultValue="UNDER_GRADUATE"
              onChange={this.onChangeEducation}
            >
              <Option value="HIGH_SCHOOL">High School</Option>
              <Option value="UNDER_GRADUATE">Undergraduate</Option>
              <Option value="GRADUATE">Graduate</Option>
              <Option value="PHD">PhD</Option>
            </Select>
          </Form.Item>

          {this.state.role === "applicant" && (
            <Form.Item
              name="skill"
              label="Required Skills (Separate each skill with comma)"
              rules={[
                { required: true },
                {
                  pattern: /^(([a-zA-Z0-9][\s]?(,)?)*)+$/,
                  message:
                    "Separate each skill with comma, no space after comma, no special character",
                },
              ]}
            >
              <Input.TextArea
                placeholder="eg. Web Scraping,Machine learning,Java"
                autoSize={{ minRows: 2, maxRows: 3 }}
              />
            </Form.Item>
          )}
          {this.state.role === "applicant" && (
            <Form.Item
              name="certification"
              label="Certifications (Separate each certification with comma)"
              rules={[{ required: false }]}
            >
              <Input.TextArea
                placeholder="eg. ACM,publications"
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
            </Form.Item>
          )}
        </Form>
        <Space style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={this.handleRegister}
            disabled={this.state.loading}
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
          <Button
            onClick={this.props.handleNeedLogin}
            disabled={this.state.loading}
          >
            Take Me to Login
          </Button>
        </Space>
      </div>
    );
  }
}

export default Register;
