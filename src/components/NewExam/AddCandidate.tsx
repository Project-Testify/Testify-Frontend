import { Table, Button, Select, Form, Divider } from 'antd';
import { useState } from 'react';
import { useFetchData } from '../../hooks';

export const AddCandidate = () => {
  const { data: candidatesData } = useFetchData('../mocks/CandidatesMock.json');
  const [candidates, setCandidates] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys: any) => setSelectedRowKeys(newSelectedRowKeys);

  const rowSelection = { selectedRowKeys, onChange: onSelectChange };

  const handleSubmit = () => console.log(candidates);

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Select mode="multiple" allowClear placeholder="Select Candidates" options={candidatesData} />
        <Divider />
        <Table rowSelection={rowSelection} dataSource={candidatesData} columns={[]} />
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </>
  );
};
