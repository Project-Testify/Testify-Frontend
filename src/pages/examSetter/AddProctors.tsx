import React, { useState, useEffect } from 'react';
import { Input, Button, List, Card, message, Tag, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getExamSettersForSearch, getProctors, addOrUpdateProctors } from '../../api/services/ExamServices';

const AddProctors = () => {
  const [examSetters, setExamSetters] = useState<any[]>([]);
  const [filteredProctors, setFilteredProctors] = useState<any[]>([]);
  const [selectedProctors, setSelectedProctors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const organizationId = sessionStorage.getItem('orgId') ? Number(sessionStorage.getItem('orgId')) : null;
  const examId = sessionStorage.getItem('examId') ? Number(sessionStorage.getItem('examId')) : null;

  useEffect(() => {
    if (organizationId) {
      getExamSettersForSearch(organizationId)
        .then((response: any) => {
          setExamSetters(response.data);
        })
        .catch((error) => {
          message.error('Failed to fetch exam setters');
          console.error(error);
        });
    }
    if (examId) {
      fetchExistingProctors(examId);
    }
  }, [organizationId, examId]);

  const fetchExistingProctors = (examId: number) => {
    getProctors(examId)
      .then((response: any) => {
        console.log('Existing proctors:', response.data);
        setSelectedProctors(response.data);
      })
      .catch((error) => {
        message.error('Failed to fetch existing proctors');
        console.error(error);
      });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = examSetters.filter(
        (proctor) =>
          `${proctor.firstName} ${proctor.lastName}`.toLowerCase().includes(value.toLowerCase()) ||
          proctor.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProctors(filtered);
    } else {
      setFilteredProctors([]);
    }
  };

  const handleSelectProctor = (proctor: any) => {
    if (selectedProctors.find((selected) => selected.email === proctor.email)) {
      message.error('This proctor has already been added.');
      return;
    }
    setSelectedProctors([...selectedProctors, proctor]);
  };

  const handleRemoveProctor = (email: string) => {
    setSelectedProctors(selectedProctors.filter((proctor) => proctor.email !== email));
  };

  const handleSubmit = () => {
    const emails = selectedProctors.map((proctor) => proctor.email);
    console.log('Proctors to add:', emails);
    addOrUpdateProctors(Number(examId), emails)
      .then((response) => {
        message.success(response.data.message || 'Proctors updated successfully.');
        fetchExistingProctors(Number(examId));
      })
      .catch((error) => {
        message.error('Failed to update proctors');
        console.error(error);
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Update Proctors</h2>

      <Input
        placeholder="Search by name or email"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', width: '100%' }}
      />

      {filteredProctors.length > 0 && (
        <Card title="Search Results" style={{ marginBottom: '20px' }}>
          <List
            dataSource={filteredProctors}
            renderItem={(proctor: any) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => handleSelectProctor(proctor)}>
                    Add
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={`${proctor.firstName} ${proctor.lastName}`}
                  description={proctor.email}
                />
              </List.Item>
            )}
          />
        </Card>
      )}

      <h3>Selected Proctors</h3>
      <Row gutter={[16, 16]}>
        {selectedProctors.map((proctor) => (
          <Col key={proctor.email}>
            <Tag
              color="blue"
              closable
              onClose={() => handleRemoveProctor(proctor.email)}
              style={{ cursor: 'pointer' }}
            >
              {`${proctor.firstName} ${proctor.lastName}`} ({proctor.email})
            </Tag>
          </Col>
        ))}
      </Row>

      <Button
        type="primary"
        style={{ marginTop: '20px', width: '100%' }}
        onClick={handleSubmit}
      >
        Update Proctors
      </Button>
    </div>
  );
};

export default AddProctors;

