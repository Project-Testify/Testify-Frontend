import { Button, Input, Form, Space, Card, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { saveGrades, fetchGrades, updateGrades } from '../../api/services/ExamServices';

const AddGrading = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const examId = sessionStorage.getItem('examId'); // Get examId from session storage
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchGradings = async () => {
    try {
      setLoading(true);
      const response = await fetchGrades(Number(examId));
      console.log(response);
      if (response.data) {
        form.setFieldsValue({ gradingLevels: response.data });
        setIsUpdating(true);
      }
      setLoading(false);
    } catch (error) {
      message.error('Failed to load grading levels.');
      setLoading(false);
    }
  };

  // UseEffect to load initial grading levels
  useEffect(() => {
    if (examId) {
      fetchGradings();
    }
  }, [examId]);


  const onFinish = async (values: any) => {
    try {
      const gradingLevels = values.gradingLevels.map((level: any) => ({
        gradingString: level.grade,
        minMarks: level.minMarks,
        maxMarks: level.maxMarks,
      }));

      const response = isUpdating
        ? await updateGrades(Number(examId), gradingLevels)
        : await saveGrades(Number(examId), gradingLevels);

      if (response.data.success) {
        message.success(isUpdating ? 'Grading levels updated successfully!' : 'Grading levels submitted successfully!');
      } else {
        message.error('Failed to submit/update grading levels.');
      }
    } catch (error) {
      message.error('Failed to submit grading levels.');
    }
  };

  return (
    <Card title="Add Grading Levels" style={{ margin: '20px auto', width: '100%' }}>
      <Form form={form} name="grading-form" onFinish={onFinish} autoComplete="off">
        <Form.List name="gradingLevels">
          {(fields: any[], { add, remove }: { add: () => void; remove: (name: number) => void }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'minMarks']}
                    rules={[{ required: true, message: 'Please enter minimum marks' }]}
                  >
                    <Input placeholder="Min Marks" type="number" style={{ backgroundColor: '#fff', border: '1px solid #1890ff', borderRadius: '4px' }} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'maxMarks']}
                    rules={[{ required: true, message: 'Please enter maximum marks' }]}
                  >
                    <Input placeholder="Max Marks" type="number" style={{ backgroundColor: '#fff', border: '1px solid #1890ff', borderRadius: '4px' }} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'grade']}
                    rules={[{ required: true, message: 'Please enter a grade' }]}
                  >
                    <Input placeholder="Grade (A, B, C, Pass, Fail)" style={{ backgroundColor: '#fff', border: '1px solid #1890ff', borderRadius: '4px' }} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Grading Level
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
            {isUpdating ? 'Update Gradings' : 'Set Gradings'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddGrading;
