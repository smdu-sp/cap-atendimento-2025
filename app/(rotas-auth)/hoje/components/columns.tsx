/** @format */

'use client';

import { IAgendamento } from '@/types/agendamentos';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';

export const columns: ColumnDef<IAgendamento>[] = [
	{
		accessorKey: 'municipe',
		header: 'Munícipe',
	},
	{
		accessorKey: 'tecnico',
		header: 'Técnico',
		cell: ({ row }) => (
			<p
				title={
					row.original.tecnico?.nome && row.original.tecnico?.nome?.length > 20
						? row.original.tecnico?.nome
						: ''
				}
				className=' text-xs text-nowrap w-fit overflow-hidden text-ellipsis'>
				{row.original.tecnico?.nome?.substring(0, 20)}
				{row.original.tecnico?.nome &&
					row.original.tecnico?.nome?.length > 20 &&
					'...'}
			</p>
		),
	},
	{
		id: 'datainicio-1',
		accessorKey: 'dataInicio',
		header: 'Data',
		cell: ({ row }) => {
			const data = new Date(row.original.dataInicio);
			return (
				<p className='text-xs'>{data && data.toLocaleDateString('pt-BR')}</p>
			);
		},
	},
	{
		id: 'horario',
		accessorKey: 'dataInicio',
		header: 'Duração',
		cell: ({ row }) => {
			const dataInicio = new Date(row.original.dataInicio);
			const dataFim = new Date(row.original.dataFim);
			return (
				<p className='text-xs'>
					{dataInicio && moment(dataInicio).format('HH:mm')} -{' '}
					{dataFim && moment(dataFim).format('HH:mm')}
				</p>
			);
		},
	},
	{
		accessorKey: 'resumo',
		header: () => <p className='text-center'>Resumo</p>,
		cell: ({ row }) => (
			<p
				title={
					row.original.resumo && row.original.resumo?.length > 50
						? row.original.resumo
						: ''
				}
				className='text-nowrap w-fit text-xs overflow-hidden text-ellipsis'>
				{row.original.resumo?.substring(0, 100)}
				{row.original.resumo && row.original.resumo?.length > 100 && '...'}
			</p>
		),
	},
];
