import logo from "./logo.svg";
import { Layout } from "antd";
import React from "react";
import ApplicantHomePage from "./components/ApplicantHomePage";
import EmployerHomePage from "./components/EmployerHomePage";
import ApplicantViewApplicationsPage from "./components/ApplicantViewApplicationsPage";
import ApplicantListPage from "./components/ApplicantListPage";
import LoginPage from "./components/LoginPage";
import AppHeader from "./components/AppHeader";
import UploadJobPage from "./components/UploadJob";

const { Content, Footer } = Layout;

class App extends React.Component {
  state = {
    authed: true,
    asEmployer: false,
    pageKey: "",
  };

  // componentDidMount() {
  //   const authToken = localStorage.getItem("authToken");
  //   const asHost = localStorage.getItem("asHost") === "true";
  //   this.setState({
  //     authed: authToken !== null,
  //     asHost,
  //   });
  // }

  handleLoginSuccess = (token, asHost) => {
    // localStorage.setItem("authToken", token);
    // localStorage.setItem("asHost", asHost);
    this.setState({
      authed: true,
      asHost,
    });
  };

  flipPage = (page) => {
    this.setState({
      pageKey: page.key,
    });
    if (page.key === "logout")
      this.setState({
        authed: false,
      });
  };

  renderContent = () => {
    if (!this.state.authed) {
      return <LoginPage />;
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
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("asHost");
    this.setState({
      authed: false,
    });
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <AppHeader
          authed={this.state.authed}
          asEmployer={this.state.asEmployer}
          flipPage={this.flipPage}
          handleLogOut={this.handleLogOut}
        />
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {this.renderContent()}
        </Content>
        <Footer style={{ textAlign: "center", padding: "0 0" }}>
          FreeLaunch ©2022
        </Footer>
      </Layout>
    );
  }
}

export default App;
