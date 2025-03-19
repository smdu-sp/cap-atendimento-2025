/** @format */

import DataTable, { TableSkeleton } from '@/components/data-table';
import Pagination from '@/components/pagination';
import { auth } from '@/lib/auth/auth';
import * as usuario from '@/services/usuarios';
import { IPaginadoUsuario, IUsuario } from '@/types/usuario';
import { Suspense } from 'react';
import { columns } from './_components/columns';
import ModalUpdateAndCreate from './_components/modal-update-create';

export default async function UsuariosSuspense({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<Usuarios searchParams={searchParams} />
		</Suspense>
	);
}

async function Usuarios({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const { busca = '' } = await searchParams;
	let dados: IUsuario[] = [];
	
	const session = await auth();
	if (session && session.access_token) {
		const response = await usuario.buscarTudo(
			session.access_token || '',
			+pagina,
			+limite,
			busca as string,
		);
		const { data } = response;
		ok = response.ok;
		if (ok) {
			if (data) {
				const paginado = data as IPaginadoUsuario;
				pagina = paginado.pagina || 1;
				limite = paginado.limite || 10;
				total = paginado.total || 0;
				dados = paginado.data || [];
			}
			const paginado = data as IPaginadoUsuario;
			dados = paginado.data || [];
		}
	}

	return (
		<>
			<div className='mx-auto w-full relative h-full px-4 md:px-8'>
				<h1 className='text-4xl font-bold mt-5'>Usuários</h1>

				<div className='flex flex-col gap-10 my-10'>
					{dados && (
						<DataTable
							columns={columns}
							data={dados || []}
						/>
					)}
					{dados && dados.length > 0 && (
						<Pagination
							total={+total}
							limite={+limite}
							pagina={+pagina}
						/>
					)}
				</div>
			</div>
			<div className='absolute bottom-5 right-5 hover:scale-110'>
				<ModalUpdateAndCreate isUpdating={false} />
			</div>
		</>
	);
}
