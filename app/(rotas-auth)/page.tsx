/** @format */

import BigNumbers from '@/components/big-numbers';
import { AgendamentoNoTempo } from '@/components/charts/agendamentos-no-tempo';
import { AgendamentosPorCoordenadoria } from '@/components/charts/agendamentos-por-coordenadoria';
import { AgendamentosPorMotivo } from '@/components/charts/agendamentos-por-motivo';
import { Filter } from '@/components/filter';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function Home() {
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle className='text-4xl font-bold'>Home</CardTitle>
					<CardDescription>Resumo dos agendamentos programados</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-10'>
					<Filter />
					<BigNumbers />
					<div className='grid grid-cols-2 gap-5'>
						<AgendamentosPorMotivo />
						<AgendamentosPorCoordenadoria />
					</div>
					<div>
						<AgendamentoNoTempo />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
