import React from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { uploadJob } from "../utils";
 
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
    formData.append("skills", values.skills);
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
        <Form.Item name="job_name" label="Job Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="location" label="Location" rules={[{ required: false }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="salary"
          label="Salary(Unit: K)"
          rules={[{ required: false, type: "number", min: 0.1 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name="job_type" label="Type" rules={[{ required: true }]}>
            <Select placeholder="Select Job Type">
              <Option value="SDE">SDE</Option>
              <Option value="Data Engineer">Data_Engineer</Option>
              <Option value="Product Manager">Product_manager</Option>
            </Select>
        </Form.Item>
        <Form.Item name="skills" label="Required Skills" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 15 }}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            Post
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
 
export default UploadJob;
