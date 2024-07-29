import { Button, Flex, Table, Typography } from "antd";


export const CandidateGrading = () => {
  
  const grades = [
    {
      key: 1,
      org_name: 'Java Institute',
      exam_name: 'Java programming for beginners - 2024',
      grade: 'A',
      score: 90,
      date: '2024-07-01',
      exam_id: 1
    },
    {
      key: 2,
      org_name: 'UCSC',
      exam_name: 'Advanced Java programming - 2024',
      grade: 'B',
      score: 80,
      date: '2024-07-01',
      exam_id: 2
    },
    {
      key: 3,
      org_name: 'SLIIT',
      exam_name: 'Python programming - 2024',
      grade: 'C',
      score: 70,
      date: '2024-07-01',
      exam_id: 3
    },
  ]

  const columns = [
    {
      title: 'Organization Name',
      dataIndex: 'org_name',
      key: 'org_name',
    },
    {
      title: 'Exam Name',
      dataIndex: 'exam_name',
      key: 'exam_name',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Flex>
          <Button type="primary"><a href="#">View Exam</a></Button>
        </Flex>
      ),
    },
  ]
  
  return (
    <div>
      <Typography.Title level={1}>Grading</Typography.Title>
      <Table columns={columns} dataSource={grades} />
    </div>
  );
};