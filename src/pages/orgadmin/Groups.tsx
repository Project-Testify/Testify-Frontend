import { GroupTable, PageHeader } from '../../components';
import { BankOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Space, Modal, Form, Input, Upload, message, FormInstance } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd';

import { createGroup } from '../../api/services/group';
import {  UploadChangeParam } from 'antd/es/upload';

export const Groups = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { data: examsData } = useFetchData('../mocks/Groups.json');
  const [examTabsKey, setExamTabKey] = useState<string>('all');
  const [emails, setEmails] = useState<string[]>([]);


  // file
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);


  const EXAM_TABS_CONTENT: Record<string, React.ReactNode> = {
    all: <GroupTable key="all-groups-table" data={examsData} />,
  };

  const onTabChange = (key: string) => {
    setExamTabKey(key);
  };

  // set file list
  const handleFileUpload = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
  
    // Process each file as it is uploaded
    info.fileList.forEach((file) => {
      if ( file.originFileObj) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const content = e.target?.result as string;
          const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
          const foundEmails = content.match(emailRegex) || [];
          setEmails(prevEmails => [...prevEmails, ...foundEmails]);
          console.log(foundEmails);
          message.success(`${file.name} file uploaded successfully`);
        };
        reader.readAsText(file.originFileObj as Blob);
      }
    });
  };

  const submit = (form: FormInstance) => {
    form.validateFields().then(values => {
      console.log(values);
      console.log(fileList);
      setUploading(true);
      const group = {
        name: values.name,
        description: values.description,
        emails: emails
      }
      createGroup(group).then(res => {
        console.log(res);
        message.success('Group created successfully');
        setUploading(false);
        setOpen(false);
      }).catch(err => {
        console.log(err);
        message.error('Failed to create group');
        setUploading(false);
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
        // onOk={() => submit(form)}
        onCancel={() => setOpen(false)}
        footer={(_, {  CancelBtn }) => (
          <>
            <CancelBtn />
            <Button loading={uploading} onClick={() => submit(form)} type="primary">
              Create
            </Button>
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
            <Upload beforeUpload={() => false} onChange={handleFileUpload} fileList={fileList} multiple>
              <Button icon={<UploadOutlined />}>Upload Email List</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>


    </div>
  );
};
