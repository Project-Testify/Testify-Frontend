import { Card, Typography } from "antd";
import { Bar, Line } from "@ant-design/charts";

export const ExamStatCard = ({data, chartType}: { data: any[], chartType: string }) => {
  const totalExams = data.reduce((acc: any, exam:any) => acc + exam.value, 0);
  
  //default eka column chart
  const barConfig = {
    data,
    xField: 'value',
    yField: 'type',
    //seriesField: 'type', legend ekak enwa
    //barWidthRatio: 0.7, // Adjust the bar width ratio
    
    // label: {
    //   position: 'middle',
    //   style: {
    //     fill: '#FFFFFF',
    //     fontSize: 12,
    //     fontWeight: 'bold',
    //   },
    // },
    // meta: {
    //   type: { alias: 'Exam Type' },
    //   value: { alias: 'Count' },
    // },
    // xAxis: {
    //   label: {
    //     style: {
    //       fill: '#8C8C8C',
    //     },
    //   },
    // },
    // yAxis: {
    //   label: {
    //     style: {
    //       fill: '#8C8C8C',
    //     },
    //   },
    // },
    // barStyle: {
    //   radius: [5, 5, 0, 0], // Set the border radius
    // },
    // intervalPadding: 2, // Adjust the space between bars
    // marginRatio: 0.1, // Adjust the margin ratio between bars
  };

  //line chart ekata
  const lineConfig = {
    data,
    xField: 'date',
    yField: 'count',
    seriesField: 'type',
    smooth: true,
    color: '#0088FE',
    label: {
      style: {
        fill: '#8C8C8C',
        fontSize: 12,
      },
    },
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#0088FE',
        lineWidth: 2,
      },
    },
    xAxis: {
      label: {
        style: {
          fill: '#8C8C8C',
        },
      },
      title: {
        text: 'Date',
        style: {
          fill: '#8C8C8C',
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: '#8C8C8C',
        },
      },
      title: {
        text: 'Participation Count',
        style: {
          fill: '#8C8C8C',
        },
      },
    },
    tooltip: {
      showMarkers: true,
    },
    interactions: [{ type: 'element-active' }],
  };
  

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar {...barConfig} />;
      case 'line':
        return <Line {...lineConfig} />;
      default:
        return <Bar {...barConfig} />;
    }
  };
  
  const getTitle = () => {
    switch (chartType) {
      case 'bar':
        return { text: 'Total Exams', description:totalExams };
      case 'line':
        return { text: 'Exam Participation', description:"" };
      default:
        return { text: 'Total Exams', description:{totalExams} };
    }
  };

  const {text, description} = getTitle();
  
  return (
    <Card style={{ width:'100%', padding:'10px'}}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography.Title level={5} style={{marginTop:'0px' , marginBottom:'10px'}}>{text}</Typography.Title>
        <Typography.Title level={5} style={{marginTop:'0px', marginBottom:'10px'}}>{description}</Typography.Title>
      </div>
      <div style={{ height: '250px' }}>
        {renderChart()}
      </div>
    </Card>

  );
};
