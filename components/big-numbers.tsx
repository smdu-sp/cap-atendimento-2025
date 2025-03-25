/** @format */

import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function BigNumbers({ numbers }: { numbers: number[] }) {
	return (
		<ul className='flex flex-col md:flex-row items-center justify-between gap-5'>
			<li className='w-full'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>
							{numbers[0].toLocaleString('pt-BR')}
						</CardTitle>
						<CardDescription>Total de agendamentos neste Ano</CardDescription>
					</CardHeader>
				</Card>
			</li>
			<li className='w-full'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>
							{numbers[1].toLocaleString('pt-BR')}
						</CardTitle>
						<CardDescription>
							Total de agendamentos nesta Semana
						</CardDescription>
					</CardHeader>
				</Card>
			</li>
			<li className='w-full'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>
							{numbers[2].toLocaleString('pt-BR')}
						</CardTitle>
						<CardDescription>Total de agendamentos Hoje</CardDescription>
					</CardHeader>
				</Card>
			</li>
		</ul>
	);
}
