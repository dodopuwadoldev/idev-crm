import { useState, useContext } from "react";
import { Form, Input, message } from "antd";
import {
  FormStyle,
  Title,
  BodyLogin,
  BtnLogin,
  TextWrong,
} from "./login.style";
import { Login } from "../service/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Loginform() {
  const [text, setText] = useState(false);
  const { setUser, user } = useContext(UserContext)
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const data = { password: values?.password, username: values?.username };
    const res = await Login('/login', data);
    if (res?.data?.code === 200) {
      console.log('user', user)
      setText(false);
      navigate("/");
      window.location.reload();
    } else if (res?.status === 422 || res?.status === 401) {
      setText(true);
    }
  };

  const onFinishFailed = (errorInfo) => { };
  const stylesIcons = {
    width: "60px",
    fontSize: "60px",
    opacity: "0.8",
  };

  return (
    <BodyLogin>
      <FormStyle>
        <Title>
          {/* <img src={IconUser} alt="Icon" style={stylesIcons} /> */}
          <br />
          <p style={{ margin: "10px" }}>LOG IN</p>
        </Title>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
              {
                max: 100,
                message: "Characters must not exceed 100",
              },
              {
                pattern: new RegExp(/^[A-Za-z@0-9ก-๙ ]*$/g),
                message: "Format is wrong",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Password must have at least 8 characters",
              },
              {
                pattern: new RegExp(/^[A-Za-z0-9 ]*$/g),
                message: "Format is wrong",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {text && <TextWrong>Invalid username or password !</TextWrong>}
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 14,
            }}
          >
            <BtnLogin type="primary" htmlType="submit" className="btn-save">
              LOG IN
            </BtnLogin>
          </Form.Item>
        </Form>
      </FormStyle>
    </BodyLogin>
  );
}

export default Loginform;
