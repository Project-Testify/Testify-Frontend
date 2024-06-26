import { PageHeader } from '../../components';

import {
  BankOutlined,
  HomeOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

export const Exam = () => {
  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'All exams'}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <BankOutlined />
                <span>Exams</span>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};
