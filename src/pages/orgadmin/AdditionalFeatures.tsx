import React, { useEffect, useState } from 'react';
import { Form, Input, Switch, Card, Button, message } from 'antd';
import {
  getRealTimeMonitoringStatus,
  updateRealTimeMonitoring,
  getBrowserLockdownStatus,
  updateBrowserLockdown,
  getHostedStatus,
  updateHostedStatus,
  getModerator,
  setModerator,
} from './../../api/services/ExamServices';

const ExamControlPanel = () => {
  const examId = sessionStorage.getItem("examId");
  const [isRealTimeMonitoring, setRealTimeMonitoring] = useState(false);
  const [realTimeMonitoringLink, setRealTimeMonitoringLink] = useState('');
  const [isBrowserLockdown, setBrowserLockdown] = useState(false);
  const [isExamHosted, setExamHosted] = useState(false);
  const [moderatorEmail, setModeratorEmail] = useState('');
  const [currentModerator, setCurrentModerator] = useState('No moderator assigned');
  const [isLoading, setIsLoading] = useState(false);

  const fetchInitialValues = async () => {
    const examId = Number(sessionStorage.getItem("examId"));
    try {
      const realTimeResponse = await getRealTimeMonitoringStatus(examId);
      setRealTimeMonitoring(realTimeResponse.data.realTimeMonitoring);
      setRealTimeMonitoringLink(realTimeResponse.data.zoomLink || '');

      const browserLockdownResponse = await getBrowserLockdownStatus(examId);
      setBrowserLockdown(browserLockdownResponse.data.browserLockdown);

      const hostedResponse = await getHostedStatus(examId);
      console.log(hostedResponse.data.hosted);
      setExamHosted(hostedResponse.data.hosted);

      const moderatorResponse = await getModerator(examId);
      if (moderatorResponse) {
        setCurrentModerator(
          `${moderatorResponse.data.firstName} ${moderatorResponse.data.lastName}`
        );
        setModeratorEmail(moderatorResponse.data.email);
      }
    } catch (error) {
      message.error('Failed to fetch initial data.');
    }
  };

  useEffect(() => {
    fetchInitialValues();
  }, [examId]);

  const handleRealTimeMonitoringChange = async (enabled: boolean) => {
    const examId = Number(sessionStorage.getItem("examId"));
    if (enabled && !realTimeMonitoringLink.trim()) {
      message.error('Please enter a valid Zoom meeting link before enabling real-time monitoring.');
      return;
    }

    const zoomLinkValue = enabled ? realTimeMonitoringLink : null;
    setRealTimeMonitoring(enabled);

    try {
      await updateRealTimeMonitoring(examId, {
        realTimeMonitoring: enabled,
        zoomLink: zoomLinkValue || '',
      });
      message.success('Real-time monitoring updated.');
    } catch (error) {
      message.error('Failed to update real-time monitoring.');
    }
  };

  const handleBrowserLockdownChange = async (enabled: boolean) => {
    setBrowserLockdown(enabled);
    const examId = Number(sessionStorage.getItem("examId"));
    try {
      await updateBrowserLockdown(examId, enabled);
      message.success('Browser lockdown updated.');
    } catch (error) {
      message.error('Failed to update browser lockdown.');
    }
  };

  const handleHostExam = async () => {
    const examId = Number(sessionStorage.getItem("examId"));
    const newHostedStatus = !isExamHosted;
    setExamHosted(newHostedStatus);
    try {
      await updateHostedStatus(examId, newHostedStatus);
      message.success(newHostedStatus ? 'Exam is now hosted.' : 'Exam is no longer hosted.');
    } catch (error) {
      message.error('Failed to update hosting status.');
    }
  };

  const handleSetModerator = async () => {
    const examId = Number(sessionStorage.getItem("examId"));
    try {
      
      await setModerator(examId, moderatorEmail);
      message.success('Moderator set successfully.');
      setCurrentModerator(moderatorEmail);
    } catch (error) {
      message.error('Failed to set moderator.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Exam Control Panel</h2>

      {/* Real-Time Monitoring */}
      <Card style={{ marginBottom: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Real-Time Monitoring</h3>
        <Form.Item label="Zoom Meeting Link">
          <Input
            placeholder="Enter Zoom Meeting Link"
            value={realTimeMonitoringLink}
            onChange={(e) => setRealTimeMonitoringLink(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Enable Real-Time Monitoring">
          <Switch
            checked={isRealTimeMonitoring}
            onChange={handleRealTimeMonitoringChange}
          />
        </Form.Item>
      </Card>

      {/* Browser Lockdown */}
      <Card style={{ marginBottom: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Browser Lockdown</h3>
        <Form.Item label="Enable Browser Lockdown">
          <Switch
            checked={isBrowserLockdown}
            onChange={handleBrowserLockdownChange}
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
          onClick={handleHostExam}
        >
          {isExamHosted ? 'Exam is Hosted' : 'Host the Exam'}
        </Button>
      </Card>

      {/* Set Moderator */}
      <Card style={{ marginBottom: '20px', borderRadius: '8px' }}>
        <h3>Set Moderator</h3>
        <p>Current Moderator: {currentModerator}</p>
        <Input
          placeholder="Enter Moderator Email"
          value={moderatorEmail}
          onChange={(e) => setModeratorEmail(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button type="primary" onClick={handleSetModerator}>
          Assign Moderator
        </Button>
      </Card>
    </div>
  );
};

export default ExamControlPanel;
