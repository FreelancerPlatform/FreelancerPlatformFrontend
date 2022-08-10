import React from "react";
import { message, List, Typography, Button, Card } from "antd";
//import { getApplications, withdrawApplication } from "../utils";
import { getApplications, withdrawApplication } from "../utilsTest";

const { Text } = Typography;

class WithdrawButton extends React.Component {
    state = {
        loading: false,
    };

    handleWithdrawApplication = async () => {
        const { application_ID, onWithdrawSuccess } = this.props;
        this.setState({
            loading: true,
        });

        try {
            await withdrawApplication(application_ID);
            message.success("Withdrawal Successful!");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }

        onWithdrawSuccess();
    };

    render() {
        return (
            <Button
                loading={this.state.loading}
                onClick={this.handleWithdrawApplication}
                danger={true}
                shape="round"
                type="primary"
            >
                Withdraw
            </Button>
        );
    }
}

class ApplicantViewApplicationsPage extends React.Component {
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
            const resp = await getApplications();
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

    displayStatus(status) {
        if (status === "PENDING") return (
            <Text type="warning">{status}</Text>
        );
        else if (status === 'HIRED') return (
            <Text type="success">{status}</Text>
        );
        else if (status === 'REJECTED') return (
            <Text type="danger">{status}</Text>
        );
        else if (status === 'CLOSED') return (
            <Text disabled>{status}</Text>
        );
        else return (
            <Text>{status}</Text>
        );
    }

    render() {
        return(
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
                            key={item.application_ID}
                            title={
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        {item.job_name}
                                    </Text>
                                </div>
                            }
                            extra={item.status === "PENDING" && <WithdrawButton onWithdrawSuccess={this.loadData} application_ID={item.application_ID} />}
                        >
                        {this.displayStatus(item.status)}
                        </Card>
                    </List.Item>
                )}
            />
        );
    }

}

export default ApplicantViewApplicationsPage;