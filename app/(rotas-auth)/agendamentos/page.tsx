/** @format */

import DataTable from '@/components/data-table';
import Pagination from '@/components/pagination';
import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/auth/auth';
import { buscarTudo } from '@/services/agendamentos';
import { listaCompleta as listaCoordenadorias } from '@/services/coordenadorias/query-functions/lista-completa';
import { listaCompleta as listaMotivos } from '@/services/motivos/query-functions/lista-completa';
import { IAgendamento, IPaginadoAgendamento } from '@/types/agendamentos';
import { redirect } from 'next/navigation';
import { columns } from './components/columns';
import ModalImportacao from './components/dropdown-options';
import { IMotivo } from '@/types/motivo';
import { ICoordenadoria } from '@/types/coordenadoria';

import { Filtros } from '@/components/filtros';
export default async function ListaAgendamentoPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const {
		busca = '',
		tecnico = '',
		motivoId = '',
		coordenadoriaId = '',
		status = '',
		dataInicio = '',
		dataFim = '',
	} = await searchParams;
	let dados: IAgendamento[] = [];

	const response = await buscarTudo(
		+pagina,
		+limite,
		busca as string,
		tecnico as string,
		motivoId as string,
		coordenadoriaId as string,
		status as string,
		dataInicio as string,
		dataFim as string,
	);
	const { data } = response;
	ok = response.ok;
	if (ok) {
		if (data) {
			const paginado = data as IPaginadoAgendamento;
			pagina = paginado.pagina || 1;
			limite = paginado.limite || 10;
			total = paginado.total || 0;
			dados = paginado.data || [];
		}
		const paginado = data as IPaginadoAgendamento;
		dados = paginado.data || [];
	}

	const motivos = await listaMotivos(session.access_token);
	const coordenadorias = await listaCoordenadorias(session.access_token);

	const motivosData = (motivos.data as IMotivo[]).map((motivo) => ({ value: motivo.id, label: motivo.texto }));
	const coordenadoriasData = (coordenadorias.data as ICoordenadoria[]).map((coordenadoria) => ({ value: coordenadoria.id, label: coordenadoria.sigla }));

	return (
		<div className=' w-full px-0 md:px-8 relative mb-14 h-full'>
			<h1 className='text-xl md:text-4xl font-bold mt-5'>
				Lista de Agendamentos
			</h1>
			<div className='flex flex-col max-w-sm  gap-8 my-10 md:container  w-full mx-auto'>
				<Filtros
					camposFiltraveis={[
						{ tag: 'busca', nome: 'Busca', tipo: 0, placeholder: 'Buscar por processo, municipe ou documento' },
						{ tag: 'tecnico', nome: 'Técnico', tipo: 0, placeholder: 'Buscar por técnico -  nome/RF' },
						{ tag: 'motivoId', nome: 'Motivo', tipo: 2, valores: motivosData, placeholder: 'Motivos' },
						{ tag: 'coordenadoriaId', nome: 'Coordenadoria', tipo: 2, valores: coordenadoriasData, placeholder: 'Coordenadorias' },
					]}
				/>
				{dados && (
					<DataTable
						columns={columns}
						data={dados || []}
					/>
				)}
				<Separator />
				{dados && dados.length > 0 && (
					<Pagination
						total={+total}
						pagina={+pagina}
						limite={+limite}
					/>
				)}
			</div>
			<div className='absolute bottom-5 right-5 hover:scale-110 z-50'>
				<ModalImportacao />
			</div>
		</div>
	);
}
