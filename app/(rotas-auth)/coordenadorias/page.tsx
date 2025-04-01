/** @format */

import DataTable from '@/components/data-table';
import { auth } from '@/lib/auth/auth';
import { buscarTudo } from '@/services/coordenadorias/query-functions/buscar-tudo';
import { redirect } from 'next/navigation';
import { columns } from './_components/columns';
import ModalUpdateAndCreate from './_components/modal-update-create';
import { IPaginadoCoordenadoria } from '@/types/coordenadoria';
import StatusFilter from './_components/status-filter';

export default async function CoordenadoriasPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	const { status = '' } = await searchParams;

	const coordenadorias = await buscarTudo({
		pagina: 1,
		limite: 30,
		busca: '',
		status: status as '' | 'ATIVO' | 'INATIVO',
	});

	if (!coordenadorias.data || !coordenadorias.ok) {
		return (
			<div className='text-muted-foreground italic'>Dados não encontrados</div>
		);
	}

	const coordenadoriasData = coordenadorias.data as IPaginadoCoordenadoria;

	return (
		<div className=' w-full px-0 md:px-8 relative h-full container mx-auto pb-20  relative'>
			<h1 className='text-xl md:text-4xl font-bold my-5'>Coordenadorias</h1>
			<div className='max-w-screen'>
				<StatusFilter />
				<DataTable
					columns={columns}
					data={coordenadoriasData.data}
				/>
			</div>
			<div className='absolute bottom-5 right-5 hover:scale-110'>
				<ModalUpdateAndCreate isUpdating={false} />
			</div>
		</div>
	);
}
