import { useState, useEffect } from 'react';
import { Card, Select, InputNumber, Form, Button, message } from 'antd';
import { updateOrder, getExamOrder } from '../../api/services/ExamServices';
import { AxiosResponse } from 'axios';

const { Option } = Select;

interface OrderResponse {
  orderType: string;
  value: number | null;
}

interface OrderChangeRequest {
  orderType: string;
  value: number;
}

const SequenceHandling = () => {
  const [sequenceType, setSequenceType] = useState<string | null>(null);
  const [fixedQuestions, setFixedQuestions] = useState<number | null>(null);
  const [randomQuestions, setRandomQuestions] = useState<number | null>(null);
  const [form] = Form.useForm();
  const examId = sessionStorage.getItem('examId'); // Get examId from session storage

  useEffect(() => {
    // Fetch the existing order when the component mounts
    getExamOrder(Number(examId))
      .then((response: AxiosResponse<OrderResponse>) => {
        const { orderType, value } = response.data;
        if (orderType) {
          setSequenceType(orderType.toLowerCase());
          if (orderType === 'FIXED') {
            setFixedQuestions(value);
            form.setFieldsValue({ sequenceType: 'fixed', fixedQuestions: value });
          } else if (orderType === 'RANDOM') {
            setRandomQuestions(value);
            form.setFieldsValue({ sequenceType: 'random', randomQuestions: value });
          }
        }
      })
      .catch((error) => {
        console.error('Failed to fetch existing order:', error);
        message.error('Failed to fetch existing order.');
      });
  }, [examId, form]);

  const handleSequenceChange = (value: string) => {
    setSequenceType(value);
    setFixedQuestions(null);
    setRandomQuestions(null);
    form.resetFields(['fixedQuestions', 'randomQuestions']); // Reset fields when switching between options
  };

  const handleSubmit = () => {
    if (sequenceType === 'fixed' && fixedQuestions !== null) {
      const orderChangeRequest: OrderChangeRequest = {
        orderType: 'FIXED',
        value: fixedQuestions,
      };
      updateOrder(Number(examId), orderChangeRequest)
        .then(() => {
          message.success(`Fixed sequence updated with ${fixedQuestions} fixed questions.`);
        })
        .catch((error) => {
          console.error('Failed to update order:', error);
          message.error('Failed to update order.');
        });
    } else if (sequenceType === 'random' && randomQuestions !== null) {
      const orderChangeRequest: OrderChangeRequest = {
        orderType: 'RANDOM',
        value: randomQuestions,
      };
      updateOrder(Number(examId), orderChangeRequest)
        .then(() => {
          message.success(`Random sequence updated with ${randomQuestions} random questions.`);
        })
        .catch((error) => {
          console.error('Failed to update order:', error);
          message.error('Failed to update order.');
        });
    } else {
      message.error('Please complete the form before submitting.');
    }
  };

  return (
    <Card title="Sequence Handling" style={{ margin: '20px auto', maxWidth: 600 }}>
      <Form form={form}>
        <Form.Item
          name="sequenceType"
          label="Question Sequence Type"
          rules={[{ required: true, message: 'Please select a sequence type!' }]}
        >
          <Select placeholder="Select sequence type" onChange={handleSequenceChange}>
            <Option value="fixed">Fixed Order</Option>
            <Option value="random">Random Order</Option>
          </Select>
        </Form.Item>

        {sequenceType === 'fixed' && (
          <>
            <Form.Item
              name="fixedQuestions"
              label="Number of Fixed Questions"
              rules={[{ required: true, message: 'Please enter how many first questions should be fixed' }]}
            >
              <InputNumber
                min={1}
                max={100}
                value={fixedQuestions}
                onChange={(value) => setFixedQuestions(value)} // Update state
                placeholder="Enter number"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </>
        )}

        {sequenceType === 'random' && (
          <>
            <Form.Item
              name="randomQuestions"
              label="Number of Random Questions"
              rules={[{ required: true, message: 'Please enter how many questions should be random' }]}
            >
              <InputNumber
                min={1}
                max={100}
                value={randomQuestions}
                onChange={(value) => setRandomQuestions(value)} // Update state
                placeholder="Enter number"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Button type="primary" onClick={handleSubmit} style={{ width: '100%' }}>
            Submit Order
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SequenceHandling;
