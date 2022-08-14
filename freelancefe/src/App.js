import logo from "./logo.svg";
// import { Canvas, useFrame } from "@react-three/fiber";
import { Layout } from "antd";
import React from "react";
import ApplicantHomePage from "./components/ApplicantHomePage";
import EmployerHomePage from "./components/EmployerHomePage";
import ApplicantViewApplicationsPage from "./components/ApplicantViewApplicationsPage";
import AppHeader from "./components/AppHeader";
import UploadJobPage from "./components/UploadJob";
import Login from "./components/Login";
import Register from "./components/Register";
import WelcomePage from "./components/WelcomePage";

const { Content, Footer } = Layout;

class App extends React.Component {
  state = {
    welcome: true,
    authed: false,
    registered: true,
    asEmployer: false,
    pageKey: "",
  };

  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asEmployer = localStorage.getItem("asEmployer") === "true";
    this.setState({
      authed: authToken !== null,
      asEmployer,
    });
  }

  onClickWelcome = () => {
    this.setState({
      welcome: false,
    });
  };

  handleLoginSuccess = (token, asEmployer) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asEmployer", asEmployer);
    this.setState({
      authed: true,
      asEmployer,
    });
  };

  handleRegisterSuccess = (token, role) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("asEmployer", role === "employer");
    this.setState({
      registered: true,
      authed: true,
      asEmployer: role === "employer",
    });
  };

  handleNeedRegister = () => {
    this.setState({
      registered: false,
    });
  };

  handleNeedLogin = () => {
    this.setState({
      registered: true,
    });
  };

  flipPage = (page) => {
    this.setState({
      pageKey: page.key,
    });
    if (page.key === "logout") this.handleLogOut();
  };

  renderContent = () => {
    if (this.state.welcome) {
      return <WelcomePage onClick={this.onClickWelcome} />;
    }
    if (!this.state.registered) {
      return (
        <Register
          handleLoginSuccess={this.handleRegisterSuccess}
          handleNeedLogin={this.handleNeedLogin}
        />
      );
    }

    if (!this.state.authed) {
      return (
        <Login
          handleLoginSuccess={this.handleLoginSuccess}
          handleNeedRegister={this.handleNeedRegister}
        />
      );
    }

    if (!this.state.asEmployer) {
      if (this.state.pageKey === "applications")
        return <ApplicantViewApplicationsPage />;
      return <ApplicantHomePage />;
    }

    if (this.state.pageKey === "add") return <UploadJobPage />;
    return <EmployerHomePage />;
  };

  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asEmployer");
    this.setState({
      authed: false,
    });
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <AppHeader
          welcome={this.state.welcome}
          authed={this.state.authed}
          asEmployer={this.state.asEmployer}
          flipPage={this.flipPage}
          handleLogOut={this.handleLogOut}
        />
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {this.renderContent()}
          {/* <WelcomePage /> */}
        </Content>
        <Footer style={{ textAlign: "center", padding: "0 0" }}>
          FreeLaunch ©2022
        </Footer>
      </Layout>
    );
  }
}

export default App;
