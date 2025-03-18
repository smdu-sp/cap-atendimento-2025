/** @format */

'use client';

import { Label, Pie, PieChart } from 'recharts';

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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import React from 'react';
const chartData = [
	{ browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
	{ browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
	{ browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
	{ browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
	{ browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const chartConfig = {
	visitors: {
		label: 'Agendamentos',
	},
	chrome: {
		label: 'Saúde',
		color: 'hsl(var(--chart-1))',
	},
	safari: {
		label: 'Meio Ambiente',
		color: 'hsl(var(--chart-2))',
	},
	firefox: {
		label: 'Educação',
		color: 'hsl(var(--chart-3))',
	},
	edge: {
		label: 'Urbanismo',
		color: 'hsl(var(--chart-4))',
	},
	other: {
		label: 'Esporte',
		color: 'hsl(var(--chart-5))',
	},
} satisfies ChartConfig;

export function AgendamentosPorCoordenadoria() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);
	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-start pb-0'>
				<CardTitle>Agendamentos Por Coordenadoria</CardTitle>
				<CardDescription>
					Número de agendamentos por coordenadoria
				</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[300px]'>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									nameKey='browser'
									indicator='line'
								/>
							}
						/>
						<Pie
							data={chartData}
							innerRadius={60}
							dataKey='visitors'
							strokeWidth={5}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor='middle'
												dominantBaseline='middle'>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className='fill-foreground text-3xl font-bold'>
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className='fill-muted-foreground'>
													Agendamentos
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
						<ChartLegend
							content={<ChartLegendContent nameKey='browser' />}
							className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center text-nowrap'
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
