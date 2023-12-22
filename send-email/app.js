const express = require('express');

const bodyParser = require('body-parser');

const { check, validationResult } = require('express-validator');

const nodemailer = require('nodemailer');

const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.json());

app.get("/", (request, response) => {
	response.render('contact', { errors: '' });
});

app.post('/send',
	[
		check('name').notEmpty().withMessage('Name is required'),
		check('email').isEmail().withMessage('Invalid Email Address'),
		check('subject').notEmpty().withMessage('Subject is required'),
		check('message').notEmpty().withMessage('Message is required')
	], (request, response) => {

		const errors = validationResult(request);

		if (!errors.isEmpty()) {
			response.render('contact', { errors: errors.mapped() });
		}
		else {

			const transporter = nodemailer.createTransport({
				service: 'Gmail',
				auth: {
					user: 'igormsousa2003@gmail.com',
					pass: 'mhnqipondhrfxojm'
				}
			});

			const mail_option = {
				from: request.body.email,
				to: 'igormsousa2003@gmail.com',
				subject: request.body.subject,
				text: `${request.body.name}\n${request.body.email}\n${request.body.message}`

			};

			transporter.sendMail(mail_option, (error, info) => {

				if (error) {
					console.log(error);
				}

			});

			const mail_sender = {
				from: 'igormsousa2003@gmail.com',
				to: request.body.email,
				subject: request.body.subject,
				text: `Seu email foi enviado com sucesso!`

			};

			transporter.sendMail(mail_sender, (error, info) => {

				if (error) {
					console.log(error);
				} else {
					response.redirect('/success');
				}

			});

		}

	});

app.get('/success', (request, response) => {

	response.send('<h1>Your Message was Succeddfully send!</h1>');

});

app.listen(3000, () => {

	console.log('Server started on port 3000');

});
