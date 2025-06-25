const resetPasswordTemplate = (resetUrl, email) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
            .btn{
                background-color: #007BFF; 
				color: #FFFFFF !important;
				padding: 8px 24px; 
				text-decoration: none; 
				font-family: Arial, sans-serif; 
				font-size: 16px; 
				border-radius: 5px; 
				display: inline-block; 
				text-underline: none;
            }
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
					src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
			<div class="message">Password Reset Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>We've received a request to reset your password for the account associated with ${email}. No changes have been made to your account yet.</p>
                <p>You can reset your password by clicking the link below:</p>
				<a class="btn" href="${resetUrl}">Reset Password</a>
				<p>If you did not request a new password, please let us know immediatley by replying to this email.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:info@studynotion.com">info@sketch.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};
export default resetPasswordTemplate;