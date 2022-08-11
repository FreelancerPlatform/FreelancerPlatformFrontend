import { message, Button, Tooltip, Space, Modal } from "antd";
import { InfoCircleOutlined, } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
//import { getJobById } from "../utils";
import { getJobById } from "../utilsTest";

class JobDetailInfoButton extends React.Component {
    state = {
        loading: false,
        modalVisible: false,
        jobInfo: {},
    };

    openModal = () => {
        this.setState({
            modalVisible: true,
            loading: true,
        });
        this.loadData(this.props.jobID);
    };

    loadData = async (jobID) => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getJobById(jobID);
            this.setState({
                jobInfo: resp,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
            
        }
    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        const { job_name, content, location, salary, email, job_type, skill } = this.state.jobInfo;
        const { loading, modalVisible } = this.state;

        return (
            <>
                <Tooltip title="View Job Details">
                    <Button 
                        onClick={this.openModal}
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
                            {/* <Text italic>{job_type}</Text> */}
                            <Text strong={true}>Description</Text>
                            <Text type="secondary">{content}</Text>
                            <Text strong={true}>Required Skills</Text>
                            {<Text>
                                {skill?.map(s => <Text code>{s}</Text>)}
                            </Text>}
                            <Text strong={true}>Location</Text>
                            <Text type="secondary">{location}</Text>
                            <Text strong={true}>Salary</Text>
                            <Text type="secondary">{salary + " $/mo"}</Text>
                            {/* <Text strong={true}>Employer Email</Text>
                            <Text type="secondary">{email}</Text> */}
                        </Space>
                    </Modal>
                )}
            </>
        );
    }
}

export default JobDetailInfoButton;