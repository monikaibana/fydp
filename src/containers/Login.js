import React from "react";
import "../styles/mainstyles.css";
import logo from "../placeholder.svg";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports.js";
Amplify.configure(awsconfig);

const FormItem = Form.Item;
class LoginPage extends React.Component {
  signIn = async (user, pass) => {
    try {
      await Auth.signIn(user, pass);
      console.log("Success");
      this.props.userHasAuthenticated(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.signIn(values.user, values.password);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <div className="login-container">
          <img src={logo} alt="logo"></img>
          <h1> BlueBook </h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("user", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="Username"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your password!" }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
                {/* TODO: add link to href  */}
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                href="/list"
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
        {/* <Routes /> */}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginPage);

export default WrappedNormalLoginForm;
