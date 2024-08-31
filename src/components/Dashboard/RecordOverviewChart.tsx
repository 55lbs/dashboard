'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { ChartConfig, ChartContainer } from '@55lbs/components';
const chartData = [
  { browser: 'safari', visitors: 25, fill: 'var(--color-safari)' },
];

const chartConfig: ChartConfig = {
  visitors: {
    label: 'Visitors',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

const angles = 60;

export function RecordOverviewChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-32"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={90}
        innerRadius={angles * 0.72}
        outerRadius={angles}
      >
        <RadialBar dataKey="visitors" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-background text-2xl font-bold"
                    >
                      {chartData[0].visitors.toLocaleString()}%
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
