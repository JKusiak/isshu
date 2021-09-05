import axios from 'axios';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoggedInContext } from '../App';
import LoginForm from './LoginForm';


const Login = () => {
	const [isValid, setIsValid] = useState<boolean>(true);
	const { setLoggedIn } = useContext(LoggedInContext);
	const history = useHistory();


	function loginUser(credentials: any) {
		axios.post('http://localhost:5000/login/', credentials)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				setLoggedIn(true);
				history.push("/home/projects");
			}).catch((err) => {
				console.log(err);
				setIsValid(false);
			});
	}


	return (
		<>
			<LoginForm
				loginUser={loginUser}
				isValid={isValid}
				setIsValid={setIsValid}
			/>
		</>
	);
}

export default Login;