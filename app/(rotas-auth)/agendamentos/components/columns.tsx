/** @format */

'use client';

import { IAgendamento } from '@/types/agendamentos';
import { ColumnDef } from '@tanstack/react-table';
import ModalEditAgendamento from './modal-edit-agendamento';
import { Badge } from '@/components/ui/badge';

function statusAleatorio(): string {
	const status = ['Cancelado', 'Concluído', 'Agendado'];
	const index = Math.floor(Math.random() * status.length);
	return status[index];
}

console.log(statusAleatorio());
export const columns: ColumnDef<IAgendamento>[] = [
	{
		accessorKey: 'municipe',
		header: 'Munícipe',
	},
	{
		accessorKey: 'tecnico',
		header: 'Técnico',
		cell: ({ row }) => (
			<p className=' text-xs overflow-hidden text-ellipsis'>
				{row.original.tecnico?.nome}
			</p>
		),
	},
	{
		accessorKey: 'processo',
		header: 'Processo',
		cell: ({ row }) => <p className=' text-xs'>{row.original.processo}</p>,
	},
	{
		accessorKey: 'coordenadoria',
		header: 'Coordenadoria',
		cell: ({ row }) => (
			<p className='text-nowrap text-xs overflow-hidden text-ellipsis'>
				{row.original.coordenadoria?.sigla}
			</p>
		),
	},
	{
		id: 'datainicio-1',
		accessorKey: 'dataInicio',
		header: 'Data Inicial',
		cell: ({ row }) => {
			const data = new Date(row.original.dataInicio);
			return (
				<p className='text-xs'>{data && data.toLocaleDateString('pt-BR')}</p>
			);
		},
	},
	{
		id: 'datainicio-2',
		accessorKey: 'dataInicio',
		header: 'Horário Inicial',
		cell: ({ row }) => {
			const data = new Date(row.original.dataInicio);
			return (
				<p className='text-xs'>{data && data.toLocaleTimeString('pt-BR')}</p>
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
				{row.original.resumo?.substring(0, 50)}
				{row.original.resumo && row.original.resumo?.length > 50 && '...'}
			</p>
		),
	},
	{
		accessorKey: 'motivo',
		header: () => <p className='text-center'>Motivo</p>,
		cell: ({ row }) => (
			<p className='text-nowrap text-center text-xs overflow-hidden text-ellipsis'>
				{row.original.motivo?.texto}
			</p>
		),
	},
	{
		accessorKey: 'status',
		header: () => <p className='text-center'>Status</p>,
		cell: () => {
			const status = statusAleatorio();
			return (
				<div className='flex items-center justify-center w-full'>
					<Badge
						className='text-center'
						variant={`${
							status == 'Cancelado'
								? 'destructive'
								: status === 'Concluído'
								? 'success'
								: 'default'
						}`}>
						{status}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'actions',
		header: () => <p className='text-center'>Ações</p>,
		cell: ({ row }) => (
			<div className='flex items-center justify-center w-full'>
				<ModalEditAgendamento agendamento={row.original} />
			</div>
		),
	},
];
