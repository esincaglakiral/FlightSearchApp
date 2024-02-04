import React, { useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

import icon from "../assets/images/flight.png";
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />

        <Typography.Title level={2} className="logo">
          <Link to="/">Flight Search Application</Link>
        </Typography.Title>
        {/* <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button> */}
      </div>
      {activeMenu && (
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="search" icon={<SearchOutlined />}>
            <Link to="/search">Search</Link>
          </Menu.Item>
          <Menu.Item key="booking" icon={<FileSearchOutlined />}>
            <Link to="/booking">Booking</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
