/** @format */

import DataTable from '@/components/data-table';
import { auth } from '@/lib/auth/auth';
import { buscarTudo } from '@/services/motivos/query-functions/buscar-tudo';
import { columns } from './_components/columns';
import ModalUpdateAndCreate from './_components/modal-update-create';
import { IMotivo, IPaginadoMotivo } from '@/types/motivo';
import { Filtros } from '@/components/filtros';
import { Separator } from '@/components/ui/separator';
import Pagination from '@/components/pagination';

export default async function MotivosPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const { busca = '', status = '' } = await searchParams;
	let dados: IMotivo[] = [];

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
				const paginado = data as IPaginadoMotivo;
				pagina = paginado.pagina || 1;
				limite = paginado.limite || 10;
				total = paginado.total || 0;
				dados = paginado.data || [];
			}
			const paginado = data as IPaginadoMotivo;
			dados = paginado.data || [];
		}
	}

	const statusSelect = [{
		label: 'Ativo',
		value: 'ATIVO',
	}, {
		label: 'Inativo',
		value: 'INATIVO',
	}]

	return (
		<div className=' w-full px-0 md:px-8 relative mb-14 h-full'>
			<h1 className='text-xl md:text-4xl font-bold mt-5'>
				Motivos
			</h1>
			<div className='flex flex-col max-w-sm  gap-8 my-10 md:container  w-full mx-auto'>
				<Filtros
					camposFiltraveis={[
						{ nome: 'Busca', tag: 'busca', tipo: 0, placeholder: 'Busca por motivo' },
						{ nome: 'Status', tag: 'status', tipo: 2, valores: statusSelect, default: 'ATIVO' },
					]}
				/>
				<DataTable
					columns={columns}
					data={dados || []}
				/>
				<Separator />
				{dados && dados.length > 0 && (
					<Pagination
						total={+total}
						pagina={+pagina}
						limite={+limite}
					/>
				)}
			</div>
			<div className='absolute bottom-5 right-5 hover:scale-110'>
				<ModalUpdateAndCreate isUpdating={false} />
			</div>
		</div>
	);
}
