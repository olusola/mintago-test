import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type LineChartCardProps = {
  lineChartDatakey: string;
  xAxisDataKey: string;
  data: Array<{ [key: string]: number } | []>;
};

const LineChartCard = ({
  lineChartDatakey,
  xAxisDataKey,
  data,
}: LineChartCardProps) => {
  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey={lineChartDatakey} />
      <XAxis dataKey={xAxisDataKey} />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
    </LineChart>
  );
};

export default LineChartCard;
