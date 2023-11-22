import React, { useState, useContext } from "react";
import { Button, Checkbox, Form, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { Login } from "../service/auth";

const App = () => {
  const [text, setText] = useState(false);
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const data = { password: values?.password, username: values?.username };
    const res = await Login("/login", data);

    if (res?.data?.code === 200) {
      setText(false);
      navigate("/");
      window.location.reload();
    } else if (res?.status === 422 || res?.status === 401) {
      setText(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card style={{ width: "40%" }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {text && (
            <p style={{ color: "red" }}>Invalid username or password!</p>
          )}
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default App;
