import React, { useState } from 'react';
import { Form, Input, Switch, Checkbox, Divider, Card, Button } from 'antd';

const ExamControlPanel = () => {
  const [isRealTimeMonitoring, setRealTimeMonitoring] = useState(false);
  const [isBrowserLockdown, setBrowserLockdown] = useState(false);
  const [isExamHosted, setExamHosted] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Exam Control Panel</h2>

      {/* Real-Time Monitoring */}
      <Card style={{ marginBottom: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Real-Time Monitoring</h3>
        <Form.Item label="Enable Real-Time Monitoring">
          <Switch 
            checked={isRealTimeMonitoring} 
            onChange={(checked) => setRealTimeMonitoring(checked)} 
          />
        </Form.Item>
        {isRealTimeMonitoring && (
          <Form.Item
            label="Zoom Meeting Link"
            name="zoomLink"
            rules={[
              { 
                required: true, 
                message: 'Please enter a valid Zoom meeting link' 
              },
              { 
                type: 'url', 
                message: 'Enter a valid URL' 
              },
            ]}
          >
            <Input placeholder="Enter Zoom Meeting Link" />
          </Form.Item>
        )}
      </Card>

      {/* Browser Lockdown */}
      <Card style={{ marginBottom: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Browser Lockdown</h3>
        <Form.Item label="Enable Browser Lockdown">
          <Switch 
            checked={isBrowserLockdown} 
            onChange={(checked) => setBrowserLockdown(checked)} 
          />
        </Form.Item>
      </Card>

      

      {/* Host the Exam */}
      <Card style={{ marginBottom: '20px', borderRadius: '8px' }}>
        <h3>Host the Exam</h3>
        <Button
          type="primary"
          style={{
            backgroundColor: isExamHosted ? '#52c41a' : '#d9d9d9',
            color: isExamHosted ? '#fff' : '#000',
            borderColor: isExamHosted ? '#52c41a' : '#d9d9d9',
            width: '100%',
            height: '50px',
            fontSize: '16px',
          }}
          onClick={() => setExamHosted(!isExamHosted)}
        >
          {isExamHosted ? 'Exam is Hosted' : 'Host the Exam'}
        </Button>
      </Card>
    </div>
  );
};

export default ExamControlPanel;
