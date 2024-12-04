/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Col, Row } from 'antd';
import {  
  PageHeader,
  MarketingStatsCard,
  LogisticsStatsCard,
  LearningStatsCard,
  // ExamListCard,
} from '../../components';


import {
  HomeOutlined,
  PieChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
// import { useFetchData } from '../../hooks';
import { getLoggedInUser } from '../../utils/authUtils';
import { AdminStatsCard } from '../../components/dashboard/learning/StatsCard/AdminStatsCard';
import { getUserRegistarationStats, getUserRoleStats } from '../../api/services/Reports';
import { useEffect, useState } from 'react';
import { getOrganizationRequestService } from '../../api/services/Admin';



export const AdminDashBoard = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrg, setTotalOrg] = useState(0);
  const [roleData, setRoleData] = useState<any[]>([]);
  const [verificationRequests, setVerificationRequests] = useState(0);

  const chartData = [
    { type: 'Active', value: 274 },
    { type: 'Upcoming', value: 337 },
    { type: 'Completed', value: 81 },
    { type: 'Other', value: 497 }
  ];

  // get all users data
  const getUserData = async () => {
    try {
      const response = await getUserRoleStats();
      console.log(response.data);
      //get total count of users except organization
      let total = 0;
      let orgCount = 0;
      response.data.forEach((role: any) => {
        if (role.role !== 'ORGANIZATION') {
          total += role.count;
        }
        else if (role.role === 'ORGANIZATION') {
          orgCount = role.count;
        }
      });
      setTotalUsers(total);
      setTotalOrg(orgCount);

      //set role data
      // convert role data to chart data
      response.data.forEach((role: any) => {
        role.type = role.role;
        role.value = role.count
      }
      );
      setRoleData(response.data);


    } catch (error) {
      console.log(error);
    }
  }

  // get verification requests
  const getVerificationRequests = async () => {
    try {
      const response = await getOrganizationRequestService();
      console.log(response.data);
      setVerificationRequests(response.data.length);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
    getVerificationRequests();
  }, []);


  //get user from getLoggedInUser
  const user = getLoggedInUser();

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Welcome ' + user?.firstName}
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
          <AdminStatsCard
            title="Total Users"
            value1= {totalUsers}
            value2={totalOrg}
            icon={FileTextOutlined}
            color="#6f7ae8"
            progress={30}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <MarketingStatsCard
            data={roleData}
            title="Role Distribution"
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <LogisticsStatsCard
            icon={FileTextOutlined}
            value={verificationRequests}
            title="Verification Requests"
            diff={12.5}
          />
        </Col>

        <Col span={24}>
          {/* <ExamListCard
            exams={tasksListData}
          /> */}
        </Col>
      </Row>
    </div>
  );
};
