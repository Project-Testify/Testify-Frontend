import { PageHeader } from '../../components';

import { BankOutlined, HomeOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

import { PATH_ADMIN } from '../../constants/routes';
import { Card, Table } from 'antd';
import { getOrganizationRequestService } from '../../api/services/Admin';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const OrganizationRequest = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgRequestData = await getOrganizationRequestService();
        console.log('Organization Request Data:', orgRequestData);

        if (orgRequestData.status === 200) {
          setTableData(orgRequestData.data); // Set the array directly
        }
      } catch (error) {
        console.error('Failed to fetch organization requests:', error);
      }
    };

    fetchData();
  }, []);

  console.log(tableData);

  const handleAccept = (id: number) => {
    console.log(`Accepted request with ID: ${id}`);
    // Logic to accept the request
  };

  const handleReject = (id: number) => {
    console.log(`Rejected request with ID: ${id}`);
    // Logic to reject the request
  };

  const handleView = (id: number) => {
    console.log(`Viewing request with ID: ${id}`);
    // Logic to view the request details
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: { id: number }) => (
        <span>
          <Link
            to="#"
            onClick={() => handleAccept(record.id)}
            style={{ marginRight: 16 }}
          >
            Accept
          </Link>
          <Link
            to="#"
            onClick={() => handleReject(record.id)}
            style={{ marginRight: 16 }}
          >
            Reject
          </Link>
          <Link to="#" onClick={() => handleView(record.id)}>
            View
          </Link>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Organization Requests'}
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
                <BankOutlined />
                <span>Organization Requests</span>
              </>
            ),
          },
        ]}
      />

      <Card>
        <Table
          dataSource={tableData}
          columns={columns}
          rowKey="id"
          tableLayout="fixed"
        />
      </Card>
    </div>
  );
};
