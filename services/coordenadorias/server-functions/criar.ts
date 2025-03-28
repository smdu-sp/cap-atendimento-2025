/** @format */

'use server';

import { auth } from '@/lib/auth/auth';
import { ICreateCoordenadoria } from '@/types/coordenadoria';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function criar(data: ICreateCoordenadoria) {
	const session = await auth();
	if (!session) redirect('/login');
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	try {
		const response: Response = await fetch(`${baseURL}coordenadorias/criar`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session?.access_token}`,
			},
			body: JSON.stringify(data),
		});
		if (response.status === 201) {
			revalidateTag('coordenadorias');
			return {
				ok: true,
				error: null,
				status: response.status,
			};
		}

		return {
			ok: false,
			error: 'Erro ao criar coordenadorias',
			status: response.status,
		};
	} catch (error) {
		console.log({ error });
		return {
			ok: false,
			error: 'Erro ao criar coordenadorias',
			status: 500,
		};
	}
}
