import { Col, Form, Select, Tabs, Divider, Button, Typography, Input } from 'antd';
import { useFetchData } from '../../hooks';

export const GradingAndProctoring = () => {
  const { data: gradingCriteriaData } = useFetchData('../mocks/GradingCriteria.json');
  const { data: proctorsData } = useFetchData('../mocks/ProctorsMock.json');
  const form = Form.useFormInstance();

  const options = (proctorsData || []).map((proctor: any) => ({
    label: proctor.name,
    value: proctor.name,
  }));

  return (
    <>
      <Typography.Title level={3}>Add Grading</Typography.Title>
      <Divider />
      <Form form={form}>
        <Tabs
          tabPosition="left"
          items={[
            ...gradingCriteriaData.map((criteria: any, index: number) => ({
              label: `Grading Criteria ${index + 1}`,
              key: `${index + 1}`,
              children: <StandardGrading criteria={criteria.gradingCriteria} />,
            })),
            {
              label: 'Customized',
              key: `${gradingCriteriaData.length + 1}`,
              children: <CustomGrading />,
            },
          ]}
        />
        <Divider />
        <Typography.Title level={3}>Add Proctors</Typography.Title>
        <Form.Item name="proctors" label="Proctors">
          <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Please select" options={options} />
        </Form.Item>
        <Divider />
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </>
  );
};

const StandardGrading = ({ criteria }: { criteria: any[] }) => (
  <>
    {criteria.map((criterion) => (
      <Form.Item key={criterion.id} label="Grade" name={`grade_${criterion.id}`} initialValue={criterion.grade}>
        <Input disabled />
      </Form.Item>
    ))}
  </>
);

const CustomGrading = () => (
  <Form.List name="gradingCriteria">
    {(fields, { add, remove }) => (
      <>
        {fields.map((field) => (
          <Form.Item key={field.key}>
            <Input placeholder="Grade" />
          </Form.Item>
        ))}
        <Button onClick={() => add()} type="dashed" block>
          Add Grade
        </Button>
      </>
    )}
  </Form.List>
);
