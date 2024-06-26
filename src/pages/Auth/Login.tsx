import React from "react";
import { Button, Form, type FormProps, Input } from "antd";
import { useLoginMutation } from "../../features/api/authApi";
import { addUserInfo } from "../../features/services/auth/authSlice";
import { useDispatch } from "react-redux";

type FieldType = {
  email?: string;
  password?: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const response = await login(values);
    const { data } : any = 'data' in response ? response.data : null;
    dispatch(addUserInfo(data));
    window.location.href = "/dashboard";
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-lg-7 bg-dark"></div>
        <div className="col-12 col-lg-5 d-flex flex-column justify-content-center vh-100 p-5">
          <div className="h3 mb-3">Login</div>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            <Form.Item className=" text-end ">
              <Button type="primary" htmlType="submit" size="large">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
