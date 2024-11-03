import {
  Table,
  TableProps,
  Button,
  Typography,
  Space,
  Modal,
  message,
} from 'antd';
import { Candidate } from '../../types';
import { deleteCandidate } from '../../api/services/group';

type Props = {
  candidates: Candidate[];
  groupId: number;
  //fetchGroups: () => void;
} & TableProps<any>;

export const CandidatesTable = ({ candidates, groupId }: Props) => {
  
  const handleDeleteCandidate = (groupId:number, candidateId:number) =>{
    Modal.confirm({
      title: 'Are you sure you want to delete this Candidate?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        deleteCandidate(groupId, candidateId)
          .then((res) => {
            message.success('Candidate deleted successfully');
            console.log(res);
            //fetchGroups();
          })
          .catch((err) => {
            message.error('Failed to delete candidate');
            console.log(err);
          });
      },
    });
  }
  
  const COLUMNS = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_: any, { email }: Candidate) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          
          style={{ marginBottom: 0 }}
        >
          {email}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_: any, { firstName, lastName }: Candidate) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          className="text-capitalize"
          style={{ marginBottom: 0 }}
        >
          {
            firstName + ' ' + lastName
          }
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, candidate:Candidate) => (
        <Space>
          <Button type="primary" danger onClick={()=>handleDeleteCandidate(groupId,candidate.id)}>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <Table dataSource={candidates} columns={COLUMNS}/>
    
  );
};
