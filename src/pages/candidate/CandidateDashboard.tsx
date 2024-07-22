import { Helmet } from "react-helmet-async";
import { ExamStatCard, LogisticsStatsCard, PageHeader } from "../../components";
import { HomeOutlined, PieChartOutlined, FileTextOutlined } from "@ant-design/icons";
import { Col, Row, Calendar, Table, Tag } from "antd";

export const CandidateDashboard = () => {

  const candidateName = 'Kaumadi';
  const examData = [
    {type: 'Ongoing', value: 5},
    {type: 'Upcoming', value: 3},
    {type: 'Completed', value: 10}
  ]

  const participationData = [
    { date: '2023-07-01', count: 5 },
    { date: '2023-07-02', count: 3 },
    { date: '2023-07-03', count: 7 },
    { date: '2023-07-04', count: 6 },
    { date: '2023-07-05', count: 8 },
    { date: '2023-07-06', count: 4 },
    { date: '2023-07-07', count: 9 },
  ];

  //exam table
  const columns = [
    {
      title: 'Exam Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:string) => <a>{text}</a>,
    },
    {
      title: 'Organization Name',
      dataIndex: 'orgName',
      key: 'orgName',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status:any) => (
        <>
          {status.map((tag:string) => {
            let color = 'green';
            if (tag === 'upcoming') {
              color = 'volcano';
            } else if (tag === 'ongoing') {
              color = 'geekblue';
            } else if(tag === 'complete'){
              color = 'green';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      orgName: 'UCSC',
      startDate: '2024-07-01',
      status: ['ongoing'],
    },
    {
      key: '2',
      name: 'Jim Green',
      orgName: 'SLIIT',
      startDate: '2024-07-01',
      status: ['upcoming'],
    },
    {
      key: '3',
      name: 'Joe Black',
      orgName: 'NSBM',
      startDate: '2024-07-01',
      status: ['complete'],
    },
  ];
  
  return (
    <div>
      <Helmet>
        <title>Candidate Dashboard</title>
      </Helmet>

      <PageHeader 
        title={`Welcome ${candidateName}`}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined/>
                <span>Home</span>
              </>
            ),
            path:'/'
          },
          {
            title: (
              <>
                <PieChartOutlined/>
                <span>Dashboard</span>
              </>
            ),
          }
        ]}
        />

      <Row
        gutter={[
          { xs: 8, sm: 16, md: 20, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 20 },
        ]}>

        <Col xs={24} sm={12} lg={8}>
          <ExamStatCard data={examData} chartType={"bar"}/>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <ExamStatCard data={participationData} chartType={"line"}/>
        </Col>
        
        <Col xs={24} sm={12} lg={8}>
          <Calendar fullscreen={false}/>
        </Col>

        <Col lg={16}>
          <Table columns={columns} dataSource={data} />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <LogisticsStatsCard
            icon={FileTextOutlined}
            value={234}
            title="Your Badges"
            diff={12.5}
          />
        </Col>

      </Row>
    </div>
  );

};
