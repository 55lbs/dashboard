'use client';

import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Rectangle,
  XAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@55lbs/components';

export const description = 'A bar chart with an active bar';
const chartData = [
  { browser: 'chrome', visitors: 10, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 20, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 24, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 30, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 40, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 55, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 65, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 60, fill: 'var(--color-firefox)' },
  { browser: 'chrome', visitors: 53, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 40, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 30, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 20, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 10, fill: 'var(--color-chrome)' },
  { browser: 'chrome', visitors: 5, fill: 'var(--color-chrome)' },
];
const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function InsightChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your RP vs 55lbs database</CardTitle>
        <CardDescription>Your are 87% greater than other users</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="browser"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="visitors"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
