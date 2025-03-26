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
import { IChart } from '@/types/agendamentos';

interface AgendamentosPorCategoriaProps {
	coordenadorias: IChart[];
}

export function AgendamentosPorCoordenadoria({ coordenadorias }: AgendamentosPorCategoriaProps) {
	const chartConfig: any = {
		Agendamentos: {
			label: 'Agendamentos',
		},
	} satisfies ChartConfig;

	coordenadorias.sort((a, b) => b.value - a.value);
	coordenadorias.forEach((item, index) => {
		chartConfig[item.label] = {
			label: item.label,
			color: `hsl(var(--chart-${index + 1}))`,
		};
	});

	const chartData = coordenadorias.map((item, index) => {
		return {
			motivo: item.label,
			Agendamentos: item.value,
			fill: `hsl(var(--chart-${index + 1}))`,
		};
	});
	
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
