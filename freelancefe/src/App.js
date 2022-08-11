import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPages";
import EmployerHomePage from "./components/EmployerHomePage";
import ApplicantListPage from "./components/ApplicantListPage";
import { Routes, Route, Router, BrowserRouter } from 'react-router-dom';
import TestPage from "./components/TestPage";

const { Header, Content } = Layout;

class App extends React.Component {
  state = {
    authed: false,
    asEmployer: false,
  };

  componentDidMount() {
    //const authToken = localStorage.getItem("authToken");
    const asEmployer = localStorage.getItem("asEmployer") === "true";
    this.setState({
      //authed: authToken !== null,
      asEmployer,
    });
  }

  handleLoginSuccess = (asEmployer) => {
    //localStorage.setItem("authToken", token);
    localStorage.setItem("asEmployer", asEmployer);
    this.setState({
      //authed: true,
      asEmployer,
    });
  };

  handleLogOut = () => {
    //localStorage.removeItem("authToken");
    localStorage.removeItem("asEmployer");
    this.setState({
      authed: false,
    });
  };

  renderContent = () => {
    //if (!this.state.authed) {
    //  return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    //}

    //if (this.state.asEmployer) {
    return <EmployerHomePage />;
    //}

    // return <div>applicant home page</div>;
  };

  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            laiFreelancer
          </div>
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
            <Routes>
              <Route path="/" element={<this.renderContent />} />
              <Route path="/applicants" element={<ApplicantListPage />} />
            </Routes>
        </Content>

      </Layout>
    );
  }

}

export default App;
