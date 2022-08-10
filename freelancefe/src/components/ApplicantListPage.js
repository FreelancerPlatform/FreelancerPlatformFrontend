import {
    message,
    Tabs,
    List,
    Card,
    Button,
    Tooltip,
    Space,
    Modal,
} from "antd";
import {
    InfoCircleOutlined,
} from "@ant-design/icons";
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Text from "antd/lib/typography/Text";
import React from "react";
import { getJobsByEmployer, getApplicantsByJob } from "../utilsTest";
import { deleteJob } from "../utils";

const { Meta } = Card;

const { TabPane } = Tabs;

class HireButton extends React.Component {
    state = {
        loading: false,
    };

    handleRemoveJob = async () => {
        const { applicants, hireSuccess } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await deleteJob(this.props.applicants.jobId);
            hireSuccess();
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
            <Button
                loading={this.state.loading}
                onClick={this.handleRemoveJob}
                danger={true}
                shape="round"
                type="primary"
            >
                Hire
            </Button>
        );
    }

}


export class ApplicantDetailInfoButton extends React.Component {
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
        const { applicant } = this.props;
        const { name, skills, education, certification, jobId } = applicant;
        const { modalVisible } = this.state;
        return (
            <>
                <Tooltip title="View Applicant Details">
                    <Button
                        onClick={this.openModal}
                        style={{ border: "none" }}
                        size="large"
                        icon={<InfoCircleOutlined />}
                    />
                </Tooltip>
                {modalVisible && (
                    <Modal
                        title={name}
                        centered={true}
                        visible={modalVisible}
                        closable={false}
                        footer={null}
                        onCancel={this.handleCancel}
                    >
                        <Space direction="vertical">
                            <Text strong={true}>Skills</Text>
                            <Text type="secondary">{skills}</Text>
                            <Text strong={true}>Education</Text>
                            <Text type="secondary">{education}</Text>
                            <Text strong={true}>Certification</Text>
                            <Text type="secondary">{certification}</Text>
                            <Text strong={true}>Job ID</Text>
                            <Text type="secondary">{jobId}</Text>
                        </Space>
                    </Modal>
                )}
            </>
        );
    }

}

class ApplicantList extends React.Component {
    state = {
        loading: false,
        applicants: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getApplicantsByJob(this.props.jobId);
            this.setState({
                applicants: resp,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const { loading, applicants } = this.state;

        return (
            <List
                loading={loading}
                dataSource={applicants}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.name}
                            title={

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.name}
                                    </Text>
                                    <ApplicantDetailInfoButton applicants={item} />
                                </div>
                            }
                            actions={[
                                //<ViewApplicantsButton job={item} />,
                                <HireButton job={item} hireSuccess={this.loadData} />
                            ]}
                        >
                            <Meta
                                title="Description"
                                description={item.description}
                            />

                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}

class ApplicantListPage extends React.Component {
    

    render() {
        const {jobs} = this.props;
        return (
            <div>
                <ApplicantList />
            </div>
        );
    }

}

export default ApplicantListPage;
