import React from "react";
import { message, Tabs, List, Card, Button, Tooltip, Space, Modal } from "antd";

import { InfoCircleOutlined } from "@ant-design/icons";
// import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Text from "antd/lib/typography/Text";
import ApplicantListPage from "./ApplicantListPage";
import {
  getJobsByEmployer,
  getApplicationsByJob,
  closeJob,
} from "../utilsTest";
// import { deleteJob } from "../utils";

const { Meta } = Card;

const { TabPane } = Tabs;

class ViewApplicantsButton extends React.Component {
  //   const navigate = useNavigate();

  //   const navigateToApplicants = () => {
  //     navigate("/applicants", { replace: true });
  //   };

  //   const navigateToJobs = () => {
  //     navigate("/");
  //   };

  onClick = () => {
    this.props.showApplications(this.props.id);
  };

  render() {
    return (
      // <div>
      //   {/* <ul>
      //             <li>
      //                 <Link to ="/applicants">
      //                     View Applicants
      //                 </Link>
      //             </li>
      //         </ul> */}
      //   <button onClick={navigateToApplicants}>View Applicants</button>
      //   <Routes>
      //     <Route path="/applicants" element={<ApplicantListPage />} />
      //   </Routes>
      // </div>
      <Button onClick={this.onClick}>View Applicants</Button>
    );
  }
}

// export class ApplicantDetailInfoButton extends React.Component {
//   state = {
//     modalVisible: false,
//   };

//   openModal = () => {
//     this.setState({
//       modalVisible: true,
//     });
//   };

//   handleCancel = () => {
//     this.setState({
//       modalVisible: false,
//     });
//   };

//   render() {
//     const { applicant } = this.props;
//     const { name, skills, education, certification, jobId } = applicant;
//     const { modalVisible } = this.state;
//     return (
//       <>
//         <Tooltip title="View Applicant Details">
//           <Button
//             onClick={this.openModal}
//             style={{ border: "none" }}
//             size="large"
//             icon={<InfoCircleOutlined />}
//           />
//         </Tooltip>
//         {modalVisible && (
//           <Modal
//             title={name}
//             centered={true}
//             visible={modalVisible}
//             closable={false}
//             footer={null}
//             onCancel={this.handleCancel}
//           >
//             <Space direction="vertical">
//               <Text strong={true}>Skills</Text>
//               <Text type="secondary">{skills}</Text>
//               <Text strong={true}>Education</Text>
//               <Text type="secondary">{education}</Text>
//               <Text strong={true}>Certification</Text>
//               <Text type="secondary">{certification}</Text>
//               <Text strong={true}>Job ID</Text>
//               <Text type="secondary">{jobId}</Text>
//             </Space>
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

// export class JobDetailInfoButton extends React.Component {
//     state = {
//         modalVisible: false,
//     };

//     openModal = () => {
//         this.setState({
//             modalVisible: true,
//         });
//     };

//     handleCancel = () => {
//         this.setState({
//             modalVisible: false,
//         });
//     };

//     render() {
//         const { job } = this.props;
//         const { job_name, job_type, job_number } = job;
//         const { modalVisible } = this.state;
//         return (
//             <>
//                 <Tooltip title="View Job Details">
//                     <Button
//                         onClick={this.openModal}
//                         style={{ border: "none" }}
//                         size="large"
//                         icon={<InfoCircleOutlined />}
//                     />
//                 </Tooltip>
//                 {modalVisible && (
//                     <Modal
//                         title={job_name}
//                         centered={true}
//                         visible={modalVisible}
//                         closable={false}
//                         footer={null}
//                         onCancel={this.handleCancel}
//                     >
//                         <Space direction="vertical">
//                             <Text strong={true}>Job Name</Text>
//                             <Text type="secondary">{job_name}</Text>
//                             <Text strong={true}>Job Type</Text>
//                             <Text type="secondary">{job_type}</Text>
//                             <Text strong={true}>Job Number</Text>
//                             <Text type="secondary">{job_number}</Text>
//                         </Space>
//                     </Modal>
//                 )}
//             </>
//         );
//     }

// }

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
      await closeJob(job.id);
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
                  showApplications={this.props.showApplications}
                />,
                <RemoveJobButton job={item} onRemoveSuccess={this.loadData} />,
              ]}
            >
              <Meta title="Description" description={item.description} />
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
    return <ApplicantListPage jobID={this.state.jobID} />;
  };

  render() {
    return (
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="Posted Jobs" key="1">
          {this.renderPage()}
        </TabPane>
        <TabPane tab="Post A New Job" key="2">
          <div>Upload Stays</div>
        </TabPane>
      </Tabs>
    );
  }
}
export default EmployerHomePage;
