/** @format */

import DataTable from '@/components/data-table';
import { columns } from './components/columns';
import { IAgendamento } from '@/types/agendamentos';
import { agendaDia } from '@/services/agendamentos';
import { Filter } from './components/filter';
export default async function ListaAgendamentoPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { busca = '' } = await searchParams;
	const { data, ok } = await agendaDia({ busca: busca.toString() });
	let dados: IAgendamento[] = [];
	if (ok) dados = data as IAgendamento[];
	return (
		<div className=' w-full px-0 md:px-8 relative pb-10 h-full  md:container mx-auto'>
			<h1 className='text-xl md:text-4xl font-bold'>
				Lista de Agendamentos ({new Date().toLocaleDateString()})
			</h1>
			<div className='flex flex-col max-w-sm mx-auto md:max-w-full gap-3 my-5 w-full'>
				<Filter />
				{dados && (
					<DataTable
						columns={columns}
						data={dados || []}
					/>
				)}
			</div>
		</div>
	);
}
