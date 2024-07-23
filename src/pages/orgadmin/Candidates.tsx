import { CandidatesTable, PageHeader } from '../../components';
import { BankOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Space, Modal, Form, Input } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';

export const Candidates = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { data: candidatesData } = useFetchData('../../../mocks/CandidatesMock.json');
  const [examTabsKey, setExamTabKey] = useState<string>('all');

  const EXAM_TABS_CONTENT: Record<string, React.ReactNode> = {
    all: <CandidatesTable key="all-groups-table" data={candidatesData} />,
  };

  const onTabChange = (key: string) => {
    setExamTabKey(key);
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
                <span>Group</span>
              </>
            ),
          },
          {
            title: (
              <>
                <BankOutlined />
                <span>Group 1</span>
              </>
            ),
          }
        ]}
      />
      <Col span={24}>
        <Card
          extra={
            <Space>
              <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>
                New Candidate
              </Button>
            </Space>
          }
          activeTabKey={examTabsKey}
          onTabChange={onTabChange}
          style={{ backgroundColor: '#fff' }}
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
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Missing Email' }]}
>


  <Input placeholder="Email" />
</Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ message: 'Missing Name' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        

        </Form>
      </Modal>
    </div>
  );
};
