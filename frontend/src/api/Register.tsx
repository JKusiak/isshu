import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';


const Register = () => {
	const [isValid, setIsValid] = useState<boolean>(true);
	const [isSent, setIsSent] = useState<boolean>(false);
	const [errorText, setErrorText] = useState<string>('');
	const history = useHistory();


	function registerUser(user: any) {
		axios.post('/users/add', user)
			.then(() => {
				setIsSent(true);
				setTimeout(() => { history.push('/login') }, 1000);
			}).catch((err) => {
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
				isSent={isSent}
				setIsSent={setIsSent}
				errorText={errorText}
				setErrorText={setErrorText}
			/>
		</>
	);
}

export default Register;