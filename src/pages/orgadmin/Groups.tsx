import { GroupTable, PageHeader } from '../../components';
import { BankOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Space, Modal, Form, Input, Upload, message } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import { UploadOutlined } from '@ant-design/icons';

export const Groups = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { data: examsData } = useFetchData('../mocks/Groups.json');
  const [examTabsKey, setExamTabKey] = useState<string>('all');

  const EXAM_TABS_CONTENT: Record<string, React.ReactNode> = {
    all: <GroupTable key="all-groups-table" data={examsData} />,
  };

  const onTabChange = (key: string) => {
    setExamTabKey(key);
  };

  const handleFileUpload = (info: any) => {
    const { status, originFileObj } = info.file;

    if (status !== 'uploading') {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                const content = e.target.result as string;
                // Process the file content here
                console.log(content);
                // You can parse the content to extract emails and update the form state if needed
            }
        };
        reader.readAsText(originFileObj);
    }

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title="Groups"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>Home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <BankOutlined />
                <span>Groups</span>
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
                New Group
              </Button>
            </Space>
          }
          activeTabKey={examTabsKey}
          onTabChange={onTabChange}
          // style={{ backgroundColor: '#fff' }}
        >
          {EXAM_TABS_CONTENT[examTabsKey]}
        </Card>
      </Col>
      <Modal
        title="New Group"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Missing Name' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Missing Description' }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email List"
            rules={[{ required: true, message: 'Missing Email List' }]}
          >
            <Upload beforeUpload={() => false} onChange={handleFileUpload}>
              <Button icon={<UploadOutlined />}>Upload Email List</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
