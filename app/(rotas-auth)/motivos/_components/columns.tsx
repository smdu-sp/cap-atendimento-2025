/** @format */

'use client';

import { Badge } from '@/components/ui/badge';
import { IMotivo } from '@/types/motivo';
import { ColumnDef } from '@tanstack/react-table';
import ModalDelete from './modal-delete';
import ModalUpdateAndCreate from './modal-update-create';

export const columns: ColumnDef<IMotivo>[] = [
	{
		accessorKey: 'texto',
		header: 'Motivo',
	},
	{
		accessorKey: 'status',
		header: () => <p className='text-center'>Status</p>,
		cell: ({ row }) => {
			const status = row.original.status;
			return (
				<div className='flex items-center justify-center'>
					<Badge variant={`${status == false ? 'destructive' : 'default'}`}>
						{status ? 'Ativo' : 'Inativo'}
					</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'id',
		header: () => <p className='text-center'>Ações</p>,
		cell: ({ row }) => {
			return (
				<div className='flex items-center justify-center gap-5'>
					<ModalUpdateAndCreate
						motivo={row.original}
						isUpdating={true}
					/>
					<ModalDelete
						id={row.original.id}
						status={row.original.status}
					/>
				</div>
			);
		},
	},
];
