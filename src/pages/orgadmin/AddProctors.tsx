import React, { useState } from 'react';
import { Input, Button, List, Card, message, Tag, Row, Col } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

const AddProctors = () => {
  const [filteredProctors, setFilteredProctors] = useState<any[]>([]); // Filtered proctors based on search
  const [selectedProctors, setSelectedProctors] = useState<any[]>([]); // Selected proctors to be assigned
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  // Sample proctors data for testing
  const sampleProctors = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { name: 'Bob Brown', email: 'bob.brown@example.com' },
  ];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter proctors based on search term
    if (value.trim()) {
      const filtered = sampleProctors.filter(
        (proctor) =>
          proctor.name.toLowerCase().includes(value.toLowerCase()) ||
          proctor.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProctors(filtered);
    } else {
      setFilteredProctors([]); // Clear filtered list if search term is empty
    }
  };

  // Handle adding a proctor to the selected list
  const handleSelectProctor = (proctor: any) => {
    if (selectedProctors.find((selected) => selected.email === proctor.email)) {
      message.error('This proctor has already been added.');
      return;
    }
    setSelectedProctors([...selectedProctors, proctor]);
  };

  // Handle removing a proctor from the selected list
  const handleRemoveProctor = (email: string) => {
    setSelectedProctors(selectedProctors.filter((proctor) => proctor.email !== email));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Add Proctors</h2>
      
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
            renderItem={(proctor) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => handleSelectProctor(proctor)}>
                    Add
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={proctor.name}
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
              {proctor.name} ({proctor.email})
            </Tag>
          </Col>
        ))}
      </Row>

      <Button type="primary" style={{ marginTop: '20px', width: '100%' }} disabled={selectedProctors.length === 0}>
        Submit
      </Button>
    </div>
  );
};

export default AddProctors;
