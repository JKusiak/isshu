import axios from 'axios';
import { useState } from 'react';
import RegisterForm from '../../components/Authentication/RegisterForm';



const Register = () => {
	const [isValid, setIsValid] = useState<boolean>(true);
	const [errorText, setErrorText] = useState<string>('');


	function registerUser(user: any) {
		axios.post('/users/add', user)
			.catch((err) => {
				console.log(err);
				setIsValid(false);
				setErrorText('Email already taken');
			});
	}


	return (
		<>
			<RegisterForm
				registerUser={registerUser}
				isValid={isValid}
				setIsValid={setIsValid}
				errorText={errorText}
				setErrorText={setErrorText}
			/>
		</>
	);
}

export default Register;