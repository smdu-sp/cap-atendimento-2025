/** @format */

import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';

export default function BigNumbers() {
	return (
		<ul className='flex items-center justify-between gap-5'>
			<li className='w-full'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>4894</CardTitle>
						<CardDescription>Agendamentos neste Ano</CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</li>
			<li className='w-full'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>196</CardTitle>
						<CardDescription>Agendamentos nesta Semana</CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</li>
			<li className='w-full'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>15</CardTitle>
						<CardDescription>Agendamentos Hoje</CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</li>
		</ul>
	);
}
