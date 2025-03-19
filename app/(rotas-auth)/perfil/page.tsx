/** @format */

'use client';

import { AvatarUploader } from '@/components/avatar-uploader';
import { ProfileField } from '@/components/profile-field';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Mail, Shield, User, UserCheck } from 'lucide-react';
import { useState } from 'react';

export default function Perfil() {
	const [userData] = useState({
		name: 'Carolina Mendes',
		email: 'carolina.mendes@exemplo.com',
		login: 'carolmendes',
		socialName: 'Carol',
		permission: 'Editor',
		avatarUrl: '/placeholder.svg?height=200&width=200',
	});

	const [socialName, setSocialName] = useState(userData.socialName);
	const [avatarUrl, setAvatarUrl] = useState(userData.avatarUrl);

	return (
		<div className='mx-auto px-4 md:px-8 w-full'>
			<h1 className='font-bold text-4xl mt-5'>Perfil</h1>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 my-10'>
				{/* Avatar section */}
				<Card className='md:col-span-1 h-full '>
					<CardHeader>
						<CardTitle className='text-xl'>{userData.socialName}</CardTitle>
					</CardHeader>
					<CardContent className='bg-card rounded-xl flex justify-center items-center p-6 mb-5 h-full'>
						<AvatarUploader
							avatarUrl={avatarUrl}
							onAvatarChange={setAvatarUrl}
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
							<ProfileField
								icon={<UserCheck className='h-5 w-5 text-primary' />}
								label='Nome Social'
								value={socialName}
								onChange={(e) => setSocialName(e.target.value)}
								editable={true}
							/>
							<ProfileField
								icon={<User className='h-5 w-5 text-primary' />}
								label='Nome'
								value={userData.name}
								editable={false}
							/>

							<ProfileField
								icon={<Mail className='h-5 w-5 text-primary' />}
								label='Email'
								value={userData.email}
								editable={false}
							/>
							<ProfileField
								icon={<Shield className='h-5 w-5 text-primary' />}
								label='Permissão'
								value={userData.permission}
								editable={false}
								badge={true}
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
					{[
						{ action: 'Login realizado', time: 'Hoje, 10:45' },
						{ action: 'Perfil atualizado', time: 'Ontem, 15:30' },
						{
							action: 'Documento editado',
							time: '23/03/2025, 09:15',
						},
					].map((activity, index) => (
						<div
							key={index}
							className='flex justify-start gap-5 items-center p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors'>
							<span>{activity.action}:</span>
							<span className='text-sm text-muted-foreground'>
								{activity.time}
							</span>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
