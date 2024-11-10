import { HomeOutlined, BankOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Modal, Space, Table, Tabs } from "antd";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import {  useEffect, useState } from "react";
import { addExamSetterService, getExamSetters, getInvitations } from "../../api/services/organization";
import { getLoggedInUser } from "../../utils/authUtils";
import TabPane from "antd/es/tabs/TabPane";
import { AxiosResponse } from "axios";

export const OrgAdminExamSetters = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [examSetterEmail, setExamSetterEmail] = useState("");
  const [invitations, setInvitations] = useState([]);
  const [examSetters, setExamSetters] = useState([]);

  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error("You must be logged in to perform this action.");
    setLoading(false);
    return;
  }
  const organizationId = loggedInUser.id;
  
  const handleAddExamSetter = async () => {
    setLoading(true);
    try {
      const response = await addExamSetterService(organizationId, { email: examSetterEmail });
      console.log(response.data);
      if (response.data.success) {
        message.success(response.data.message || "Exam setter invited successfully!");
        setOpen(false);
        setExamSetterEmail("");
      } else {
        message.error(response.data.message || "Failed to invite exam setter. Please try again.");
      }
    } catch (error) {
      message.error("Failed to invite exam setter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchExamSetters = async () =>{
    try{
      const response : AxiosResponse = await getExamSetters(organizationId);
      setExamSetters(response.data);
    }catch{
      console.log('Error fetching Exam Setters');
    }
  }

  const fetchInvitations = async () =>{
    try{
      const response : AxiosResponse = await getInvitations(organizationId);
      setInvitations(response.data);
    }catch{
      console.log("Error fetching Exam setter invitations");
    }
  }

  useEffect(()=>{
    fetchExamSetters()
    fetchInvitations()
  },[organizationId]);



  // useEffect(() => {
  //   setInvitations([
  //     { email: 'invite1@example.com', invitationLink: 'http://invite.link/1', accepted: false },
  //     { email: 'invite2@example.com', invitationLink: 'http://invite.link/2', accepted: true },
  //   ]);

  //   setExamSetters([
  //     { name: 'John Doe', email: 'john.doe@example.com' },
  //     { name: 'Jane Smith', email: 'jane.smith@example.com' },
  //   ]);
  // }, []);

  const columnsInvitations = [
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Invitation Link', dataIndex: 'invitationLink', key: 'invitationLink', render: (text: string ) => <a href={text}>{text}</a> },
    { title: 'Accepted', dataIndex: 'isAccepted', key: 'isAccepted', render: (accepted: any) => (accepted ? "Yes" : "No") },
  ];

  const columnsExamSetters = [
    { title: 'Name', render: (record: any) => `${record.firstName} ${record.lastName}`, key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
  ];

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Exam Setters'}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <BankOutlined />
                <span>Exam Setters</span>
              </>
            ),
          },
        ]}
      />

      <Col span={24}>
        <Card
          extra={
            <Space>
              <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                Add Exam Setter
              </Button>
            </Space>
          }
        >
          
          <Tabs defaultActiveKey="1">
            <TabPane tab="Invitations" key="1">
              <Table columns={columnsInvitations} dataSource={invitations} rowKey="email" />
            </TabPane>
            <TabPane tab="Exam Setters" key="2">
              <Table columns={columnsExamSetters} dataSource={examSetters} rowKey="email" />
            </TabPane>
          </Tabs>
        </Card>
      </Col>

      <Modal
        title="New Exam Setter"
        open={open}
        onOk={handleAddExamSetter}
        onCancel={() => setOpen(false)}
        confirmLoading={loading}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleAddExamSetter}>
            Invite
          </Button>,
        ]}
      >
        <Input
          placeholder="Exam Setter Email"
          value={examSetterEmail}
          onChange={(e) => setExamSetterEmail(e.target.value)}
        />
      </Modal>
    </div>
  );
};
