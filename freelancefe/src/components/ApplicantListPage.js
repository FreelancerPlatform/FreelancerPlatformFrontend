import {
  message,
  List,
  Card,
  Button,
  Tooltip,
  Space,
  Modal,
  InputNumber,
  Form,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import {
  getApplicationsByJob,
  getProfile,
  hireApplicant,
  rateApplicant,
} from "../utils";

class HireButton extends React.Component {
  state = {
    loading: false,
  };

  handleHire = async () => {
    const { application_ID, hireSuccess } = this.props;
    this.setState({
      loading: true,
    });

    try {
      await hireApplicant(application_ID);
      message.success("Successfully hired the applicant!");
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
        onClick={this.handleHire}
        shape="round"
        type="primary"
      >
        Hire
      </Button>
    );
  }
}

class RateButton extends React.Component {
  state = {
    loading: false,
    modalVisible: false,
    rating: 5,
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

  handleScoreChange = (e) => {
    let num = Math.max(0, Math.min(5, Math.round(e)));
    this.setState({
      rating: num,
    });
  };

  handleRate = async () => {
    const { application_ID, rateSuccess } = this.props;
    this.setState({
      loading: true,
    });

    try {
      await rateApplicant(application_ID, this.state.rating);
      message.success("Successfully rated the applicant!");
      rateSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
        modalVisible: false,
      });
    }
  };

  render() {
    const { loading, modalVisible } = this.state;
    return (
      <>
        <Tooltip title="Rate Applicant">
          <Button onClick={this.openModal} shape="round" type="primary">
            Rate
          </Button>
        </Tooltip>
        {modalVisible && (
          <Modal
            title="Please rate the freelancer: "
            centered={true}
            loading={loading}
            visible={modalVisible}
            closable={false}
            onCancel={this.handleCancel}
            onOk={this.handleRate}
          >
            <Space direction="vertical">
              <Form>
                <Form.Item
                  name="score"
                  label="Score"
                  rules={[
                    {
                      required: false,
                      type: "integer",
                      min: 1,
                      max: 5,
                      message: "Please input a valid Integer between 1 and 5",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={5}
                    defaultValue={5}
                    precision={0}
                    // pattern="[0-9]*"
                    onChange={this.handleScoreChange}
                  />
                </Form.Item>
              </Form>
            </Space>
          </Modal>
        )}
      </>
    );
  }
}

class ApplicantDetailInfoButton extends React.Component {
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
    const { email, name, gender, educationLevel, certification, skill, rate } =
      applicantInfo;
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
              <Text strong={true}>Email</Text>
              <Text type="secondary">{email}</Text>
              <Text strong={true}>Skills</Text>
              {
                <Text>
                  {skill?.map((s) => (
                    <Text code>{s}</Text>
                  ))}
                </Text>
              }
              <Text strong={true}>Education</Text>
              <Text type="secondary">{educationLevel}</Text>
              <Text strong={true}>Certification</Text>
              {
                <Text>
                  {certification?.map((s) => (
                    <Text type="secondary">{s + " "}</Text>
                  ))}
                </Text>
              }
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

  displayStatus(status) {
    if (status === "PENDING") return <Text type="warning">{status}</Text>;
    else if (status === "HIRED") return <Text type="success">{status}</Text>;
    else if (status === "REJECTED") return <Text type="danger">{status}</Text>;
    else if (status === "CLOSED") return <Text disabled>{status}</Text>;
    else return <Text>{status}</Text>;
  }

  displayButton(status, application_ID) {
    if (status === "PENDING")
      return (
        <HireButton
          application_ID={application_ID}
          hireSuccess={this.loadData}
        />
      );
    if (status === "HIRED")
      return (
        <RateButton
          application_ID={application_ID}
          rateSuccess={this.loadData}
        />
      );
  }

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
              key={item.applicationID}
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text ellipsis={true} style={{ maxWidth: 150 }}>
                    {item.applicantName}
                  </Text>
                  <ApplicantDetailInfoButton email={item.email} />
                </div>
              }
              actions={[this.displayButton(item.status, item.applicationID)]}
            >
              {this.displayStatus(item.status)}
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

class ApplicantListPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Job ID: {this.props.jobID}</h1>
        <ApplicantList jobID={this.props.jobID} />
        <Button onClick={this.props.onTabClick}>Return to Job List</Button>
      </div>
    );
  }
}

export default ApplicantListPage;
