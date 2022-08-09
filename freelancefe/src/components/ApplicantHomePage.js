import React from "react";
import { 
  message,
  Tabs,
  List,
  Typography,
  Button,
  Card,
} from "antd";
import JobDetailInfoButton from "./JobDetailInfoButton";
import { getJobsByType, getJobRecommendations, createApplication } from "../utils";

const { TabPane } = Tabs;
const { Text } = Typography;

class ApplyButton extends React.Component {
    state = {
        loading: false,
    };

    handleSubmit = async () => {
        const { job_ID } = this.props.job;
        this.setState({
            loading: true,
        });

        try {
            await createApplication(job_ID);
            message.success("Application Submitted");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
        // How does the UI change for jobs already applied to? disable button
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
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            key={item.job_ID}
                            title={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.job_name}
                                    </Text>
                                    <JobDetailInfoButton job={item} />
                                </div>
                            }
                            extra={<ApplyButton job={item} />}
                        >
                            <p>{item.job_tye}</p>
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
            <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
                <TabPane tab="Recommendations" key="1">
                    <DisplayJobsByType job_type="recommendation"/>
                </TabPane>
                <TabPane tab="Job Type 1" key="2">
                    <DisplayJobsByType job_type="TECHNOLOGY"/>
                </TabPane>
            </Tabs>
        );
    }
}

export default ApplicantHomePage;