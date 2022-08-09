import {
  Button,
  Tooltip,
  Space,
  Modal,
  Tag,
} from "antd";
import {
  InfoCircleOutlined,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";

class JobDetailInfoButton extends React.Component {
    state = {
        modalVisible: false,
    };

    openModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        const { job } = this.props;
        const { job_name, content, location, salary, job_type, skills } = job;
        const { modalVisible } = this.state;

        return (
            <>
                <Tooltip title="View Job Details">
                    <Button 
                        onClick = {this.openModal}
                        style={{ border: "none" }}
                        size="large"
                        icon={<InfoCircleOutlined />}
                    />
                </Tooltip>
                {modalVisible && (
                    <Modal
                        title={job_name}
                        centered={true}
                        visible={modalVisible}
                        closable={false}
                        footer={null}
                        onCancel={this.handleCancel}
                    >
                        <Space direction="vertical">
                            <Text italic mark>{job_type}</Text>
                            <Text strong={true}>Description</Text>
                            <Text type="secondary">{content}</Text>
                            <Text strong={true}>Skills</Text>
                            <Text>
                                {skills.map(skill => <Text code>{skill}</Text>)}
                            </Text>
                            <Text strong={true}>Location</Text>
                            <Text type="secondary">{location}</Text>
                            <Text strong={true}>Salary</Text>
                            <Text type="secondary">{salary}</Text>
                        </Space>
                    </Modal>
                )}
            </>
        );
    }
}

export default JobDetailInfoButton;