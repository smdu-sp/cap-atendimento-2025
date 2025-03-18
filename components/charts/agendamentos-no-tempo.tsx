/** @format */

'use client';

import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from 'recharts';

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
				<CardTitle className='text-2xl'>Agendamentos</CardTitle>
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
							top: 20,
						}}>
						<defs>
							<linearGradient
								id='fillDesktop'
								x1='0'
								y1='0'
								x2='0'
								y2='1'>
								<stop
									offset='5%'
									stopColor='var(--color-Agendamentos)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-Agendamentos)'
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
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
							fillOpacity={0.8}
							fill='url(#fillDesktop)'
							stroke='var(--color-Agendamentos)'>
							<LabelList
								position='top'
								offset={8}
								className='fill-foreground'
								fontSize={12}
							/>
						</Area>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
