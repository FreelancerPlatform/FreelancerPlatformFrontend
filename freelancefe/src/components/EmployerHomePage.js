import React from "react";

import { message, List, Card, Button } from "antd";

import Text from "antd/lib/typography/Text";
import ApplicantListPage from "./ApplicantListPage";
// import {
//   getJobsByEmployer,
//   getApplicationsByJob,
//   closeJob,
// } from "../utilsTest";
import { getJobsByEmployer, closeJob } from "../utils";

const { Meta } = Card;

class ViewApplicantsButton extends React.Component {
  onClick = () => {
    this.props.showApplications(this.props.id);
  };

  render() {
    return <Button onClick={this.onClick}>View Applicants</Button>;
  }
}

class RemoveJobButton extends React.Component {
  state = {
    loading: false,
  };

  handleRemoveJob = async () => {
    const { jobID, onRemoveSuccess } = this.props;
    this.setState({
      loading: true,
    });

    try {
      await closeJob(jobID);
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
              key={item.jobID}
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text ellipsis={true} style={{ maxWidth: 150 }}>
                    {item.job_name}
                  </Text>
                  <hr />
                  <Text>Job ID: {item.jobID}</Text>
                </div>
              }
              actions={[
                <ViewApplicantsButton
                  id={item.jobID}
                  // name={item.job_name}
                  showApplications={this.props.showApplications}
                />,
                item.status !== "CLOSED" && (
                  <RemoveJobButton
                    jobID={item.jobID}
                    onRemoveSuccess={this.loadData}
                  />
                ),
              ]}
            >
              <Meta title="Description" description={item.content} />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

class EmployerHomePage extends React.Component {
  state = {
    displayJobs: true,
    jobID: "0",
  };

  showApplications = (id) => {
    this.setState({
      displayJobs: false,
      jobID: id,
    });
  };

  renderPage = () => {
    if (this.state.displayJobs) {
      return <MyJobs showApplications={this.showApplications} />;
    }
    return (
      <ApplicantListPage
        jobID={this.state.jobID}
        onTabClick={this.onTabClick}
      />
    );
  };

  onTabClick = () => {
    this.setState({
      displayJobs: true,
    });
  };

  render() {
    return <>{this.renderPage()}</>;
  }
}
export default EmployerHomePage;
