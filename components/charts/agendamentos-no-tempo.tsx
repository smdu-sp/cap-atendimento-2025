/** @format */

'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
	{ month: 'January', Agendamentos: 186 },
	{ month: 'February', Agendamentos: 305 },
	{ month: 'March', Agendamentos: 237 },
	{ month: 'April', Agendamentos: 73 },
	{ month: 'May', Agendamentos: 209 },
	{ month: 'June', Agendamentos: 214 },
];

const chartConfig = {
	Agendamentos: {
		label: 'Agendamentos',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export function AgendamentoNoTempo() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Agendamentos</CardTitle>
				<CardDescription>
					Número de agendamentos no tempo definido
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					className='w-full max-h-60'
					config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>
						<Area
							dataKey='Agendamentos'
							type='natural'
							fill='var(--color-Agendamentos)'
							fillOpacity={0.4}
							stroke='var(--color-Agendamentos)'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
