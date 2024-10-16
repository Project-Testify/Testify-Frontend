import { useState } from 'react';
import { Card, FormInstance, Space } from 'antd';
import { McqQuestion } from './McqQuestion';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AddQuestion } from '../../pages/orgadmin/AddQuestion';


interface QuestionCardProps {
  fieldName?: {
    key: number;
    name: string;

  } | null;
  form: FormInstance;
  remove?: (name: number) => void;
}


const tabList = [
  {
    key: 'mcq',
    tab: 'MCQ',
  },
  {
    key: 'structured',
    tab: 'Structured',
  },
];

export const QuestionCard: React.FC<QuestionCardProps> = ({ fieldName = null, form }) => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('mcq');

  const contentList: Record<string, React.ReactNode> = {
    mcq: <McqQuestion field={fieldName} form={form} />,
    structured: <p>content2</p>,
  };

  const modelContent : Record<string, React.ReactNode> = {
    mcq: <AddQuestion form={form} />,
    structured: <p>content2</p>,
  };

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  if (fieldName === null) {
    return (
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {modelContent[activeTabKey1]}
      </Card>
    );
  }

  return (
    <Card
      style={{ width: '100%' }}
      tabList={tabList}
      activeTabKey={activeTabKey1}
      tabBarExtraContent={
        <Space>
          <Link to={`/question/${fieldName.key}`}>
            <EditOutlined />
          </Link>
          {/* <CloseOutlined
            onClick={() => {
              remove(fieldName.name);
            }}
          /> */}
        </Space>
      }
      onTabChange={onTab1Change}
      tabProps={{
        size: 'middle',
      }}
    >
      {contentList[activeTabKey1]}
    </Card>
  );
};
