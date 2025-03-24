/** @format */

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import FormProfile from './components/form-profile';
import { auth } from '@/lib/auth/auth';
import { buscarPorId } from '@/services/usuarios';
import { redirect } from 'next/navigation';
import { IUsuario } from '@/types/usuario';
import { AvatarUploader } from '@/components/avatar-uploader';
import { Badge } from '@/components/ui/badge';

export default async function Perfil() {
	// const [userData] = useState({
	// 	name: 'Carolina Mendes',
	// 	email: 'carolina.mendes@exemplo.com',
	// 	login: 'carolmendes',
	// 	socialName: 'Carol',
	// 	permission: 'Editor',
	// 	avatarUrl: '',
	// });

	// const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl);

	const session = await auth();

	if (!session) {
		redirect('/login');
	}

	const data = await buscarPorId(session?.usuario.sub, session?.access_token);
	const { data: user, ok, error } = data;
	if (!ok || !user) {
		console.log(error);
		return <div>Usuário não encontrado</div>;
	}

	const userData = user as Partial<IUsuario>;

	return (
		<div className='mx-auto px-4 md:px-8 w-full'>
			<h1 className='font-bold text-4xl mt-5'>Perfil</h1>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-10'>
				{/* Avatar section */}
				<Card className='md:col-span-1 h-full '>
					<CardHeader>
						<CardTitle className='text-xl flex items-center gap-5 justify-between'>
							{userData.nome}
							<Badge>{userData.permissao}</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent className='bg-card rounded-xl flex justify-center items-center p-6 mb-5 h-full'>
						<AvatarUploader
							avatarUrl={userData.avatar ?? ''}
							id={session?.usuario.sub}
						/>
					</CardContent>
				</Card>

				{/* Profile details */}
				<div className='md:col-span-2'>
					<Card>
						<CardHeader>
							<CardTitle className='text-xl'>Informações Pessoais</CardTitle>
							<CardDescription>
								Apenas o nome social pode ser editado
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<FormProfile
								user={userData}
								id={session?.usuario.sub}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
			<Card>
				<CardHeader>
					<CardTitle className='text-xl'>Atividade Recente</CardTitle>
				</CardHeader>
				<CardContent>
					{userData.ultimoLogin &&
						userData.criadoEm &&
						userData.atualizadoEm && (
							<>
								<div className='flex justify-start gap-3 items-center p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors'>
									<span>Usuário criado em:</span>
									<span className='text-sm text-muted-foreground'>
										{new Date(userData?.criadoEm).toLocaleString('pt-BR')}
									</span>
								</div>
								<div className='flex justify-start gap-3 items-center p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors'>
									<span>Usuário atualizado em:</span>
									<span className='text-sm text-muted-foreground'>
										{new Date(userData.atualizadoEm).toLocaleString('pt-BR')}
									</span>
								</div>
								<div className='flex justify-start gap-3 items-center p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors'>
									<span>Último Login:</span>
									<span className='text-sm text-muted-foreground'>
										{new Date(userData.ultimoLogin).toLocaleString('pt-BR')}
									</span>
								</div>
							</>
						)}
				</CardContent>
			</Card>
		</div>
	);
}
