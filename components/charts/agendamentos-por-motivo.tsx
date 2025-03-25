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

interface AgendamentosPorMotivoProps {
	motivos: IChart[];
}

export function AgendamentosPorMotivo({ motivos }: AgendamentosPorMotivoProps) {
	console.log(motivos);
	let chartConfig: any = {
		Agendamentos: {
			label: 'Agendamentos',
		}
	} satisfies ChartConfig;

	motivos.sort((a, b) => b.value - a.value);
	motivos.forEach((item, index) => {
		chartConfig[item.label] = {
			label: item.label,
			color: `hsl(var(--chart-${index + 1}))`,
		};
	});

	// const chartConfig2 = motivos.map((item, index) => {
	// 	return {
	// 		Agendamentos: {
	// 			label: 'Agendamentos',
	// 		},
	// 		[item.label]: {
	// 			label: item.label,
	// 			color: `hsl(var(--chart-${index + 1}))`,
	// 		},
	// 	} satisfies ChartConfig;
	// });

	// const chartData2 = motivos.map((item) => {
	// 	return {
	// 		motivo: item.label,
	// 		agendamentos: item.value,
	// 		fill: `var(--color-${item.label})`,
	// 	};
	// });

	const chartData = motivos.map((item, index) => {
		return {
			motivo: item.label,
			Agendamentos: item.value,
			fill: `hsl(var(--chart-${index + 1}))`,
		};
	});
	return (
		<Card className='flex flex-col'>
			<CardHeader className='items-start pb-0'>
				<CardTitle className='text-xl'>Agendamentos Por Motivo</CardTitle>
				<CardDescription>Número de agendamentos por motivo</CardDescription>
			</CardHeader>
			<CardContent className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square w-full max-h-[300px] flex items-center justify-center'>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
						}}>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='line' />}
						/>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='motivo'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<Bar
							data={chartData}
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
