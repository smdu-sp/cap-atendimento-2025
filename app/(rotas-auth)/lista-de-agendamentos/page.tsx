/** @format */

import DataTable from '@/components/data-table';
import Pagination from '@/components/pagination';
import { columns } from './components/columns';
import { FilterAgendamento } from './components/filter-agendamento';
// import { data } from './mock/data';
import { Separator } from '@/components/ui/separator';
import { buscarTudo } from '@/services/agendamentos';
import { IAgendamento, IPaginadoAgendamento } from '@/types/agendamentos';
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
		<div className=' w-full relative h-full px-4 md:px-8 '>
			<h1 className='text-4xl font-bold mt-5'>Lista de Agendamentos</h1>
			<div className='flex flex-col gap-5 my-10'>
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
			</div>
		</div>
	);
}
