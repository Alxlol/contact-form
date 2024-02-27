import { fail } from '@sveltejs/kit';
import { createTransport } from 'nodemailer';
import { SECRET_COMPANY_EMAIL, SECRET_COMPANY_PASSWORD } from '$env/static/private';

export const actions = {
	submit: async ({ request }: any) => {
		const formData = await request.formData();

		let name: string = formData.get('name');
		let email: string = formData.get('email');
		let company: string = formData.get('company');
		let message: string = formData.get('message');

		//Validation
		if (name.length < 2) {
			return fail(400, {
				error: true,
				errorMessage: 'Name must be at least two characters',
				name,
				email,
				company,
				message
			});
		}
		if (!email.includes('@')) {
			return fail(400, {
				error: true,
				errorMessage: 'Please enter a valid email',
				name,
				email,
				company,
				message
			});
		}
		if (message.length < 5) {
			return fail(400, {
				error: true,
				errorMessage: 'Message must be at least five characters',
				name,
				email,
				company,
				message
			});
		}

		const transporter = createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: SECRET_COMPANY_EMAIL,
				pass: SECRET_COMPANY_PASSWORD
			}
		});
		// Works but ugly, there's gotta be a better way, TODO: Read up on email templates
		let emailTemplate = `New message from:
${name}
${email}
${company}

${message}
`;

		const info = await transporter.sendMail({
			from: `${name} <${email}>`, // sender address
			to: SECRET_COMPANY_EMAIL, // list of receivers
			subject: 'Contact Form Message', // Subject line
			text: emailTemplate
		});

		console.log('Mail sent' + info.messageId);

		return { success: true };
	}
};
