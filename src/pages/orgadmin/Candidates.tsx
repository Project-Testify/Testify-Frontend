import { CandidatesTable, PageHeader } from '../../components';
import { BankOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Space, Modal, Form, Input, FormInstance, message } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { addCandidateToGroup } from '../../api/services/group';

export const Candidates = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  //const { data: candidatesData } = useFetchData('../../../mocks/CandidatesMock.json');
  const [examTabsKey, setExamTabKey] = useState<string>('all');
  const location = useLocation();
  const { candidates } = location.state || {};
  const {group} = location.state || {};
  //const { fetchGroups} = location.state || {};

  const onTabChange = (key: string) => {
    setExamTabKey(key);
  };

  const submit = (form: FormInstance) => {
    form.validateFields().then(values => {
      addCandidateToGroup(values.name, values.email,group.id).then(res=> {
        console.log(res);
        message.success('candidate added succefully');
        setOpen(false);
      }).catch(err => {
        message.error('failed to add candidate');
        console.log(err);
      })

    }).catch(err => {
      console.log(err);
    })
  }


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
                <span>{group.name}</span>
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
          <CandidatesTable candidates={candidates} groupId={group.id}  />
        </Card>
      </Col>
      <Modal
        title="Add New Candidate"
        open={open}
        //onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button  onClick={() => submit(form)} type="primary">
              Add
            </Button>
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
