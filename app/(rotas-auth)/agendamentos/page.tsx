/** @format */

import DataTable from '@/components/data-table';
import Pagination from '@/components/pagination';
import { columns } from './components/columns';
import { FilterAgendamento } from './components/filter-agendamento';
import { Separator } from '@/components/ui/separator';
import { buscarTudo } from '@/services/agendamentos';
import { IAgendamento, IPaginadoAgendamento } from '@/types/agendamentos';
import ModalImportacao from './components/dropdown-options';
export default async function ListaAgendamentoPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const { busca = '' } = await searchParams;
	let dados: IAgendamento[] = [];

	const response = await buscarTudo(+pagina, +limite, busca as string);
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

	return (
		<div className=' w-full px-0 md:px-8 relative h-full'>
			<h1 className='text-xl md:text-4xl font-bold mt-5'>
				Lista de Agendamentos
			</h1>
			<div className='flex flex-col gap-5 my-10 md:w-full '>
				<FilterAgendamento />
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
				<div className='absolute bottom-5 right-5 hover:scale-110 z-50'>
					<ModalImportacao />
				</div>
			</div>
		</div>
	);
}
