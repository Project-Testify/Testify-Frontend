import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
const { Option } = Select;

type Exam = {
  id: number;
  title: string;
  status: string;
  organization: { name: string };
  totalMarks: number;
  startTime: string;
  endTime: string;
  duration: number;
};

type SortingComponentProps = {
  exams: Exam[];
  onSortedExamsChange: (sortedExams: Exam[]) => void;
};

const sortByStatusOrder = ["ONGOING", "UPCOMING", "COMPLETED", "EXPIRED"];

export const SortingComponent: React.FC<SortingComponentProps> = ({ exams, onSortedExamsChange }) => {
  const [sortedExams, setSortedExams] = useState<Exam[]>([]);

  useEffect(() => {
    // Default sort by status on load
    const sortedByDefault = [...exams].sort(
      (a, b) => sortByStatusOrder.indexOf(a.status) - sortByStatusOrder.indexOf(b.status)
    );
    setSortedExams(sortedByDefault);
    onSortedExamsChange(sortedByDefault);
  }, [exams]);

  const handleSort = (key: string) => {
    let sorted;
    switch (key) {
      case 'status':
        sorted = [...exams].sort(
          (a, b) => sortByStatusOrder.indexOf(a.status) - sortByStatusOrder.indexOf(b.status)
        );
        break;
      case 'organization':
        sorted = [...exams].sort((a, b) => a.organization.name.localeCompare(b.organization.name));
        break;
      case 'startDate':
        sorted = [...exams].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        break;
      case 'endDate':
        sorted = [...exams].sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
        break;
      case 'examName':
        sorted = [...exams].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'duration':
        sorted = [...exams].sort((a, b) => a.duration - b.duration);
        break;
      default:
        sorted = [...exams];
    }
    setSortedExams(sorted);
    onSortedExamsChange(sorted);
  };

  return (
    <Select
      defaultValue="status"
      style={{ width: 200 }}
      onChange={handleSort}
    >
      <Option value="status">Sort by Status</Option>
      <Option value="organization">Sort by Organization</Option>
      <Option value="startDate">Sort by Start Date</Option>
      <Option value="endDate">Sort by End Date</Option>
      <Option value="examName">Sort by Exam Name</Option>
      <Option value="duration">Sort by Duration</Option>
    </Select>
  );
};
