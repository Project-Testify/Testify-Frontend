import { Badge, BadgeProps, Button, Table, TableProps, Typography } from 'antd';
import { ExamResponse } from '../../../../api/types';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../../../utils/authUtils';

type Props = {
  data: ExamResponse[];
} & TableProps<any>;

export const ExamsTable = ({ data}: Props) => {
  const navigate = useNavigate();
  const handleClick = (examId:any)=>{
    sessionStorage.setItem('examId',examId);
    const loggedInUser = getLoggedInUser();
    console.log('user',loggedInUser);
    if(loggedInUser?.role == 'EXAMSETTER') navigate('/examSetter/new_exam');
    else navigate('/org-admin/new_exam');
  }
  
  const COLUMNS = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      render: (_: any, { title }: ExamResponse) => (
        <Typography.Paragraph
          ellipsis={{ rows: 1 }}
          className="text-capitalize"
          style={{ marginBottom: 0 }}
        >
          {title}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'exam_status',
      key: 'exam_status',
      render: (status: string) => {
        let badgeStatus: BadgeProps['status'];

        if (status === 'Upcoming') {
          badgeStatus = 'default';
        } else if (status === 'Active') {
          badgeStatus = 'success';
        } else {
          badgeStatus = 'processing';
        }

        return <Badge status={badgeStatus} text={status} className="text-capitalize" />;
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDatetime',
      key: 'startDatetime',
      render: (startDatetime: string) => format(new Date(startDatetime), 'MMMM dd, yyyy, HH:mm'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDatetime',
      key: 'endDatetime',
      render: (endDatetime: string) => format(new Date(endDatetime), 'MMMM dd, yyyy, HH:mm'),
    },
    {
      title : 'Actions',
      dataIndex:'id',
      key : 'id',
      render: (examId:number)=>(
        <Button type='primary' onClick={()=>handleClick(examId)}>View Exam</Button>
      )
    }
  ];

  return (
    <Table
      dataSource={data}
      columns={COLUMNS}
    />
  );
};
