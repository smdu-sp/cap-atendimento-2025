/** @format */

'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

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
	{ motivo: 'RESID', Agendamentos: 275, fill: 'var(--color-agendamentos)' },
	{ motivo: 'SERVIN', Agendamentos: 200, fill: 'var(--color-agendamentos)' },
	{ motivo: 'GTEC', Agendamentos: 187, fill: 'var(--color-agendamentos)' },
	{ motivo: 'PARHIS', Agendamentos: 173, fill: 'var(--color-agendamentos)' },
	{ motivo: 'CAP', Agendamentos: 90, fill: 'var(--color-agendamentos)' },
	{ motivo: 'COMIN', Agendamentos: 190, fill: 'var(--color-agendamentos)' },
	{ motivo: 'CONTRU', Agendamentos: 170, fill: 'var(--color-agendamentos)' },
	{ motivo: 'CAEPP', Agendamentos: 150, fill: 'var(--color-agendamentos)' },
	{ motivo: 'ASCOM', Agendamentos: 145, fill: 'var(--color-agendamentos)' },
	{ motivo: 'ATIC', Agendamentos: 86, fill: 'var(--color-agendamentos)' },
	{ motivo: 'ATECC', Agendamentos: 92, fill: 'var(--color-agendamentos)' },
	{ motivo: 'CASE', Agendamentos: 96, fill: 'var(--color-agendamentos)' },
	{ motivo: 'DEUSO', Agendamentos: 160, fill: 'var(--color-agendamentos)' },
	{ motivo: 'GAB', Agendamentos: 140, fill: 'var(--color-agendamentos)' },
	{ motivo: 'GAB/CI', Agendamentos: 130, fill: 'var(--color-agendamentos)' },
	{ motivo: 'GEOINFO', Agendamentos: 120, fill: 'var(--color-agendamentos)' },
	{ motivo: 'LICEN', Agendamentos: 110, fill: 'var(--color-agendamentos)' },
	{ motivo: 'PLANURB', Agendamentos: 124, fill: 'var(--color-agendamentos)' },
	{ motivo: 'STEL', Agendamentos: 144, fill: 'var(--color-agendamentos)' },
	{ motivo: 'URB', Agendamentos: 122, fill: 'var(--color-agendamentos)' },
];

const chartConfig = {
	agendamentos: {
		label: 'Agendamentos',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export function AgendamentosPorCoordenadoria() {
	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-start pb-0'>
				<CardTitle className='text-xl'>
					Agendamentos Por Coordenadoria
				</CardTitle>
				<CardDescription>
					Número de agendamentos por coordenadoria
				</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto w-full max-h-[300px] flex items-center justify-center'>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
						}}>
						<defs>
							<linearGradient
								id='fillCoordenadoria'
								x1='0'
								y1='1'
								x2='0'
								y2='1'>
								<stop
									offset='5%'
									stopColor='var(--color-agendamentos)'
									stopOpacity={0.8}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-agendamentos)'
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='motivo'
							tickLine={false}
							tickMargin={12}
							axisLine={false}
						/>

						<Bar
							data={chartData}
							fill='url(#fillCoordenadoria'
							radius={8}
							strokeWidth={2}
							dataKey='Agendamentos'>
							<LabelList
								position='top'
								offset={8}
								className='fill-foreground'
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
