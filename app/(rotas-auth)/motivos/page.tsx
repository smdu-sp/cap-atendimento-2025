/** @format */

import DataTable from '@/components/data-table';
import { auth } from '@/lib/auth/auth';
import { buscarTudo } from '@/services/motivos/query-functions/buscar-tudo';
import { redirect } from 'next/navigation';
import { columns } from './_components/columns';
import ModalUpdateAndCreate from './_components/modal-update-create';
import { IPaginadoMotivo } from '@/types/motivo';
import StatusFilter from './_components/status-filter';

export default async function MotivosPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}

	const { status = '' } = await searchParams;

	const motivos = await buscarTudo({
		pagina: 1,
		limite: 10,
		busca: '',
		status: status as '' | 'ATIVO' | 'INATIVO',
	});

	if (!motivos.data || !motivos.ok) {
		return (
			<div className='text-muted-foreground italic'>Dados não encontrados</div>
		);
	}

	const motivosData = motivos.data as IPaginadoMotivo;

	return (
		<div className=' w-full px-0 md:px-8 relative h-full md:container mx-auto h-full'>
			<h1 className='text-xl md:text-4xl font-bold my-5'>Motivos</h1>
			<div className='max-w-screen'>
				<StatusFilter />
				<DataTable
					columns={columns}
					data={motivosData.data}
				/>
			</div>
			<div className='absolute bottom-5 right-5 hover:scale-110'>
				<ModalUpdateAndCreate isUpdating={false} />
			</div>
		</div>
	);
}
