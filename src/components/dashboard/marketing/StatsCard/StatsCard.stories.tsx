import type { Meta, StoryObj } from '@storybook/react';

import { StatsCard } from './StatsCard.tsx';

const STATS = {
  data: [274, 337, 81, 497],
  title: 'impressions',
  diff: 12.5,
  value: 16826,
};

const meta = {
  title: 'Components/Dashboard/Marketing/Stats',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...STATS,
    data: [
      { type: 'Active', value: 274 },
      { type: 'Upcoming', value: 337 },
      { type: 'Completed', value: 81 },
      { type: 'Other', value: 497 }
    ],
    style: { width: 600 },
  },
};

export const AsCurrency: Story = {
  args: {
    ...STATS,
    title: 'Revenue',
    data: [
      { type: 'Active', value: 274 },
      { type: 'Upcoming', value: 337 },
      { type: 'Completed', value: 81 },
      { type: 'Other', value: 497 }
    ],
    asCurrency: true,
    style: { width: 600 },
  },
};
