import { HomeOutlined, BankOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Modal, Space, Table, Tabs } from "antd";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import { JSXElementConstructor, ReactElement, ReactNode, useEffect, useState } from "react";
import { addExamSetterService } from "../../api/services/organization";
import { getLoggedInUser } from "../../utils/authUtils";
import TabPane from "antd/es/tabs/TabPane";

export const orgAdminExamSetters = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [examSetterEmail, setExamSetterEmail] = useState("");
  const [invitations, setInvitations] = useState<{ email: string; invitationLink: string; accepted: boolean }[]>([]);
  const [examSetters, setExamSetters] = useState<{ name: string; email: string; }[]>([]);

  const handleAddExamSetter = async () => {
    setLoading(true);
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
      message.error("You must be logged in to perform this action.");
      setLoading(false);
      return;
    }

    const organizationId = loggedInUser.id;

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

  useEffect(() => {
    setInvitations([
      { email: 'invite1@example.com', invitationLink: 'http://invite.link/1', accepted: false },
      { email: 'invite2@example.com', invitationLink: 'http://invite.link/2', accepted: true },
    ]);

    setExamSetters([
      { name: 'John Doe', email: 'john.doe@example.com' },
      { name: 'Jane Smith', email: 'jane.smith@example.com' },
    ]);
  }, []);

  const columnsInvitations = [
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Invitation Link', dataIndex: 'invitationLink', key: 'invitationLink', render: (text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined) => <a href={text}>{text}</a> },
    { title: 'Accepted', dataIndex: 'accepted', key: 'accepted', render: (accepted: any) => (accepted ? "Yes" : "No") },
  ];

  const columnsExamSetters = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
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
