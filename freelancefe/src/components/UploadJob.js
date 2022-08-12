import React from "react";
import { Form, Input, InputNumber, Button, message, Select} from "antd";
import { uploadJob } from "../utils";
const { Option } = Select;
 
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
 
class UploadJob extends React.Component {
  state = {
    loading: false,
  };
 
  // fileInputRef = React.createRef();
 
  handleSubmit = async (values) => {
    const formData = new FormData();
    // const { files } = this.fileInputRef.current;
 
    // if (files.length > 5) {
    //   message.error("You can at most upload 5 pictures.");
    //   return;
    // }
 
    // for (let i = 0; i < files.length; i++) {
    //   formData.append("images", files[i]);
    // }
 
    formData.append("job_name", values.job_name);
    formData.append("location", values.location);
    formData.append("salary", values.salary);
    formData.append("job_type", values.job_type); 
    formData.append("skill", values.skill.toUpperCase().split(','));
    formData.append("content", values.content);

 
    this.setState({
      loading: true,
    });
    try {
      await uploadJob(formData);
      message.success("upload successfully");
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
      <Form
        {...layout}
        name="nest-messages"
        onFinish={this.handleSubmit}
        //It is a callback function that is triggered after submitting the form and verifying data successfully.
        style={{ maxWidth: 1000, margin: "auto" }}
      >
        <Form.Item name="job_name" 
          label="Job Name" 
          rules={[
            { required: true },
            {
              pattern: /^(([a-zA-Z0-9][\s]?)*)+$/,
              message: 'can only include letters and numbers and at most one space between characters',
            },
            ]}>
          <Input placeholder="Input Job Name"/>
        </Form.Item>
        <Form.Item name="location" label="Location" rules={[{ required: false }]}>
          <Input placeholder="Input the job location"/>
        </Form.Item>
        <Form.Item
          name="salary"
          label="Salary(Dollars per hour)"
          rules={[
            { required: false, 
              type: 'integer',
              min: 1,
              max: 1000,
              message: 'Please input a valid Integer between 1 and 1000', },
              ]}
        >
          <InputNumber placeholder="eg. 45"/>
        </Form.Item>
        <Form.Item name="job_type" label="Type" rules={[{ required: true }]}>
            <Select placeholder="Select Job Type">
              <Option value="TECHNOLOGY">TECHNOLOGY</Option>
              <Option value="HEALTH">HEALTH</Option>
              <Option value="CONSULTING">CONSULTING</Option>
              <Option value="DESIGN">DESIGN</Option>
              <Option value="EDUCATION">EDUCATION</Option>
              <Option value="BUSINESS">BUSINESS</Option>
              <Option value="LANGUAGE">LANGUAGE</Option>
            </Select>
        </Form.Item>
        <Form.Item name="skill" 
          label="Required Skills(Separate each skill with comma)" 
          rules={[
            { required: true },
            {
              pattern: /^(([a-zA-Z0-9][\s]?(,)?)*)+$/,
              message: 'Separate each skill with comma, no space after comma, no special character',
            }
            ]}>
          <Input.TextArea placeholder="eg. Web Scraping,Machine learning,Java" autoSize={{ minRows: 2, maxRows: 3 }} />
        </Form.Item>
        <Form.Item
          name="content"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Input your job description" autoSize={{ minRows: 4, maxRows: 6 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 15}}>
          <Button type="primary" htmlType="submit" size='large' shape="round" loading={this.state.loading}>
            Post
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
 
export default UploadJob;