/** @format */

'use client';
import { IProcesso } from '@/types/processo';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IProcesso>[] = [
	{
		accessorKey: 'municipe',
		header: 'Munícipe',
	},
	{
		accessorKey: 'tecnico',
		header: 'Técnico',
	},
	{
		accessorKey: 'processo',
		header: 'Processo',
		cell: ({ row }) => <p className=' text-xs'>{row.original.processo}</p>,
	},
	{
		accessorKey: 'coordenadoria',
		header: 'Coordenadoria',
	},
	{
		id: 'datainicio-1',
		accessorKey: 'datainicio',
		header: 'Data Inicial',
		cell: ({ row }) => (
			<p className=' text-xs'>
				{row.original.datainicio.toLocaleString('pt-BR', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					timeZone: 'America/Sao_Paulo',
				})}
			</p>
		),
	},
	{
		id: 'datainicio-2',
		accessorKey: 'datainicio',
		header: 'Horário Inicial',
		cell: ({ row }) => (
			<p className=' text-xs'>
				{row.original.datainicio.toLocaleString('pt-BR', {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					timeZone: 'America/Sao_Paulo',
				})}
			</p>
		),
	},
	{
		accessorKey: 'motivo',
		header: 'Motivo',
	},
];
