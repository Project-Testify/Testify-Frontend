import { GroupTable, PageHeader } from '../../components';
import { BankOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Space, Modal, Form, Input, Upload, message, FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd';

import { createGroup, getGroups } from '../../api/services/group';
import {  UploadChangeParam } from 'antd/es/upload';
import { Group } from '../../types';
import  { AxiosResponse } from 'axios';

export const Groups = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [groups, setGroups] = useState<Group[]>([]);
  // const {  groupData } = groups;
  const [examTabsKey, setExamTabKey] = useState<string>('all');
  const [emails, setEmails] = useState<string[]>([]);
  
  // file
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const organizationId = sessionStorage.getItem('organizationId');

  // const EXAM_TABS_CONTENT: Record<string, React.ReactNode> = {
  //   all: <GroupTable key="all-groups-table" data={groups} />,
  // };

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
      //console.log(values);
      //console.log(fileList);
      setUploading(true);
      const group = {
        name: values.name,
        emails: emails
      }
      createGroup(group, Number(organizationId)).then(res => {
        console.log(res);
        message.success('Group created successfully');
        setUploading(false);
        setOpen(false);
        fetchGroups();
      }).catch(err => {
        console.log(err);
        message.error('Failed to create group');
        setUploading(false);
      })

    }).catch(err => {
      console.log(err);
    })
  }

    const fetchGroups = async () => {
      try{
        const response : AxiosResponse =  await getGroups(Number(organizationId));
        setGroups(response.data);
      } catch(err){
        console.log("error fetching candidate groups");
      }
    }

    useEffect(() => {
      fetchGroups();
    }, [organizationId]);
  

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
          {/* {EXAM_TABS_CONTENT[examTabsKey]} */}
          <GroupTable data={groups} fetchGroups={fetchGroups}/>
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
