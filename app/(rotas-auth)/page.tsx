/** @format */

import BigNumbers from '@/components/big-numbers';
import { AgendamentoNoTempo } from '@/components/charts/agendamentos-no-tempo';
import { AgendamentosPorCoordenadoria } from '@/components/charts/agendamentos-por-coordenadoria';
import { AgendamentosPorMotivo } from '@/components/charts/agendamentos-por-motivo';
import { Filtros } from '@/components/filtros';
import { auth } from '@/lib/auth/auth';
import { dashboard } from '@/services/agendamentos/query-functions/dashboard';
import { listaCompleta as listaCoordenadorias } from '@/services/coordenadorias/query-functions/lista-completa';
import { listaCompleta as listaMotivos } from '@/services/motivos/query-functions/lista-completa';
import { IDashboardAgendamento } from '@/types/agendamentos';
import { ICoordenadoria } from '@/types/coordenadoria';
import { IMotivo } from '@/types/motivo';
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
		periodo = '',
		motivoId = '',
		coordenadoriaId = '',
	} = await searchParams;

	const resp = await dashboard(
		motivoId.toString(),
		coordenadoriaId.toString(),
		periodo.toString(),
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
	const motivosData = motivos.data
		? (motivos.data as IMotivo[]).map((motivo) => ({
				value: motivo.id,
				label: motivo.texto,
		  }))
		: [];
	const coordenadoriasData = coordenadorias.data
		? (coordenadorias.data as ICoordenadoria[]).map((coordenadoria) => ({
				value: coordenadoria.id,
				label: coordenadoria.sigla,
		  }))
		: [];
	if (!data) {
		return (
			<p className='text-muted-foreground text-sm italic'>
				Dados não encontrados
			</p>
		);
	}
	return (
		<div className=' w-full relative px-0 md:px-8 pb-10 md:pb-0'>
			<h1 className='text-xl md:text-4xl font-bold'>Home</h1>
			<div className='flex flex-col gap-5 my-5 w-full'>
				<Filtros
					camposFiltraveis={[
						{
							tag: 'periodo',
							nome: 'Período',
							tipo: 1,
							placeholder: 'Período',
						},
						{
							tag: 'motivoId',
							nome: 'Motivo',
							tipo: 2,
							valores: motivosData || [],
							placeholder: 'Motivos',
						},
						{
							tag: 'coordenadoriaId',
							nome: 'Coordenadoria',
							tipo: 2,
							valores: coordenadoriasData,
							placeholder: 'Coordenadorias',
						},
					]}
				/>
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
