import logo from './logo.svg';
import { Layout } from "antd";
import React from "react";
import ApplicantHomePage from './components/ApplicantHomePage';
import ApplicantViewApplicationsPage from './components/ApplicantViewApplicationsPage';

const { Content, Header } = Layout;

class App extends React.Component{

  renderContent = () => {
    // if (!this.state.authed) {
    //   return <div>login page</div>;
    // }
 
    // if (this.state.asHost) {
    //   return <div>host home page</div>;
    // }
 
    return <ApplicantHomePage />;
    // return <ApplicantViewApplicationsPage />;
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
            Freelance Platform
          </div>
          
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", margin: 20, overflow: "auto" }}
        >
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}


export default App;
