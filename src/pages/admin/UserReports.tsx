import { PageHeader } from '../../components';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

import { PATH_ADMIN } from '../../constants/routes';
import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { getUserRegistarationStats, getUserRoleStats } from '../../api/services/Reports';
import { Column, Pie } from '@ant-design/plots';

import { Spin } from 'antd';

export const UserReports = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleData, setRoleData] = useState<any[]>([]);

  useEffect(() => {
    try {

    getUserRegistarationStats().then((response) => {
      setData(response.data);
    });

    getUserRoleStats().then((response) => {
      setRoleData(response.data);
    });
    
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
  

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'User Reports'}
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
                <UserOutlined />
                <span>User Reports</span>
              </>
            ),
          },
        ]}
      />

      <Row gutter={10}>
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
      </Row>
    </div>
  );
};


