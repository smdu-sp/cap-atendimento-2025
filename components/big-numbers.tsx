/** @format */

import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function BigNumbers({ numbers }: { numbers: number[] }) {
	return (
		<ul className='flex items-center justify-between gap-5'>
			<li className='w-full'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>
							{numbers[0].toLocaleString('pt-BR')}
						</CardTitle>
						<CardDescription>Agendamentos neste Ano</CardDescription>
					</CardHeader>
				</Card>
			</li>
			<li className='w-full'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>
							{numbers[1].toLocaleString('pt-BR')}
						</CardTitle>
						<CardDescription>Agendamentos nesta Semana</CardDescription>
					</CardHeader>
				</Card>
			</li>
			<li className='w-full'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>
							{numbers[2].toLocaleString('pt-BR')}
						</CardTitle>
						<CardDescription>Agendamentos Hoje</CardDescription>
					</CardHeader>
				</Card>
			</li>
		</ul>
	);
}
