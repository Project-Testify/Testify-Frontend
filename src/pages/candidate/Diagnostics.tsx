import { useEffect, useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import {
  // FileProtectOutlined,
  // FileSyncOutlined,
  HomeOutlined,
  ContainerOutlined,
  ControlOutlined,
  VideoCameraOutlined,
  AudioOutlined,
  FullscreenOutlined,
  // SafetyCertificateOutlined,
  // UsergroupAddOutlined,
} from '@ant-design/icons';
import {
  //   CommunityGroupCard,
  //   CoursesCard,
  //   CoursesCarousel,
  //   ExamsCard,
  //   LearningStatsCard,
  PageHeader,
  //   ProgressCard,
  //   StudyStatisticsCard,
} from '../../components';
// import { DASHBOARD_ITEMS } from '../../constants';
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import { useFetchData } from '../../hooks';
// import { useStylesContext } from '../../context';




export const DignosticTestPage = () => {
  // const stylesContext = useStylesContext();
  // const {
  //   data: coursesData,
  //   loading: coursesDataLoading,
  //   error: coursesDataError,
  // } = useFetchData('../mocks/Courses.json');
  // const {
  //   data: studyData,
  //   loading: studyDataLoading,
  //   error: studyDataError,
  // } = useFetchData('../mocks/StudyStatistics.json');
  // const {
  //   data: recommendedCoursesData,
  //   loading: recommendedCoursesDataLoading,
  //   error: recommendedCoursesDataError,
  // } = useFetchData('../mocks/RecommendedCourses.json');
  // const {
  //   data: examsData,
  //   loading: examsDataLoading,
  //   error: examsDataError,
  // } = useFetchData('../mocks/Exams.json');
  // const {
  //   data: communitiesData,
  //   loading: communitiesDataLoading,
  //   error: communitiesDataError,
  // } = useFetchData('../mocks/CommunityGroups.json');


  // --------------Fullscreen Component----------------

  const handleWebcamAccess = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => console.log('Webcam access granted'))
      .catch(err => console.error('Webcam access denied', err));
  };
  
  const handleMicrophoneAccess = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => console.log('Microphone access granted'))
      .catch(err => console.error('Microphone access denied', err));
  };
  
  
  // const handleFullscreen = () => {
  //   if (document.documentElement.requestFullscreen) {
  //     document.documentElement.requestFullscreen();
  //   }
  // };

  const [isFullscreen,setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  };
  
  
  
  const steps = [
    {
      title: '',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '45vh', justifyContent: 'center' }}>
          <VideoCameraOutlined style={{ fontSize: '100px'}} />
          <span style={{ fontSize: '22px', marginTop: '-100px' }}>
            Allow access to your web camera
          </span>
          <Button type="primary" style={{ marginTop: '-60px' }} onClick={handleWebcamAccess}>
            Allow Webcam Access
          </Button>
        </div>
      ),
    },
    {
      title: '',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '45vh', justifyContent: 'center' }}>
          <AudioOutlined style={{ fontSize: '100px'}} />
          <span style={{ fontSize: '22px', marginTop: '-100px' }}>
            Allow access to your microphone
          </span>
          <Button type="primary" style={{ marginTop: '-60px' }} onClick={handleMicrophoneAccess}>
            Allow Microphone Access
          </Button>
        </div>
      ),
    },
    {
      title: '',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '45vh', justifyContent: 'center' }}>
          <FullscreenOutlined style={{ fontSize: '100px'}} />
          <span style={{ fontSize: '22px', marginTop: '-100px' }}>
            Enable fullscreen mode
          </span>
          {!isFullscreen && (
            <Button type="primary" style={{ marginTop: '-60px' }} onClick={handleFullscreen}>
              Enable Fullscreen
            </Button>
          )}
        </div>
      ),
    },
  ];

  


  // Function to log when exiting fullscreen mode
  const onFullscreenChange = () => {
    if (
      !document.fullscreenElement
    ) {
      console.log('User exited full screen');
      setIsFullscreen(false);
    } else {
      setIsFullscreen(true);
    }
  };

  useEffect(() => {
    // Add event listeners for fullscreen change
    document.addEventListener('fullscreenchange', onFullscreenChange);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);


  

  // --------------Steps Component----------------

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div>
      <Helmet>
        <title>Testify | System Diagnostics Test</title>
      </Helmet>
      <PageHeader
        title="System Diagnostics Test"
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
            // menu: {
            //   items: DASHBOARD_ITEMS.map((d) => ({
            //     key: d.title,
            //     title: <Link to={d.path}>{d.title}</Link>,
            //   })),
            // },
          },
          {
            title: (
              <>
                <ControlOutlined />
                <span>System Diagnostics Test</span>
              </>
            ),
            path: '/',
          },
        ]}
      />
      {/* {!isFullscreen && (
        <Button type="primary" onClick={requestFullScreen}>
          Enter Fullscreen
        </Button>
      )} */}
      {
        <>
          <Steps current={current} items={items} />
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </>
      /* <Row {...stylesContext?.rowProps}>
        <Col xs={24} xl={18}>
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} sm={12} xl={6}>
              <LearningStatsCard
                title="Courses in Progress"
                value={18}
                icon={FileSyncOutlined}
                color="teal"
                progress={30}
                style={{ height: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <LearningStatsCard
                title="Courses completed"
                value={97}
                icon={FileProtectOutlined}
                color="green"
                progress={90}
                style={{ height: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <LearningStatsCard
                title="Certificates earned"
                value={62}
                icon={SafetyCertificateOutlined}
                color="blue"
                progress={76}
                style={{ height: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <LearningStatsCard
                title="Community support"
                value={245}
                icon={UsergroupAddOutlined}
                color="purple"
                progress={78}
                style={{ height: '100%' }}
              />
            </Col>
            <Col xs={24} xl={12}>
              <ProgressCard style={{ height: '100%' }} />
            </Col>
            <Col xs={24} xl={12}>
              <StudyStatisticsCard
                data={studyData}
                loading={studyDataLoading}
                error={studyDataError}
              />
            </Col>
            <Col span={24}>
              <CoursesCard
                data={coursesData}
                loading={coursesDataLoading}
                error={coursesDataError}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} xl={6}>
          <Row {...stylesContext?.rowProps}>
            <Col span={24}>
              <ExamsCard
                data={examsData}
                loading={examsDataLoading}
                error={examsDataError}
              />
            </Col>
            <Col span={24}>
              <CommunityGroupCard
                data={communitiesData}
                loading={communitiesDataLoading}
                error={communitiesDataError}
              />
            </Col>
            <Col span={24}>
              <CoursesCarousel
                data={recommendedCoursesData}
                loading={recommendedCoursesDataLoading}
                error={recommendedCoursesDataError}
              />
            </Col>
          </Row>
        </Col>
      </Row> */}
    </div>
  );
};
