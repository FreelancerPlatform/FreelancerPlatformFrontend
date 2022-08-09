import React from "react";
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

import {InfoCircleOutlined} from "@ant-design/icons";
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import Text from "antd/lib/typography/Text";
import React from "react";
import { getJobsByEmployer,getApplicantsByJob } from "../utilsTest";
import { deleteJob } from "../utils";

const {Meta} = Card;

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
                loading={this.state.loading}
                dataSource={this.state.applicants}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.name}
                            title={

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.name}
                                    </Text>
                                    <ApplicantDetailInfoButton applicants={item}/>
                                </div>
                            }
                            actions={[
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

export function ViewApplicantsButton() {
    const navigate = useNavigate();

    const navigateToApplicants=() => {
        navigate('/applicants');
    };

    const navigateToJobs=() => {
        navigate('/');
    };

    return (
        <div>
            <button onClick={navigateToApplicants}>
                View Applicants
            </button>
            <Routes>
                <Route path="/applicants" element={<ApplicantList />} />                                
            </Routes>
        </div>
    );
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

class RemoveJobButton extends React.Component {
    state = {
        loading: false,
    };

    handleRemoveJob = async () => {
        const { job, onRemoveSuccess } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await deleteJob(job.id);
            onRemoveSuccess();
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
                Close
            </Button>
        );
    }

}


class MyJobs extends React.Component {
    state = {
        loading: false,
        data: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getJobsByEmployer();
            this.setState({
                data: resp,
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
        return (
            <List
                loading={this.state.loading}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 3,
                    md: 3,
                    lg: 3,
                    xl: 4,
                    xxl: 4,
                }}
                dataSource={this.state.data}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.jobId}
                            title={

                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.name}
                                    </Text>
                                    <hr />
                                    <Text>
                                        Job ID: {item.jobId}
                                    </Text>
                                </div>
                            }
                            actions={[
                                <ViewApplicantsButton job={item} />,
                                <RemoveJobButton job={item} onRemoveSuccess={this.loadData} />
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


class EmployerHomePage extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
                <TabPane tab="Posted Jobs" key="1">
                    <MyJobs />
                </TabPane>
                <TabPane tab="Post A New Job" key="2">
                    <div>Upload Stays</div>
                </TabPane>
            </Tabs>
        );
    }
}

export default EmployerHomePage;
