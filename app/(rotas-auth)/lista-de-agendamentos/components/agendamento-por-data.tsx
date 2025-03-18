/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
	data: z.object({
		from: z.date(),
		to: z.date().optional(),
	}),
});

export function AgendamentoPorData({ onlyInicial }: { onlyInicial?: boolean }) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast('You submitted the following values:', {
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex items-end gap-5 '>
				{!onlyInicial && (
					<FormField
						control={form.control}
						name='data'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Data</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-[260px] pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}>
												{field.value?.from ? (
													field.value.to ? (
														<>
															{format(field.value.from, 'LLL dd, y', {
																locale: ptBR,
															})}{' '}
															-{' '}
															{format(field.value.to, 'LLL dd, y', {
																locale: ptBR,
															})}
														</>
													) : (
														format(field.value.from, 'LLL dd, y', {
															locale: ptBR,
														})
													)
												) : (
													<span>Escolha uma data</span>
												)}
												<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className='w-auto p-0'
										align='start'>
										<Calendar
											locale={ptBR}
											mode='range'
											initialFocus
											defaultMonth={field.value?.from}
											numberOfMonths={2}
											selected={field.value}
											onSelect={(range) => field.onChange(range)}
											disabled={(date) =>
												date > new Date() || date < new Date('2010-01-01')
											}
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
			</form>
		</Form>
	);
}
