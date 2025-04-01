/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function importarIcs(data: FormData) {
	const session = await auth();
	if (!session) redirect('/login');
	const baseURL = process.env.NEXT_PUBLIC_API_URL;

	try {
		const response: Response = await fetch(`${baseURL}agendamentos/importar`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session?.access_token}`,
			},
			body: data,
		});

		if (response.status === 201) {
			revalidateTag('agendamentos');
			return {
				ok: true,
				error: null,
				data: await response.json(),
				status: response.status,
			};
		}

		return {
			ok: false,
			error: 'Erro ao importar arquivo',
			status: response.status,
		};
	} catch (error) {
		console.log({ error });
		return {
			ok: false,
			error: 'Erro ao importar arquivo',
			status: 500,
		};
	}
}
