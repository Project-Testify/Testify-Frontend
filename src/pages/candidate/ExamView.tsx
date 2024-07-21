import { Row } from 'antd';
import { McqQuestionView } from '../../components';
import { TimeContainer } from '../../components';
import './ExamView.css';

import {
  HomeOutlined,
  ContainerOutlined,
} from '@ant-design/icons';

import {
  PageHeader,
} from '../../components';

import { Helmet } from 'react-helmet-async';



export const ExamViewPage = () => {
    
    return (

        <div style={{ padding: '20px' }}>
        <Helmet>
          <title>Testify | Machine Learning - Quiz 3</title>
        </Helmet>
        <PageHeader
          title="Machine Learning - Quiz 3"
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
                  <ContainerOutlined />
                  <span>Machine Learning - Quiz 3</span>
                </>
              ),
              path: '/',
            }
          ]}
        />

        <Row gutter={[16, 16]}>
             {/* ----------------Time Container----------------- */}
            <TimeContainer/>
            {/* ----------------Question Container----------------- */}
            <McqQuestionView
                    question="9. Which of the following algorithms is typically used for classification tasks in machine learning?"
                    options={[
                        'K-Means Clustering',
                        'Linear Regression',
                        'Support Vector Machine (SVM)',
                        'Principal Component Analysis (PCA)',
                    ]}
                    onNext={() => {}}
                    onPrevious={() => {}}
            />
        </Row>
        </div>
    );

};