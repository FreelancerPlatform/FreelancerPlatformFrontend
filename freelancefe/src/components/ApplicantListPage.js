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
//import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Text from "antd/lib/typography/Text";
import React from "react";
import { getJobsByEmployer, getApplicationsByJob, closeJob, getProfile } from "../utilsTest";
import Title from "antd/lib/skeleton/Title";
//import { deleteJob } from "../utils";


class HireButton extends React.Component {
    state = {
        loading: false,
    };

    handleRemoveJob = async () => {
        const { applicants, hireSuccess, jobs } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await closeJob(this.props.applicants.jobID);
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
        loading: false,
        modalVisible: false,
        applicantInfo: {},
    };

    openModal = () => {
        this.setState({
            modalVisible: true,
            loading: true,
        });
        this.loadData(this.props.email);
    };

    loadData = async (email) => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getProfile(email);
            this.setState({
                applicantInfo: resp,
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
        const { applicantInfo } = this.state;
        const { email, name, gender, education_level, certification, skill, rate } = applicantInfo;
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
                            {<Text>
                                {skill?.map(s => <Text code>{s}</Text>)}
                            </Text>}
                            <Text strong={true}>Education</Text>
                            <Text type="secondary">{education_level}</Text>
                            <Text strong={true}>Certification</Text>
                            {<Text>
                                {certification?.map(s => <Text type="secondary">{s}</Text>)}
                            </Text>}
                            <Text strong={true}>Rate</Text>
                            <Text type="secondary">{rate}</Text>
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
            const resp = await getApplicationsByJob(this.props.jobID);
            //resp = [...this.state.applicants];
            this.setState({
                applicants: resp
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
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 3,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={applicants}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.application_ID}
                            title={

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.applicant_name}
                                    </Text>
                                    <ApplicantDetailInfoButton applicants={item} />
                                </div>
                            }
                            actions={[
                                //<ViewApplicantsButton job={item} />,
                                <HireButton job={item} hireSuccess={this.loadData} />
                            ]}
                        >
                            {/* <Meta
                                title="Description"
                                description={item.description}
                            /> */}

                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}

class ApplicantListPage extends React.Component {

    render() {
        const { jobs } = this.props.jobID;
        return (
            <div>
                <h1>
                    Job ID: {this.props.jobID}
                </h1>
                <ApplicantList jobID={this.props.jobID} />
            </div>
        );
    }
}

export default ApplicantListPage;