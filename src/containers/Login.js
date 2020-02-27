import React from "react";
import "../styles/mainstyles.css";
import logo from "../placeholder.svg";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
import { Auth } from "aws-amplify";

async function SignIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
      // Confirm the temporary password as the confirmed password
      await Auth.completeNewPassword(
        user, // the Cognito User Object
        password // the "new" password
      ).then((window.location.href = "/list"));
    } else {
      // The user directly signs in
      console.log(user);
      window.location.href = "/list";
    }
  } catch (err) {
    console.log(err);
  }
}

const FormItem = Form.Item;
class LoginPage extends React.Component {
  signIn = async (user, pass) => {
    try {
      SignIn(user, pass);
      console.log("Success");
      this.props.userHasAuthenticated(true);
      // window.location.href = "/";
    } catch (e) {
      console.log(e.message);
      alert(
        "Incorrect username or password. Please check credentials and try again."
      );
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
