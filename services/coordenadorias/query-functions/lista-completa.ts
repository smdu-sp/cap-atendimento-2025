/** @format */

import { ICoordenadoria, IResponseCoordenadoria } from '@/types/coordenadoria';

export async function listaCompleta(
	access_token: string,
): Promise<IResponseCoordenadoria> {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	console.log(baseURL);
	try {
		const motivos = await fetch(`${baseURL}coordenadorias/lista-completa`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
			next: { tags: ['coordenadorias'], revalidate: 120 },
		});
		const data = await motivos.json();
		return {
			ok: true,
			error: null,
			data: data as ICoordenadoria[],
			status: 200,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			error: 'Não foi possível buscar a lista de coordenadorias:' + error,
			data: null,
			status: 500,
		};
	}
}
