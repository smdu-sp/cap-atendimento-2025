/** @format */

'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DialogClose } from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	municipe: z.string(),
	rg: z.string().optional(),
	cpf: z.string().optional(),
	processo: z.string(),
	motivoId: z.string(),
	coordenadoriaId: z.string(),
	tecnicoId: z.string(),
	dataInicio: z.date().nullable(),
	dataFim: z.date().nullable(),
	resumo: z.string(),
});

export default function FormAgendamento() {
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			coordenadoriaId: '',
			cpf: '',
			dataFim: null,
			dataInicio: null,
			motivoId: '',
			municipe: '',
			processo: '',
			resumo: '',
			rg: '',
			tecnicoId: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.

		startTransition(() => {
			form.setValue(
				'resumo',
				`Motivo: ${form.getValues('motivoId')}; Munícipe: ${form.getValues(
					'municipe',
				)}; RG:${form.getValues('rg')}; CPF:${form.getValues(
					'cpf',
				)}; Técnico:${form.getValues(
					'tecnicoId',
				)}; Coordenadoria: ${form.getValues(
					'coordenadoriaId',
				)}; Processo:${form.getValues('processo')}`,
			);
			console.log(values);
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-5 w-full mb-5'>
					<FormField
						control={form.control}
						name='municipe'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Munícipe</FormLabel>
								<FormControl>
									<Input
										placeholder='Nome do munícipe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='rg'
						render={({ field }) => (
							<FormItem>
								<FormLabel>RG</FormLabel>
								<FormControl>
									<Input
										placeholder='RG do munícipe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='cpf'
						render={({ field }) => (
							<FormItem>
								<FormLabel>CPF</FormLabel>
								<FormControl>
									<Input
										placeholder='CPF do munícipe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='processo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nº do Processo</FormLabel>
								<FormControl>
									<Input
										placeholder='Número do processo'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='coordenadoriaId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Coordenadoria</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-56 text-nowrap bg-background'>
											<SelectValue placeholder='Selecione a coordenadoria' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='RESID'>RESID</SelectItem>
										<SelectItem value='SERVIN'>SERVIN</SelectItem>
										<SelectItem value='GTEC'>GTEC</SelectItem>
										<SelectItem value='PARHIS'>PARHIS</SelectItem>
										<SelectItem value='CAP'>CAP</SelectItem>
										<SelectItem value='COMIN'>COMIN</SelectItem>
										<SelectItem value='CONTRU'>CONTRU</SelectItem>
										<SelectItem value='CAEPP'>CAEPP</SelectItem>
										<SelectItem value='ASCOM'>ASCOM</SelectItem>
										<SelectItem value='ATECC'>ATECC</SelectItem>
										<SelectItem value='ATIC'>ATIC</SelectItem>
										<SelectItem value='CASE'>CASE</SelectItem>
										<SelectItem value='DEUSO'>DEUSO</SelectItem>
										<SelectItem value='GAB'>COMIN</SelectItem>
										<SelectItem value='GAB_CI'>GAB/CI</SelectItem>
										<SelectItem value='GEOINFO'>GEOINFO</SelectItem>
										<SelectItem value='LICEN'>LICEN</SelectItem>
										<SelectItem value='PLANURB'>PLANURB</SelectItem>
										<SelectItem value='STEL'>STEL</SelectItem>
										<SelectItem value='URB'>URB</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='motivoId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Motivo</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-56 text-nowrap bg-background'>
											<SelectValue placeholder='Selecione o motivo' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='1'>
											Atendimento Técnico - Comunicado
										</SelectItem>
										<SelectItem value='2'>
											Atendimento Técnico - Recurso
										</SelectItem>
										<SelectItem value='3'>
											Sala Arthur Saboya (Consulta Pré-Projeto)
										</SelectItem>
										<SelectItem value='4'>
											Protocolo (Entrega / Retirada de Documentos Físicos)
										</SelectItem>
										<SelectItem value='5'>
											Protocolo (Comunicado / Indeferimento)
										</SelectItem>
										<SelectItem value='6'>
											Notificação - Função Social da Propriedade
										</SelectItem>
										<SelectItem value='7'>Visita Institucional</SelectItem>
										<SelectItem value='8'>Evento</SelectItem>
										<SelectItem value='9'>Vistas a Processo Físico</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='tecnicoId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Técnico</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='w-full text-nowrap bg-background'>
											<SelectValue placeholder='Selecione o técnico' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='t1'>Técnico 1</SelectItem>
										<SelectItem value='t2'>Técnico 2</SelectItem>
										<SelectItem value='t3'>Técnico 3</SelectItem>
										<SelectItem value='t4'>Técnico 4</SelectItem>
										<SelectItem value='t5'>Técnico 5</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex w-full items-center justify-between gap-5 mb-5'>
					<FormField
						control={form.control}
						name='dataInicio'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Data Início</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-56 pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}>
												{field.value ? (
													format(field.value, 'PPP', { locale: ptBR })
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
											mode='single'
											selected={field.value as Date}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date('1900-01-01')
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='dataFim'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Data Final</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'w-56 pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}>
												{field.value ? (
													format(field.value, 'PPP', { locale: ptBR })
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
											mode='single'
											selected={field.value as Date}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() || date < new Date('1900-01-01')
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='resumo'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Resumo</FormLabel>
							<FormControl>
								<Textarea
									placeholder='resumo e observações do agendamento'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex items-center gap-3 justify-end mt-10'>
					<DialogClose asChild>
						<Button variant='outline'>Sair</Button>
					</DialogClose>
					<Button
						disabled={isPending}
						type='submit'>
						Cadastrar {isPending && <Loader2 className='animate-spin' />}
					</Button>
				</div>
			</form>
		</Form>
	);
}
