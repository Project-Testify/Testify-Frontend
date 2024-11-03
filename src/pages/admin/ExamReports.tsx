import { PageHeader } from '../../components';

import { BankOutlined, HomeOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

import { PATH_ADMIN } from '../../constants/routes';
import { Avatar, Button, Card, Modal, Table } from 'antd';
import {
  getOrganizationRequestService,
  verifyOrganizationService,
} from '../../api/services/Admin';
import { useEffect, useState } from 'react';
import { Organization } from '../authentication/forms/Organization';

interface Organization{
  firstName: string,
  addressLine1 :string,
  addressLine2 :string,
  city :string,
  state :string,
  bio :string,
  website :string,
  profileImage :string,
}

export const ExamReports = () => {
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<Organization>()

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

  useEffect(() => {

    fetchData();
  }, []);

  console.log(tableData);

  const handleAccept = async (id: number) => {
    console.log(`Accepted request with ID: ${id}`);
    // Logic to accept the request

    // verifu using calling adminService
    const verifyOrganization = async () => {
      try {
        const verifyOrg = await verifyOrganizationService(id);
        console.log('Organization Verified:', verifyOrg);

        if (verifyOrg.status === 200) {
          console.log('Organization Verified Successfully');
        }
      } catch (error) {
        console.error('Failed to verify organization:', error);
      }finally{
        fetchData();
      }
    };

    verifyOrganization();
  };

  const handleReject = (id: number) => {
    console.log(`Rejected request with ID: ${id}`);
    // Logic to reject the request
  };

  const handleView = (id: number) => {
    console.log(`Viewing request with ID: ${id}`);
    // Logic to view the request details
    const org = tableData.find((org: { id: number }) => org.id === id);
    setModalData(org);
    setModalVisible(true);


  };

  const columns = [
    {
      title: 'Name',
      key: 'firstName',
      render: (record: { firstName: string; profileImage: string | null }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={record.profileImage ? record.profileImage : '/orgnaization.png'}
            style={{ marginRight: 8 }}
          />
          <span>
            {record.firstName.charAt(0).toUpperCase() +
              record.firstName.slice(1)}
          </span>
        </div>
      ),
    },
    {
      title: 'City',
      key: 'city',
      render: (record: { city: string }) => (
        <span>
          {record.city.charAt(0).toUpperCase() + record.city.slice(1)}
        </span>
      ),
    },
    {
      title: 'State',
      key: 'state',
      render: (record: { state: string }) => (
        <span>
          {record.state.charAt(0).toUpperCase() + record.state.slice(1)}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: { id: number }) => (
        <span>
          <Button
            onClick={() => handleAccept(record.id)}
            style={{ marginRight: 8 }}
          >
            Accept
          </Button>
          <Button
            onClick={() => handleReject(record.id)}
            style={{ marginRight: 8 }}
          >
            Reject
          </Button>
          <Button onClick={() => handleView(record.id)}>View</Button>
        </span>
      ),
    },
  ];

  function handleClose() {
    setModalVisible(false);
  }

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
        <Modal title="View Organization" open={modalVisible} onCancel={handleClose} okText={"Accept"} cancelText={"Reject"}>
        {/* "firstName": "ucsc",
        "addressLine1": null,
        "addressLine2": null,
        "city": "bandarawela",
        "state": "dsa",
        "bio": "Undergraduate",
        "website": null,
        "profileImage": null */}
          <p>Organization Name : {modalData?.firstName}</p>
          <p>Address Line 1 : {modalData?.addressLine1}</p>
          <p>Address Line 2 : {modalData?.addressLine2}</p>
          <p>City : {modalData?.city}</p>
          <p>state : {modalData?.state} </p>
          <p>bio : {modalData?.city}</p>
          <p>website : {modalData?.website}</p>
          <p>profile image : {modalData?.profileImage}</p>
        </Modal>
      </Card>
    </div>
  );
};
