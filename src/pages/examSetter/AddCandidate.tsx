import { useState, useEffect } from 'react';
import { Select, List, Typography, message, Card, Row, Col, Divider, Button, Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'; // Import warning icon
import {
  getCandidateGroupsByOrganizationForSearch,
  getAllCandidatesForSearch,
  updateExamCandidates,
  getExamCandidates, // Fetch candidates for a specific exam
  getCandidateConflictingExams, // New API call for getting conflicting exams
} from '../../api/services/ExamServices'; // Import API calls
import { CandidateEmailListRequest } from '../../api/examServiceTypes'; // Import type

const { Option } = Select;
const { Title } = Typography;

const AddCandidate = () => {
  interface Candidate {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }

  interface CandidateGroup {
    id: number;
    name: string;
    candidates: Candidate[];
  }

  const [candidateGroups, setCandidateGroups] = useState<CandidateGroup[]>([]);
  const [individualCandidates, setIndividualCandidates] = useState<Candidate[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<CandidateGroup[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [conflictingExams, setConflictingExams] = useState<any[]>([]); // Store conflicting exams
  const [hasConflicts, setHasConflicts] = useState(false); // Track if there are conflicts

  useEffect(() => {
    const examId = sessionStorage.getItem('examId');
    if (examId) {
      loadCandidateGroups();
      loadIndividualCandidates();
      loadExamCandidates(Number(examId)); // Fetch candidates for the given exam
      checkForConflicts(Number(examId)); // Check for conflicts on page load

    }


  }, []);

  const loadCandidateGroups = async () => {
    try {
      const organizationId = sessionStorage.getItem('orgId');
      const response = await getCandidateGroupsByOrganizationForSearch(Number(organizationId));
      setCandidateGroups(response.data || []);
      setFilteredGroups(response.data || []);
    } catch (error) {
      message.error('Failed to load candidate groups');
    }
  };

  const loadIndividualCandidates = async () => {
    try {
      const response = await getAllCandidatesForSearch();
      setIndividualCandidates(response.data || []);
      setFilteredCandidates(response.data || []);
    } catch (error) {
      message.error('Failed to load individual candidates');
    }
  };

  const loadExamCandidates = async (examId: number) => {
    try {
      const response = await getExamCandidates(examId);
      setSelectedCandidates(response.data || []);
    } catch (error) {
      message.error('Failed to load candidates for the exam');
    }
  };

  const checkForConflicts = async (examId: number) => {
    try {
      const response = await getCandidateConflictingExams(examId);
      setConflictingExams(response.data || []);
      setHasConflicts(response.data.length > 0); // Set flag if conflicts exist

      // If conflicts are found, show a notification
      if (response.data.length > 0) {
        notification.warning({
          message: 'Conflicting Exams Detected',
          description: 'There are conflicting exams for some of the selected candidates. Click "Show Conflicts" to view.',
          icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
          placement: 'topRight',
        });
      }
    } catch (error) {
      message.error('Failed to check for conflicting exams');
    }
  };

  const handleGroupSearch = (searchTerm: string) => {
    setFilteredGroups(
      !searchTerm
        ? candidateGroups
        : candidateGroups.filter((group) =>
          group.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  };

  const handleCandidateSearch = (searchTerm: string) => {
    setFilteredCandidates(
      !searchTerm
        ? individualCandidates
        : individualCandidates.filter(
          (candidate) =>
            `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  };

  const onGroupSelect = (groupId: number) => {
    const selectedGroup = candidateGroups.find((group) => group.id === groupId);
    if (selectedGroup) {
      const newCandidates = selectedGroup.candidates.filter(
        (candidate) => !selectedCandidates.some((c) => c.id === candidate.id)
      );

      if (newCandidates.length > 0) {
        setSelectedCandidates([...selectedCandidates, ...newCandidates]);
        newCandidates.forEach((candidate) => {
          message.success(`${candidate.firstName} ${candidate.lastName} added to the list`);
        });
      } else {
        message.warning('All candidates in this group are already in the list');
      }
    }
  };

  const onCandidateSelect = (candidateId: number) => {
    const candidate = individualCandidates.find((c) => c.id === candidateId);
    if (candidate) {
      addCandidate(candidate);
    }
  };

  const addCandidate = (candidate: Candidate) => {
    if (!selectedCandidates.some((c) => c.id === candidate.id)) {
      setSelectedCandidates([...selectedCandidates, candidate]);
      message.success(`${candidate.firstName} ${candidate.lastName} added to the list`);
    } else {
      message.warning(`${candidate.firstName} ${candidate.lastName} is already in the list`);
    }
  };

  const removeCandidate = (candidateId: number) => {
    setSelectedCandidates(selectedCandidates.filter((c) => c.id !== candidateId));
    message.info('Candidate removed from the list');
  };

  const saveCandidates = async () => {
    const candidateEmails: CandidateEmailListRequest = {
      emails: selectedCandidates.map((c) => c.email),
    };
    const examId = sessionStorage.getItem('examId');

    if (!examId) {
      message.error('Exam ID is missing');
      return;
    }

    try {
      await updateExamCandidates(Number(examId), candidateEmails);
      message.success('Candidates successfully updated for the exam');
      loadExamCandidates(Number(examId)); // Refresh the added candidates

      // After saving candidates, check for conflicts
      checkForConflicts(Number(examId));
    } catch (error) {
      message.error('Failed to update candidates for the exam');
      console.error(error);
    }
  };

  const showConflictingExams = () => {
    Modal.warning({
      title: 'Conflicting Exams',
      content: (
        <List
          bordered
          dataSource={conflictingExams}
          renderItem={(item: any) => (
            <List.Item key={item.studentId}>
              <List.Item.Meta
                title={`${item.firstName} ${item.lastName}`}
                description={`Exam: ${item.title} | Start: ${item.startDatetime} | End: ${item.endDatetime}`}
              />
            </List.Item>
          )}
        />
      ),
      okText: 'Understood',
    });
  };

  return (
    <Card>
      <Title level={4}>Add Candidates for Exam</Title>

      {hasConflicts && (
        <Card
          style={{
            backgroundColor: '#fff4f4',
            border: '1px solid red',
            marginBottom: '16px',
          }}
        >
          <Row>
            <Col span={24}>
              <ExclamationCircleOutlined style={{ color: 'red', marginRight: '8px' }} />
              <strong>There are conflicting exams for some of the candidates.</strong>
              <Button type="link" onClick={showConflictingExams} style={{ marginLeft: '10px' }}>
                Show Conflicts
              </Button>
            </Col>
          </Row>
        </Card>
      )}

      <Row gutter={16}>
        <Col span={12}>
          <Select
            showSearch
            placeholder="Search and select candidate group"
            onSearch={handleGroupSearch}
            onSelect={onGroupSelect}
            style={{ width: '100%', marginBottom: '16px' }}
            filterOption={false}
          >
            {filteredGroups.map((group) => (
              <Option key={group.id} value={group.id}>
                {group.name}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={12}>
          <Select
            showSearch
            placeholder="Search and select individual candidate"
            onSearch={handleCandidateSearch}
            onSelect={onCandidateSelect}
            style={{ width: '100%', marginBottom: '16px' }}
            filterOption={false}
          >
            {filteredCandidates.map((candidate) => (
              <Option key={candidate.id} value={candidate.id}>
                {`${candidate.firstName} ${candidate.lastName}`}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col span={24}>
          <List
            header={<strong>Selected Candidates</strong>}
            bordered
            dataSource={selectedCandidates}
            renderItem={(item) => (
              <List.Item actions={[<a onClick={() => removeCandidate(item.id)}>Remove</a>]}>
                <List.Item.Meta
                  title={`${item.firstName} ${item.lastName}`}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Button type="primary" onClick={saveCandidates} style={{ width: '100%' }}>
            Save Candidates
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default AddCandidate;
