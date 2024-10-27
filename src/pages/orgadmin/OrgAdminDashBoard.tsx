/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Col, message, Row } from 'antd';
import {  
  PageHeader,
  MarketingStatsCard,
  LogisticsStatsCard,
  LearningStatsCard,
  ExamListCard,
} from '../../components';


import {
  HomeOutlined,
  PieChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { getLoggedInUser } from '../../utils/authUtils';
import { useEffect, useState } from 'react';
import { ExamResponse } from '../../api/types';
import { getExams, getExamSetters, getInvitations } from '../../api/services/organization';
import { AxiosResponse } from 'axios';
import { Group } from '../../types';
import { getGroups } from '../../api/services/group';

export const OrgAdminDashBoard = () => {
  const [exams, setExams] = useState<ExamResponse[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<ExamResponse[]>([]);
  const [counts, setCounts] = useState({
    active:0,
    upcoming:0,
    completed:0
  })
  const [invitations, setInvitations] = useState([]);
  const [examSetters, setExamSetters] = useState([]);
  const [groups, setGroups] = useState<Group[]>([]);
  
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error("You must be logged in to perform this action.");
    return;
  }
  const organizationId = loggedInUser.id;


  const fetchExams = async() => {
    try{
      const response  = await getExams(organizationId);
      const exams = response.data;
      console.log(response.data);
      setExams(exams);
      console.log("exams",exams);
    }catch(error){
      message.error("Error fetching exams");
      console.log(error);
    }
  }

  const fetchExamSetters = async () =>{
    try{
      const response : AxiosResponse = await getExamSetters(organizationId);
      setExamSetters(response.data);
    }catch{
      console.log('Error fetching Exam Setters');
    }
  }

  const fetchInvitations = async () =>{
    try{
      const response : AxiosResponse = await getInvitations(organizationId);
      setInvitations(response.data);
    }catch{
      console.log("Error fetching Exam setter invitations");
    }
  }

  const fetchGroups = async () => {
    try{
      const response : AxiosResponse =  await getGroups(Number(organizationId));
      setGroups(response.data);
    } catch(err){
      console.log("error fetching candidate groups");
    }
  }

  useEffect(()=>{
    fetchExams();
    fetchExamSetters();
    fetchInvitations();
    fetchGroups();
  },[organizationId])

  useEffect(()=>{
    const currentDate = new Date();
    setUpcomingExams(exams.filter((exam)=>new Date(exam.startDatetime)>currentDate));
    
    const activeExams = exams.filter((exam: ExamResponse) => new Date(exam.startDatetime) <= currentDate && currentDate <= new Date(exam.endDatetime))
    const completedExams = exams.filter((exam:ExamResponse)=>new Date(exam.endDatetime)<=currentDate);

    setCounts({
      active: activeExams.length,
      upcoming: upcomingExams.length,
      completed: completedExams.length
    })
  },[exams])

  const chartData = [
    {type:'Active', value: counts.active},
    {type:'Upcoming', value:counts.upcoming},
    {type:'Completed', value:counts.completed}
  ]

  // const {
  //   data: examCardData,
  //   error: examCardDataError,
  //   loading: examCardDataLoading,
  // } = useFetchData('../mocks/Exams.json');


  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Welcome ' + loggedInUser?.firstName}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>dashboard</span>
              </>
            ),
          },
        ]}
      />
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={12} lg={8}>
          <LearningStatsCard
            title="Total Exams"
            value1={examSetters.length}
            value2={invitations.length}
            icon={FileTextOutlined}
            color="#6f7ae8"
            progress={30}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <MarketingStatsCard
            data={chartData}
            title="Exam Status"
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <LogisticsStatsCard
            icon={FileTextOutlined}
            value={groups.length}
            title="Candidates Groups"
            diff={12.5}
          />
        </Col>

        <Col span={24}>
          <ExamListCard exams={upcomingExams} />
        </Col>
      </Row>
    </div>
  );
};
