import axios from 'axios';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IsLoggedInContext } from '../App';
import LoginForm from '../components/LoginForm';


const Login = () => {
	const [isValid, setIsValid] = useState<boolean>(true);
	const { setLoggedIn } = useContext(IsLoggedInContext);
	const history = useHistory();


	function loginUser(credentials: any) {
		axios.post('/login', credentials)
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