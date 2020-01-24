import React from "react";
import "../styles/mainstyles.css";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "antd/dist/antd.css";
// import { Auth } from "aws-amplify";

const FormItem = Form.Item;
class LoginPage extends React.Component {

  checkUsername = (rule, value, callback) => {
    const form = this.props.form;
    form.setFields({
      username: {
        value: "email"
      }
    });
    form.setFieldsValue("email");
  };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     await Auth.signIn(this.state.username, this.state.password);
  //     alert("Logged in!!")
  //   } catch (err) {
  //     alert(err)
  //   }
  // }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          alert('Received values of form: ', values);
        } else {
          alert(err)
        }
      });
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <div className="login-container">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" },
                  { validator: this.checkUsername }
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
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginPage);

export default WrappedNormalLoginForm;
