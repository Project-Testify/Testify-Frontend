import { PageHeader } from '../../components';

import { BankOutlined, HomeOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

import { PATH_ADMIN } from '../../constants/routes';
import {
  Avatar,
  Button,
  Card,
  Modal,
  Table,
  Image,
  Row,
  Col,
  Tabs,
  Typography,
  Input,
  Space,
} from 'antd';
import {
  getOrganizationRequestService,
  rejectOrganizationService,
  verifyOrganizationService,
} from '../../api/services/Admin';
import { useEffect, useState } from 'react';
import { Form } from 'antd';

interface Organization {
  id: number;
  firstName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  bio: string;
  website: string;
  profileImage: string;

  verificationDocument01Url?: string | null;
  verificationDocument02Url?: string | null;
  verificationDocument03Url?: string | null;
  verificationDocument04Url?: string | null;
  verificationDocument05Url?: string | null;

  verificationStatus: string;
  rejectionReason?: string;
  requestDate: Date;
  [key: `verificationDocument0${number}Url`]: string | null | undefined;
}

export const OrganizationRequest = () => {
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<Organization>();

  const [form] = Form.useForm();

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
      } finally {
        fetchData();
        setModalVisible(false);
      }
    };

    verifyOrganization();
  };

  const handleReject = ({
    id,
    rejectionReason,
  }: {
    id: number;
    rejectionReason: string;
  }) => {
    console.log(`Rejected request with ID: ${id}`);
    // Logic to reject the request
    console.log('Rejection Reason:', rejectionReason);
    // call the reject function
    const rejectOrganization = async () => {
      try {
        const rejectOrg = await rejectOrganizationService({
          id,
          rejectionReason,
        });
        console.log('Organization Rejected:', rejectOrg);

        if (rejectOrg.status === 200) {
          console.log('Organization Rejected Successfully');
        }
      } catch (error) {
        console.error('Failed to reject organization:', error);
      } finally {
        fetchData();
        setModalVisible(false);
      }
    };

    rejectOrganization();
  };

  const handleView = (id: number) => {
    console.log(`Viewing request with ID: ${id}`);
    // Logic to view the request details
    const org = tableData.find((org: { id: number }) => org.id === id);

    setModalData(org);
    console.log(modalData);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      key: 'firstName',
      render: (record: { firstName: string; profileImage: string | null }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={
              record.profileImage ? record.profileImage : '/orgnaization.png'
            }
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
          <Button type="primary" onClick={() => handleView(record.id)}>
            View
          </Button>
        </span>
      ),
    },
  ];

  function handleClose() {
    setModalVisible(false);
    console.log('Modal Closed');
  }

  const displayFile = (fileName: string) => {
    if (!fileName) {
      return null;
    }

    const fileUrl = `http://localhost:8080/api/v1/file/${fileName}`;
    const isImage =
      fileName.endsWith('.jpg') ||
      fileName.endsWith('.png') ||
      fileName.endsWith('.jpeg');

    return (
      <div>
        {isImage ? (
          <Image src={fileUrl} width={'100%'} alt="Uploaded file" />
        ) : (
          // Display PDF adjust the height and width as needed
          <embed src={fileUrl} style={{ width: '100%', height: '50rem' }} />
        )}
      </div>
    );
  };

  // set the items to the tabs only if the documents are available
  const items = [];
  for (let i = 1; i <= 5; i++) {
    const docUrl = modalData ? modalData[`verificationDocument0${i}Url`] : null;
    if (docUrl) {
      items.push({
        key: i.toString(),
        label: `Verification Document 0${i}`,
        children: displayFile(docUrl),
      });
    }
  }

  const onChangeTab = (key: string) => {
    console.log('Tab Changed:', key);
  };

  const warningReject = () => {
    Modal.warning({
      title: 'Reject Organization',
      content: (
        <div>
          <Typography.Text>
            Are you sure you want to reject this organization? <br />
            Enter the reason for rejection below:
          </Typography.Text>
          <Form
            name="rejectionForm"
            form={form}
            layout="vertical"
            style={{ marginTop: '1rem' }}
          >
            <Form.Item
              name="rejectionReason"
              rules={[
                {
                  required: true,
                  message: 'Please enter the reason for rejection',
                },
              ]}
            >
              {/* make the height of textarea 200px */}

              <Input.TextArea style={{height : '200px'}} placeholder="Enter the reason for rejection" />
            </Form.Item>
          </Form>
        </div>
      ),
      // Hide default OK button and use custom actions
      footer: [
        // align the buttons to the right
        <Space style={{ float: 'right' }}>
          <Button key="submit" type="primary" onClick={handleRejectWarning}>
            Submit
          </Button>
          ,
          <Button
            key="cancel"
            onClick={() => {
              form.resetFields();
              // close only the warning modal
              Modal.destroyAll();
            }}
          >
            Cancel
          </Button>
        </Space>,
        
      ],
    });
  };

  const handleRejectWarning = () => {
    form
      .validateFields() // Trigger form validation
      .then((values) => {
        if (modalData?.id !== undefined) {
          handleReject({
            id: modalData.id,
            rejectionReason: values.rejectionReason,
          });
          Modal.destroyAll();
        }
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo); // Handle validation errors
      });
  };

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
        <Modal
          title="View Organization"
          centered
          width={'80%'}
          height={'80%'}
          open={modalVisible}
          onCancel={handleClose}
          okText={'Accept'}
          onOk={() => modalData?.id !== undefined && handleAccept(modalData.id)}
          // add another custom button
          footer={[
            <Button
              key="accept"
              type="primary"
              onClick={() =>
                modalData?.id !== undefined && handleAccept(modalData.id)
              }
            >
              Accept
            </Button>,
            <Button key="reject" type="primary" danger onClick={warningReject}>
              Reject
            </Button>,
            <Button key="cancel" onClick={handleClose}>
              Cancel
            </Button>,
          ]}
        >
          <Row justify={'space-evenly'}>
            <Col span={12}>
              <Avatar
                src={
                  modalData?.verificationDocument01Url
                    ? displayFile(modalData.verificationDocument01Url)
                    : '/organization.png'
                }
                size={128}
                style={{ margin: '0 auto', display: 'block' }}
              />

              <Table
                showHeader={false}
                dataSource={[
                  {
                    key: '1',
                    label: 'Organization Name',
                    value: modalData?.firstName,
                  },
                  {
                    key: '2',
                    label: 'Address Line 1',
                    value: modalData?.addressLine1,
                  },
                  {
                    key: '3',
                    label: 'Address Line 2',
                    value: modalData?.addressLine2,
                  },
                  {
                    key: '4',
                    label: 'City',
                    value: modalData?.city,
                  },
                  {
                    key: '5',
                    label: 'State',
                    value: modalData?.state,
                  },
                  {
                    key: '7',
                    label: 'Website',
                    value: modalData?.website,
                  },
                ]}
                columns={[
                  {
                    title: 'Label',
                    dataIndex: 'label',
                    key: 'label',
                    width: '30%',
                    render: (text: string) => <strong>{text}</strong>,
                  },
                  {
                    title: 'Value',
                    dataIndex: 'value',
                    key: 'value',
                  },
                ]}
                pagination={false}
              />
            </Col>

            <Col span={12} style={{ minHeight: '80%' }}>
              <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
            </Col>
          </Row>
        </Modal>
      </Card>
    </div>
  );
};
