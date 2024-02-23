import React, { useState } from 'react';
import { Layout, Form, Input, Button, Menu, Card, DatePicker, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const ProfilePage = () => {
  const [selectedKey, setSelectedKey] = useState('profile');

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Handle form submission here
  };

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderProfileContent = (key) => {
    switch (key) {
      case 'profile':
        return (
          <Card title="Thông tin cá nhân">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true ,message: "nhap di"  }]}>
                <Input placeholder="Nhập họ và tên của bạn" />
              </Form.Item>
              <Form.Item label="Ngày tháng năm sinh" name="dob ">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="fullName" rules={[{ required: true, message:"nhap di bro"}]}>
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item label="Mô tả" name="bio">
                <TextArea rows={3} placeholder="Nói một chút về bản thân bạn" />
              </Form.Item>

              
              
              <Form.Item>
                <Button type="primary" htmlType="submit">Cập nhật hồ sơ</Button>
              </Form.Item>
            </Form>
          </Card>
        );
      case 'security':
        return (
          <Card title="Bảo mật">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Mật khẩu hiện tại" name="currentPassword" rules={[{ required: true }]}>
                <Input.Password placeholder="Nhập mật khẩu hiện tại" />
              </Form.Item>
              <Form.Item label="Mật khẩu mới" name="newPassword" rules={[{ required: true }]}>
                <Input.Password placeholder="Nhập mật khẩu mới" />
              </Form.Item>
              <Form.Item label="Xác nhận mật khẩu mới" name="confirmNewPassword" rules={[{ required: true }]}>
                <Input.Password placeholder="Xác nhận mật khẩu mới" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Đổi mật khẩu</Button>
              </Form.Item>
            </Form>
          </Card>
        );
      case 'notifications':
        return (
          <Card title="Cài đặt thông báo">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="Thông báo email" name="emailNotifications" valuePropName="checked">
                <Select defaultValue="subscribed">
                  <Option value="subscribed">Đăng kí</Option>
                  <Option value="unsubscribed">Hủy đăng kí</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Cập nhật thông báo</Button>
              </Form.Item>
            </Form>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>Hồ sơ</Menu.Item>
          <Menu.Item key="security" icon={<LockOutlined />}>Bảo mật</Menu.Item>
          <Menu.Item key="notifications" icon={<MailOutlined />}>Thông báo</Menu.Item>
          {/* Add more Menu.Items here if needed */}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          {renderProfileContent(selectedKey)}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Input, Button, DatePicker } from 'antd';
// import moment from 'moment';

// const Profile = () => {
//     const [profile, setProfile] = useState(null);

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const { data } = await axios.get('/api/profile', {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//                 });
//                 setProfile(data);
//             } catch (error) {
//                 console.error('Failed to fetch profile', error);
//                 // Handle error
//             }
//         };

//         fetchProfile();
//     }, []);

//     const onFinish = async (values) => {
//         try {
//             await axios.put('/api/profile', {
//                 ...values,
//                 dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
//             }, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//             });
//             // Handle success
//         } catch (error) {
//             console.error('Failed to update profile', error);
//             // Handle error
//         }
//     };

//     return profile ? (
//         <Form initialValues={{ ...profile, dateOfBirth: moment(profile.dateOfBirth) }} onFinish={onFinish}>
//             <Form.Item name="email" label="Email">
//                 <Input />
//             </Form.Item>
//             <Form.Item name="fullname" label="Full Name">
//                 <Input />
//             </Form.Item>
//             <Form.Item name="dateOfBirth" label="Date of Birth">
//                 <DatePicker />
//             </Form.Item>
//             <Form.Item>
//                 <Button type="primary" htmlType="submit">Update Profile</Button>
//             </Form.Item>
//         </Form>
//     ) : (
//         <div>Loading...</div>
//     );
// };

// export default Profile;