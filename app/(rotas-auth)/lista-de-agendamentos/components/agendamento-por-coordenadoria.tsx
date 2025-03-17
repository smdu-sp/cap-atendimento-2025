/** @format */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const FormSchema = z.object({
	coordenadoria: z.string(),
});

export function AgendamentoPorCoordenadoria() {
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
				className='flex items-end gap-5'>
				<FormField
					control={form.control}
					name='coordenadoria'
					render={({ field }) => (
						<FormItem className='flex flex-col '>
							<FormLabel>Coordenadoria</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className='w-60 text-nowrap bg-background'>
										<SelectValue placeholder='Selecione a coordenadoria' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem
										value='all'
										className='text-nowrap'>
										Todas as coordenadorias
									</SelectItem>
									<SelectItem value='RESID'>RESID</SelectItem>
									<SelectItem value='SERVIN'>SERVIN</SelectItem>
									<SelectItem value='GTEC'>GTEC</SelectItem>
									<SelectItem value='PARHIS'>PARHIS</SelectItem>
									<SelectItem value='CAP'>CAP</SelectItem>
									<SelectItem value='COMIN'>COMIN</SelectItem>
									<SelectItem value='CONTRU'>CONTRU</SelectItem>
									<SelectItem value='CAEPP'>CAEPP</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
