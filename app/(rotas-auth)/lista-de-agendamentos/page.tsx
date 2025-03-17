/** @format */

import DataTable from '@/components/data-table';
import Pagination from '@/components/pagination';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import React from 'react';

import { data } from './mock/data';
import { columns } from './components/columns';
import { FilterAgendamento } from './components/filter-agendamento';
export default function ListaAgendamentoPage() {
	return (
		<div
			key={1}
			className='max-w-7xl w-full relative h-full'>
			<Card>
				<CardHeader>
					<CardTitle className='text-4xl font-bold'>
						Lista de Agendamentos
					</CardTitle>
					<CardDescription>
						Gerenciamento e consulta de agendamentos
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-10'>
					<FilterAgendamento />
					{data && (
						<DataTable
							columns={columns}
							data={data || []}
						/>
					)}
					{data && data.length > 0 && (
						<Pagination
							total={data.length}
							pagina={1}
							limite={5}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
