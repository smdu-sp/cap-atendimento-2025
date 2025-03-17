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
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const FormSchema = z.object({
	coordenadoria: z.string({
		required_error: 'A cpf is required.',
	}),
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
						<FormItem className='flex flex-col'>
							<FormLabel>Coordenadoria</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='Buscar por Coordenadoria'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
