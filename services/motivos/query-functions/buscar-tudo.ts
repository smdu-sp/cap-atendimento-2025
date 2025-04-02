/** @format */

import { auth } from '@/lib/auth/auth';
import { IRespostaMotivo } from '@/types/motivo';
import { redirect } from 'next/navigation';

interface buscarTudoProps {
	pagina: number;
	limite: number;
	busca: string;
	status: 'ATIVO' | 'INATIVO' | '';
}

export async function buscarTudo(
	pagina: number = 1,
	limite: number = 10,
	busca: string = '',
	status: string = ''
): Promise<IRespostaMotivo> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	const session = await auth();
	if (!session) {
		redirect('/login');
	}
	try {
		const motivos = await fetch(
			`${baseURL}motivos/buscar-tudo?pagina=${pagina}&limite=${limite}&busca=${busca}&status=${status}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.access_token}`,
				},
				next: { tags: ['motivos'], revalidate: 120 },
			},
		);
		const data = await motivos.json();

		if (motivos.status === 200)
			return {
				ok: true,
				error: null,
				data: data,
				status: 200,
			};
		return {
			ok: false,
			error: data.message,
			data: null,
			status: data.statusCode,
		};
	} catch (error) {
		return {
			ok: false,
			error: 'Não foi possível buscar a lista de motivos:' + error,
			data: null,
			status: 400,
		};
	}
}
