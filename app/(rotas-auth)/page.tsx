/** @format */

import BigNumbers from '@/components/big-numbers';
import { AgendamentoNoTempo } from '@/components/charts/agendamentos-no-tempo';
import { AgendamentosPorCoordenadoria } from '@/components/charts/agendamentos-por-coordenadoria';
import { AgendamentosPorMotivo } from '@/components/charts/agendamentos-por-motivo';
import { Filter } from '@/components/filter';
import { dashboard } from '@/services/agendamentos/query-functions/dashboard';
import { IDashboardAgendamento } from '@/types/agendamentos';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const {
		dataInicio,
		dataFim,
		motivoId = '',
		coordenadoriaId = '',
	} = await searchParams;

	const resp = await dashboard(
		motivoId.toString(),
		coordenadoriaId.toString(),
		dataInicio ? String(dataInicio) : '',
		dataFim ? String(dataFim) : '',
	);

	if (!resp || !resp.ok) {
		return (
			<p className='text-muted-foreground text-sm italic'>
				Dados não encontrados
			</p>
		);
	}

	const data = resp.data as IDashboardAgendamento;

	if (!data) {
		return (
			<p className='text-muted-foreground text-sm italic'>
				Dados não encontrados
			</p>
		);
	}
	return (
		<div className=' w-full relative px-4 md:px-8 '>
			<h1 className='text-4xl font-bold mt-5'>Home</h1>
			<div className='flex flex-col gap-5 my-10'>
				<Filter />
				<BigNumbers numbers={[data.totalAno, data.totalMes, data.totalDia]} />
				<div className='grid gap-5'>
					<AgendamentosPorMotivo motivos={data.motivos} />
					<AgendamentosPorCoordenadoria />
					<AgendamentoNoTempo />
				</div>
			</div>
		</div>
	);
}
