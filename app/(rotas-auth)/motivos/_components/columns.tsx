/** @format */

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IMotivo } from '@/types/motivo';
import { ColumnDef } from '@tanstack/react-table';
import { SquarePen, Trash2 } from 'lucide-react';

export const columns: ColumnDef<IMotivo>[] = [
	{
		accessorKey: 'texto',
		header: 'Motivo',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.original.status;
			return (
				<Badge variant={`${status == false ? 'destructive' : 'default'}`}>
					{status ? 'Ativo' : 'Inativo'}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'id',
		header: () => <p className='text-center'>Ações</p>,
		cell: () => {
			return (
				<div className='flex items-center justify-center gap-5'>
					<Button
						variant={'outline'}
						size={'icon'}>
						<SquarePen
							size={28}
							className='text-primary group-hover:text-white group'
						/>
					</Button>{' '}
					<Button
						variant={'outline'}
						size={'icon'}>
						{' '}
						<Trash2
							size={24}
							className='text-destructive dark:text-white group-hover:text-white group'
						/>
					</Button>
				</div>
			);
		},
	},
];
