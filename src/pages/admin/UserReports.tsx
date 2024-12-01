import { PageHeader } from '../../components';

import { FundOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

import { PATH_ADMIN } from '../../constants/routes';
import { Card, Col, Row, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { getUserRegistarationStats, getUserRoleStats } from '../../api/services/Reports';
import { Column, Line, Pie } from '@ant-design/plots';

import { Spin } from 'antd';
import { toLower } from 'lodash';
import moment, { Moment } from 'moment';

export const UserReports = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleData, setRoleData] = useState<any[]>([]);
  const [organizationsPerDay, setOrganizationsPerDay] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState(organizationsPerDay);

  // Filter data based on selected date range
  const handleDateFilter = (dates : Moment[]) => {
    console.log('dates', dates);
    if (!dates || dates.length === 0) {
      setFilteredData(organizationsPerDay); // Reset to original data if no date range is selected
    } else {
      const [start, end] = dates;
      const filtered = organizationsPerDay.filter((item) => {
        const itemDate = moment(item.date, 'YYYY-MM-DD');
        return itemDate.isBetween(start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"), 'days', '[]'); // Inclusive range
      });
      setFilteredData(filtered);
    }
  };


  useEffect(() => {
    try {

    getUserRegistarationStats().then((response) => {
      setData(response.data);

      // get organizations count per day
      let orgData = response.data.filter((item: any) => toLower(item.category) === 'organization');
      setOrganizationsPerDay(orgData);
      setFilteredData(orgData);

    });

    getUserRoleStats().then((response) => {
      setRoleData(response.data);
    });

    
    console.log('data', organizationsPerDay);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }, []);

  const config = {
    data,
    isGroup: true,
    xField: 'date',
    yField: 'value',
    colorField: 'category',
    group: true,
    autoFit: true,
    height: 300,
  };

  const configPie = {
    data: roleData, // array of objects with role and count
    angleField: 'count',
    colorField: 'role',
    height : 300,
  };
  
  const configLine = {
    data: filteredData,
    xField: 'date',
    yField: 'value',
    height: 300,
  };


  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Insights'}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: PATH_ADMIN.dashboard,
          },
          {
            title: (
              <>
                <FundOutlined />
                <span>Insights</span>
              </>
            ),
          },
        ]}
      />

      <Row gutter={[10,10]} >
        <Col xl={12}>
          <Card title="User Registration Stats" style={{ width: '100%', height: '100%' }}>
            {loading ? (
              <Spin tip="Loading..." />
            ) : (
              <Column {...config} />
            )}
          </Card>
        </Col>

        <Col xl={12}>
          <Card title="User Role Stats" style={{ width: '100%', height: '100%' }}>
            {loading ? (
              <Spin tip="Loading..." />
            ) : (
              <Pie {...configPie} />
            )}
          </Card>
        </Col>

        <Col xl={24}>
        <Card title="Organization Insights" style={{ width: '100%', height: '100%' }}>
          <Row justify="end" style={{ marginBottom: 16 }}>
            <DatePicker.RangePicker
              onChange={handleDateFilter}
              format="YYYY-MM-DD"
              placeholder={['Start Date', 'End Date']}
            />
          </Row>
          {loading ? (
            <Spin tip="Loading..." />
          ) : (
            <Line {...configLine} />
          )}
        </Card>
        </Col>


      </Row>
    </div>
  );
};


