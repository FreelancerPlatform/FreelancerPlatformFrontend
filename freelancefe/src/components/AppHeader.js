import React from "react";
import { Layout, Menu, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

class AppHeader extends React.Component {
  applicantMenu = (
    <Menu
      theme="dark"
      mode="horizontal"
      disabledOverflow="true"
      onClick={this.props.flipPage}
    >
      <Menu.Item key="search">Job Search</Menu.Item>
      <Menu.Item key="applications">My Applications</Menu.Item>
      <Menu.Item key="logout">Log Out</Menu.Item>
    </Menu>
  );

  employerMenu = (
    <Menu
      theme="dark"
      mode="horizontal"
      disabledOverflow="true"
      onClick={this.props.flipPage}
    >
      <Menu.Item key="jobs">Posted Jobs</Menu.Item>
      <Menu.Item key="add">Post A New Job</Menu.Item>
      <Menu.Item key="logout">Log Out</Menu.Item>
    </Menu>
  );

  renderMenu = () => {
    if (this.props.asEmployer) {
      return this.employerMenu;
    }
    return this.applicantMenu;
  };

  render() {
    const { authed } = this.props;
    return (
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
          FreeLaunch
        </Text>

        {authed && this.renderMenu()}
      </Header>
    );
  }
}
export default AppHeader;
