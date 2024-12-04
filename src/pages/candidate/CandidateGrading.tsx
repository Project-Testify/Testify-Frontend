import React, { useEffect, useState } from "react";
import { Button, Flex, Table, Typography, notification } from "antd";
import axios from "axios";

export const CandidateGrading = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from API
  const fetchGrades = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const userString = sessionStorage.getItem('user');
    if (!userString || !accessToken) {
      console.error("User information or token not found in session storage.");
      return;
    }

    const user = JSON.parse(userString);
    const candidateId = user?.id;

    if (!accessToken || !candidateId) {
      notification.error({
        message: "Error",
        description: "Missing authorization token or candidate ID.",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/candidate/${candidateId}/exam-details`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Map API response to table data
      const formattedData = response.data.map((item:any, index:any) => ({
        key: index + 1,
        org_name: item.organizationName,
        exam_name: item.examName,
        grade: item.grade,
        score: item.score,
        exam_id: index + 1,
      }));

      setGrades(formattedData);
    } catch (error) {
      console.error("Failed to fetch grades:", error);
      notification.error({
        message: "Error",
        description: "Failed to fetch grading data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const columns = [
    {
      title: "Organization Name",
      dataIndex: "org_name",
      key: "org_name",
    },
    {
      title: "Exam Name",
      dataIndex: "exam_name",
      key: "exam_name",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Flex>
          <Button type="primary">
            <a href="#">View Exam</a>
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={1}>Grading</Typography.Title>
      <Table columns={columns} dataSource={grades} loading={loading} />
    </div>
  );
};
