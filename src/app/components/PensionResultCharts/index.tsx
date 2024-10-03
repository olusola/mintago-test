import {
  desiredPensionPot,
  jobStartingAge,
  pensionPotAfterRetirement,
  projectedPensionPot,
} from '@/app/helpers';
import { PensionFormValuesTypes } from '@/app/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LineChartCard from '../LineChartCard';

type PensionResultChartsProps = {
  pensionFormValues: PensionFormValuesTypes;
};
const PensionResultCharts = ({
  pensionFormValues,
}: PensionResultChartsProps) => {
  const {
    employerContribution,
    personalContribution,
    desiredIncomePerYear,
    retirementAge,
  } = pensionFormValues;

  const projectedPensionPotData = projectedPensionPot({
    jobStartingAge,
    retirementAge,
    employerContribution,
    personalContribution,
  });

  const pensionPotAfterRetirementData = pensionPotAfterRetirement({
    retirementAge,
    jobStartingAge,
    employerContribution,
    personalContribution,
  });

  const desiredPensionPotData = desiredPensionPot(
    desiredIncomePerYear,
    retirementAge
  );

  return (
    <div className="py-8">
      <div className="font-bold text-2xl">Results</div>
      <Tabs defaultValue="projected" className="w-[400px] mt-5">
        <TabsList>
          <TabsTrigger value="projected">Projected Pension Pot</TabsTrigger>
          <TabsTrigger value="desired">Desired Pension Pot</TabsTrigger>
          <TabsTrigger value="afterRetirement">
            Pension Pot After Retirement
          </TabsTrigger>
        </TabsList>
        <TabsContent value="projected">
          <LineChartCard
            data={projectedPensionPotData}
            xAxisDataKey="age"
            lineChartDatakey="totalContributionWithInterest"
          />
        </TabsContent>

        <TabsContent value="desired">
          <LineChartCard
            data={desiredPensionPotData}
            xAxisDataKey="age"
            lineChartDatakey="contributionToMake"
          />
        </TabsContent>
        <TabsContent value="afterRetirement">
          <LineChartCard
            data={pensionPotAfterRetirementData}
            xAxisDataKey="age"
            lineChartDatakey="pot"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PensionResultCharts;
