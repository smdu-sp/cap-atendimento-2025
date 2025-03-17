/** @format */

import DataTable from '@/components/data-table';
import Pagination from '@/components/pagination';

import { columns } from './components/columns';
import { FilterAgendamento } from './components/filter-agendamento';
import { data } from './mock/data';
import { Separator } from '@/components/ui/separator';
export default function ListaAgendamentoPage() {
	return (
		<div
			key={1}
			className=' w-full relative h-full px-4 md:px-8 '>
			<h1 className='text-4xl font-bold'>Lista de Agendamentos</h1>
			<div className='flex flex-col gap-5 my-10'>
				<FilterAgendamento />
				{data && (
					<DataTable
						columns={columns}
						data={data || []}
					/>
				)}
				<Separator />
				{data && data.length > 0 && (
					<Pagination
						total={data.length}
						pagina={1}
						limite={5}
					/>
				)}
			</div>
		</div>
	);
}
