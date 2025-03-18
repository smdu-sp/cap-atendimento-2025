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
	{ motivo: 'COMUNICADO', Agendamentos: 275, fill: 'var(--color-COMUNICADO)' },
	{ motivo: 'RECURSO', Agendamentos: 200, fill: 'var(--color-RECURSO)' },
	{ motivo: 'CONSULTA', Agendamentos: 187, fill: 'var(--color-CONSULTA)' },
	{ motivo: 'ENT_RET', Agendamentos: 173, fill: 'var(--color-ENT_RET)' },
	{ motivo: 'COM_INDEF', Agendamentos: 90, fill: 'var(--color-COM_INDEF)' },
	{ motivo: 'N_FSP', Agendamentos: 90, fill: 'var(--color-N_FSP)' },
	{ motivo: 'VI', Agendamentos: 90, fill: 'var(--color-VI)' },
	{ motivo: 'VPF', Agendamentos: 90, fill: 'var(--color-VPF)' },
	{ motivo: 'EVENTO', Agendamentos: 90, fill: 'var(--color-EVENTO)' },
];

const chartConfig = {
	Agendamentos: {
		label: 'Agendamentos',
	},
	COMUNICADO: {
		label: 'Atendimento Técnico - Comunicado',
		color: 'hsl(var(--chart-1))',
	},
	RECURSO: {
		label: 'Atendimento Técnico - Recurso',
		color: 'hsl(var(--chart-2))',
	},
	CONSULTA: {
		label: 'Sala Arthur Saboya (Consulta Pré-Projeto)',
		color: 'hsl(var(--chart-3))',
	},
	ENT_RET: {
		label: 'Protocolo (Entrega / Retirada de Documentos Físicos)',
		color: 'hsl(var(--chart-4))',
	},
	COM_INDEF: {
		label: 'Protocolo (Comunicado / Indeferimento)',
		color: 'hsl(var(--chart-5))',
	},
	N_FSP: {
		label: 'Notificação - Função Social da Propriedade',
		color: 'hsl(var(--chart-6))',
	},
	VI: {
		label: 'Visita Institucional',
		color: 'hsl(var(--chart-7))',
	},
	VPF: {
		label: 'Vistas a Processo Físico',
		color: 'hsl(var(--chart-8))',
	},
	EVENTO: {
		label: 'Evento',
		color: 'hsl(var(--chart-9))',
	},
} satisfies ChartConfig;

export function AgendamentosPorMotivo() {
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
