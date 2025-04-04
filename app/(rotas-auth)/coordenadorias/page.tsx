/** @format */

import DataTable from '@/components/data-table';
import { Filtros } from '@/components/filtros';
import Pagination from '@/components/pagination';
import { auth } from '@/lib/auth/auth';
import { buscarTudo } from '@/services/coordenadorias/query-functions/buscar-tudo';
import { ICoordenadoria, IPaginadoCoordenadoria } from '@/types/coordenadoria';
import { columns } from './_components/columns';
import ModalUpdateAndCreate from './_components/modal-update-create';

export default async function CoordenadoriasPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const { busca = '', status = '' } = await searchParams;
	let dados: ICoordenadoria[] = [];

	const session = await auth();
	if (session && session.access_token) {
		const response = await buscarTudo(
			+pagina,
			+limite,
			busca as string,
			status as string,
		);
		const { data } = response;
		ok = response.ok;
		if (ok) {
			if (data) {
				const paginado = data as IPaginadoCoordenadoria;
				pagina = paginado.pagina || 1;
				limite = paginado.limite || 10;
				total = paginado.total || 0;
				dados = paginado.data || [];
			}
			const paginado = data as IPaginadoCoordenadoria;
			dados = paginado.data || [];
		}
	}

	const statusSelect = [
		{
			label: 'Ativo',
			value: 'ATIVO',
		},
		{
			label: 'Inativo',
			value: 'INATIVO',
		},
	];

	return (
		<div className=' w-full px-0 md:px-8 relative pb-20 md:pb-14 h-full md:container mx-auto'>
			<h1 className='text-xl md:text-4xl font-bold'>Coordenadorias</h1>
			<div className='flex flex-col max-w-sm mx-auto md:max-w-full gap-3 my-5 md:container w-full'>
				<Filtros
					camposFiltraveis={[
						{
							nome: 'Busca',
							tag: 'busca',
							tipo: 0,
							placeholder: 'Busca por coordenadoria',
						},
						{
							nome: 'Status',
							tag: 'status',
							tipo: 2,
							valores: statusSelect,
							default: 'ATIVO',
						},
					]}
				/>
				<DataTable
					columns={columns}
					data={dados || []}
				/>

				{dados && dados.length > 0 && (
					<Pagination
						total={+total}
						pagina={+pagina}
						limite={+limite}
					/>
				)}
			</div>
			<div className='absolute bottom-10 md:bottom-5 right-2 md:right-8 hover:scale-110'>
				<ModalUpdateAndCreate isUpdating={false} />
			</div>
		</div>
	);
}
