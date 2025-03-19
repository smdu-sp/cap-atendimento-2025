/** @format */

import BigNumbers from '@/components/big-numbers';
import { AgendamentoNoTempo } from '@/components/charts/agendamentos-no-tempo';
import { AgendamentosPorCoordenadoria } from '@/components/charts/agendamentos-por-coordenadoria';
import { AgendamentosPorMotivo } from '@/components/charts/agendamentos-por-motivo';
import { Filter } from '@/components/filter';

export default function Home() {
	return (
		<div className=' w-full relative px-4 md:px-8 '>
			<h1 className='text-4xl font-bold mt-5'>Home</h1>
			<div className='flex flex-col gap-5 my-10'>
				<Filter />
				<BigNumbers numbers={[4898, 178, 17]} />
				<div className='grid gap-5'>
					<AgendamentosPorMotivo />
					<AgendamentosPorCoordenadoria />
					<AgendamentoNoTempo />
				</div>
			</div>
		</div>
	);
}
