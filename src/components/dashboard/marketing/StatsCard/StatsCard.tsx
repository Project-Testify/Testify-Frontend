import { CardProps, Flex,Typography } from 'antd';
import { Card } from '../../../index.ts';
import { Pie } from '@ant-design/charts';

type ChartData = {type:string, value:number}[];

type StatsBarChartProps = {
  data: ChartData;
};

// const ColumnChart = ({ data, color }: StatsColumnChartProps) => {
//   const brandColor = color || '#5B8FF9';
//   const config = {
//     height: 64,
//     autoFit: true,
//     data,
//     color: brandColor,
//     tooltip: {
//       customContent: function (x: any, data: any) {
//         return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
//       },
//     },
//   };
//   return <TinyColumn {...config} />;
// };

const PieChart = ({data}: StatsBarChartProps)=>{

  const config = {
    data,
    height:100,
    autofit:true,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{percentage}',
    },
  };

  return <Pie {...config}/>
}

type Props = {
  title: string;
  data: ChartData;
  asCurrency?: boolean;
} & CardProps;

export const StatsCard = ({
  title,
  data,
  ...others
}: Props) => {
  return (
    <Card {...others}>
      <Flex vertical justify='space-between'>
        <Typography.Title level={4} style={{marginTop:0}}>
          {title}
        </Typography.Title>
        
        <PieChart data={data}/>
         
      </Flex>
    </Card>
  );
};
