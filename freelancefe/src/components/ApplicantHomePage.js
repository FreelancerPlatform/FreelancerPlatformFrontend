import React from "react";
import { message, Tabs, List, Typography, Button, Card } from "antd";
import JobDetailInfoButton from "./JobDetailInfoButton";
//import { getJobsByType, getJobRecommendations, createApplication } from "../utils";
import { getJobsByType, getJobRecommendations, createApplication } from "../utilsTest";

const { TabPane } = Tabs;
const { Text } = Typography;

class ApplyButton extends React.Component {
    state = {
        loading: false,
    };

    handleSubmit = async () => {
        const { jobID } = this.props.job;
        this.setState({
            loading: true,
        });

        try {
            await createApplication(jobID);
            message.success("Application Submitted");
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
                onClick={this.handleSubmit}
                shape="round"
                type="primary"
            >
                Apply
            </Button>
        );
    }
}

class DisplayJobsByType extends React.Component {
    state = {
        data: [],
        loading: false,
    };

    componentDidMount() {
        this.loadData(this.props.job_type);
    }

    loadData = async (type) => {
        this.setState({
            loading: true,
        });

        let resp;
        try {
            if (type === "recommendation") {
                resp = await getJobRecommendations();
            } else {
                resp = await getJobsByType(type);
            }
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
                style={{ marginTop: 20 }}
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
                renderItem={(item) => ( item.status === "PUBLIC" &&
                    <List.Item>
                        <Card
                            key={item.jobID}
                            title={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.job_name}
                                    </Text>
                                    <JobDetailInfoButton jobID={item.jobID} />
                                </div>
                            }
                            extra={<ApplyButton job={item} />}
                        >
                            <Text italic>{item.content}</Text>
                            <br></br><br></br>
                            <Text>
                                <Text strong>Location: </Text>{item.location}
                            </Text>
                            <br></br>
                            <Text>
                                <Text strong>Salary: </Text>{item.salary + " $/hr"}
                            </Text>
                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}

class ApplicantHomePage extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="2" destroyInactiveTabPane={true} centered>
                <TabPane tab="All Openings" key="1">
                    <DisplayJobsByType job_type=""/>
                </TabPane>
                <TabPane tab="Recommendations" key="2">
                    <DisplayJobsByType job_type="recommendation"/>
                </TabPane>
                <TabPane tab="Technology" key="3">
                    <DisplayJobsByType job_type="TECHNOLOGY"/>
                </TabPane>
                <TabPane tab="Health" key="4">
                    <DisplayJobsByType job_type="HEALTH"/>
                </TabPane>
                <TabPane tab="Consulting" key="5">
                    <DisplayJobsByType job_type="CONSULTING"/>
                </TabPane>
                <TabPane tab="Design" key="6">
                    <DisplayJobsByType job_type="DESIGN"/>
                </TabPane>
                <TabPane tab="Education" key="7">
                    <DisplayJobsByType job_type="EDUCATION"/>
                </TabPane>
                <TabPane tab="Business" key="8">
                    <DisplayJobsByType job_type="BUSINESS"/>
                </TabPane>
                <TabPane tab="Language" key="9">
                    <DisplayJobsByType job_type="LANGUAGE"/>
                </TabPane>
            </Tabs>
        );
    }
}

export default ApplicantHomePage;