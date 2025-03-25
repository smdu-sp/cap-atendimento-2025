/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { FilterEnviaDados } from '@/types/filter-enviar-dados';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

export function AgendamentoPorData({ enviarDados }: FilterEnviaDados) {
	const [data, setData] = useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	});

	useEffect(() => {
		if (data && data.from && data.to) {
			enviarDados('dataInicio', data?.from?.toLocaleDateString('pt-BR'));
			enviarDados('dataFim', data?.to?.toLocaleDateString('pt-BR'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return (
		<div className='flex items-end gap-5 w-full'>
			<div className='flex flex-col w-full'>
				<p>Data</p>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={'outline'}
							className={cn(
								'w-full md:w-[260px] pl-3 text-left font-normal text-muted-foreground',
								!data && 'text-muted-foreground',
							)}>
							{data?.from ? (
								data.to ? (
									<>
										{format(data.from, 'LLL dd, y', {
											locale: ptBR,
										})}{' '}
										-{' '}
										{format(data.to, 'LLL dd, y', {
											locale: ptBR,
										})}
									</>
								) : (
									format(data.from, 'LLL dd, y', {
										locale: ptBR,
									})
								)
							) : (
								<span>Escolha uma data</span>
							)}
							<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className='w-auto p-0'
						align='start'>
						<Calendar
							locale={ptBR}
							mode='range'
							initialFocus
							defaultMonth={data?.from}
							numberOfMonths={2}
							selected={data}
							onSelect={(range) => setData(range)}
							disabled={(date) =>
								date > new Date() || date < new Date('2010-01-01')
							}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
