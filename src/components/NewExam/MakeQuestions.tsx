import { Modal, Form, Button, Upload, message, UploadFile, Space } from 'antd';
import { useState } from 'react';
import { AddQuestion, QuestionsListCard } from '../../components';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFiles } from '../../api/services/AIAssistant';

export const MakeQuestions = () => {
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFiles = (info: any) => {
    setFileList(info.fileList.filter((file: UploadFile) => !!file.originFileObj));
  };

  const handleUpload = async () => {
    const files = fileList.map((file) => file.originFileObj as File);
    const examId = 'example-exam-id';
    if (files.length > 0) {
      try {
        const response = await uploadFiles(files, examId);
        message.success('Files uploaded successfully');
        setFileList([]);
      } catch (error) {
        message.error('Failed to upload files');
      }
    }
  };

  const [form] = Form.useForm();

  const handleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={handleModal}>Upload Content</Button>
        <Button type="primary" onClick={handleModal}>Add Question</Button>
      </Space>
      <Modal
        open={open}
        title="Upload Content"
        onOk={handleUpload}
        onCancel={handleModal}
      >
        <Form form={form}>
          <Form.Item name="upload" label="Upload">
            <Upload beforeUpload={() => false} onChange={handleFiles} fileList={fileList} multiple>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <QuestionsListCard />
    </>
  );
};
