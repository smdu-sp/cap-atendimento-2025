/** @format */
'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { atualizar } from '@/services/usuarios';
import { IUsuario } from '@/types/usuario';
import { zodResolver } from '@hookform/resolvers/zod';
import { RefreshCcw } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	avatar: z.string().optional(),
	nomeSocial: z.string().min(2).max(50),
	nome: z.string().min(2).max(50),
	login: z.string(),
	email: z.string().email(),
	permissao: z.enum(['DEV', 'TEC', 'ADM', 'USR']),
});

interface FormProfileProps {
	user: Partial<IUsuario>;
	id: string;
}

export default function FormProfile({ user, id }: FormProfileProps) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nomeSocial: user.nomeSocial || '',
			avatar: user.avatar || '',
			email: user.email || '',
			nome: user.nome || '',
			login: user.login || '',
			permissao:
				(user.permissao as unknown as 'DEV' | 'TEC' | 'ADM' | 'USR') ?? 'USR',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		startTransition(async () => {
			console.log(values);
			const { nomeSocial } = values;
			try {
				const resp = await atualizar(id, { nomeSocial: nomeSocial });

				if (!resp.ok) {
					console.log(resp);
					console.log(resp.error);
					toast.error('Algo deu errado');
				} else {
					toast.success('Usuário atualizado com sucesso');
				}
			} catch (error) {
				console.log(error);
				toast.error('Algo deu errado');
			}
		});
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-5'>
				<FormField
					control={form.control}
					name='nomeSocial'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome de usuário</FormLabel>
							<FormControl>
								<Input
									placeholder='Nome Social'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='nome'
					disabled
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input
									placeholder='Nome Completo'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					disabled
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail:</FormLabel>
							<FormControl>
								<Input
									placeholder='email@email.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					disabled
					name='login'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Login</FormLabel>
							<FormControl>
								<Input
									placeholder='Login'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={isPending}
					className='w-full'>
					Atualizar{' '}
					{isPending ? <RefreshCcw className='animate-spin' /> : <RefreshCcw />}
				</Button>
			</form>
		</Form>
	);
}
