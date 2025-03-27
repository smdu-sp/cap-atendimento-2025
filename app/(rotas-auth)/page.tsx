/** @format */

import BigNumbers from '@/components/big-numbers';
import { AgendamentoNoTempo } from '@/components/charts/agendamentos-no-tempo';
import { AgendamentosPorCoordenadoria } from '@/components/charts/agendamentos-por-coordenadoria';
import { AgendamentosPorMotivo } from '@/components/charts/agendamentos-por-motivo';
import { Filter } from '@/components/filter';
import { auth } from '@/lib/auth/auth';
import { dashboard } from '@/services/agendamentos/query-functions/dashboard';
import { listaCompleta as listaCoordenadorias } from '@/services/coordenadorias/query-functions/lista-completa';
import { listaCompleta as listaMotivos } from '@/services/motivos/query-functions/lista-completa';
import { IDashboardAgendamento } from '@/types/agendamentos';
import { redirect } from 'next/navigation';

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
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

	const motivos = await listaMotivos(session.access_token);
	const coordenadorias = await listaCoordenadorias(session.access_token);

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
		<div className=' w-full relative px-0 md:px-8 '>
			<h1 className='text-4xl font-bold mt-5'>Home</h1>
			<div className='flex flex-col gap-5 my-10 w-full'>
				{motivos.data && coordenadorias.data && (
					<Filter
						motivos={motivos.data}
						coordenadorias={coordenadorias.data}
					/>
				)}
				<BigNumbers numbers={[data.totalAno, data.totalMes, data.totalDia]} />
				<div className='grid gap-5'>
					<AgendamentosPorMotivo motivos={data.motivos} />
					<AgendamentosPorCoordenadoria coordenadorias={data.coordenadorias} />
					<AgendamentoNoTempo agendamentosMes={data.agendamentosMes} />
				</div>
			</div>
		</div>
	);
}
