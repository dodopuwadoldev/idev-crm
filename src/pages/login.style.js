import styled from "styled-components";

export const BodyLogin = styled.html`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FormStyle = styled.div`
  border: 1px solid #757575;
  box-shadow: 0px 0px 0px 0.902027px rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: 50px;
  color: #000;
  background: rgba(255, 255, 255, 0.12);
  text-align: center;
  form {
    .ant-input {
      height: 50px;
      width: 360px;
      border: 1px solid #000;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
      color: #000;
      display: inline-flex;
    }
    span.ant-input-suffix {
      margin-left: 100px;
    }
    span.ant-input-affix-wrapper {
      height: 50px;
      width: 360px;
      border: 1px solid #000;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
      display: inline-flex;
    }

    .ant-input-password .ant-input {
      height: 40px;
      border: none;
      border-radius: 0;
      background: rgba(0, 0, 0, 0);
      color: #000;
    }
    ::placeholder {
      color: #000;
    }
    .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
    .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover {
      background: rgba(0, 0, 0, 0.2);
      color: #000;
    }
    .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
    .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
      background: rgba(0, 0, 0, 0.2);
      color: #000;
    }
    .ant-form-item-explain-error {
      text-align: start;
      margin-left: 80px;
    }
  }
`;

export const Title = styled.p`
  font-weight: 400;
  font-size: 24px;
  color: #000;
`;

export const Headers = styled.h1`
  padding-top: 80px;
  font-weight: 400;
  font-size: 48px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  img {
    width: 176px;
    height: auto;
    position: fixed;
    left: 70px;
    top: 20px;
  }
`;

export const BtnLogin = styled.button`
  margin-top: 25px;
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 30px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  :hover {
    background-color: #23c483;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  :active {
    transform: translateY(-1px);
  }
`;

export const TextWrong = styled.p`
  color: #ff4d4f;
  width: 360px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
`;
