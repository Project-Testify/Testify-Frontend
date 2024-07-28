import { HomeOutlined, BankOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Modal, Space, Typography } from "antd";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import { useState } from "react";
import { addExamSetterService } from "../../api/services/organization";
import { getLoggedInUser } from "../../utils/authUtils";

export const orgAdminExamSetters = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [examSetterEmail, setExamSetterEmail] = useState("");

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
          {/* Content for exam setters */}
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