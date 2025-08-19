import { Button, Typography, Flex } from "antd";
import React from "react";
import { FilePdfOutlined } from "@ant-design/icons";
const Header = ({ username, dataAPI, title }) => {
  return (
    <Flex wrap="wrap" align="center" justify="space-between" className="my-5">
      <Typography.Title
        level={3}
        style={{ color: "#000000", width: "80%", lineHeight: "1.5" }}
        className="my-5 "
      >
        {title}
      </Typography.Title>
      <Button icon={<FilePdfOutlined />} className="bg-red-500 text-white">
        Download
      </Button>
    </Flex>
  );
};

export default Header;
