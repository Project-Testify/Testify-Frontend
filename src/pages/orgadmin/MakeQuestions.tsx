import { UploadOutlined } from "@ant-design/icons";
import { UploadFile, UploadProps, message, Space, Button, Modal, Upload, Divider } from "antd";
import { useState } from "react";
import { Form } from "antd";
import { uploadFiles } from "../../api/services/AIAssistant";
import { AddQuestion, QuestionsListCard } from "../../components";

const MakeQuestions = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const showModal = () => {
    setOpen(true);
  };

  const showContentModal = () => {
    setContentModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(() => {
      setOpen(false);
      // send to database http://localhost:8080/api/v1/exam/1/addQuestion
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setContentModalOpen(false);
    form.resetFields();
  };

  const handleFiles: UploadProps['onChange'] = (info) => {
    console.log(info);
    setFileList(info.fileList.filter(file => !!file.originFileObj));
  };

  const handleUpload = async () => {
    const files = fileList.map(file => file.originFileObj as File);
    const examId = 'example-exam-id'; // This should be dynamically fetched or set
    console.log('Uploading files:', files);
    if (files.length > 0) {
      uploadFiles(files, examId).then(response => {
        console.log('Files uploaded successfully:', response);
        setFileList([]);
        message.success('Files uploaded successfully');
        handleCancel();
      }).catch(error => {
        console.error('Failed to upload files:', error);
        message.error('Failed to upload files');
      });
    }
  };

  return (
    <>
      <Space
        align="end"
        style={{
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Button type="primary" onClick={showContentModal}>
          Upload Content
        </Button>

        <Button type="primary" onClick={showModal}>
          Add Question
        </Button>

        <Modal
          open={contentModalOpen}
          title="Upload Content"
          onOk={handleUpload}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form}>
            <Form.Item name="upload" label="Upload">
              <Upload
                beforeUpload={() => false}
                onChange={handleFiles}
                fileList={fileList}
                multiple={true}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          width={1100}
          open={open}
          title="Add Question"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form}>
            <AddQuestion form={form} />
          </Form>
        </Modal>
      </Space>

      <Divider />
      <QuestionsListCard />
    </>
  );
};

// Exporting the component to use in other parts of the app
export default MakeQuestions;
