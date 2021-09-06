// import { TextField } from '@material-ui/core';
// import axios from 'axios';
// import { FC, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import RegisterForm from '../../components/Authentication/RegisterForm';


// interface FieldProps {
// 	inputFieldClass,
// 	setValue,
// 	setIsValid,
// 	regex,
// 	errorText,
// 	setErrorText,
// 	setIsSent
// }


// const RegisterField: FC<FieldProps> = (props) => {
// 	const [isValid, setIsValid] = useState<boolean>(true);
// 	const [isSent, setIsSent] = useState<boolean>(false);
// 	const [errorText, setErrorText] = useState<string>('');
// 	const history = useHistory();



// 	return (
// 		<TextField
// 			className={props.inputFieldClass}
// 			required
// 			fullWidth
// 			variant="outlined"
// 			name="surname"
// 			id="surname"
// 			placeholder="Surname"
// 			autoComplete="your-surname"
// 			onChange={e => {
// 				if (e.target.value.match(props.regex)) {
// 					props.setValue(e.target.value);
// 					props.setIsValid(true);
// 				} else {
// 					props.setErrorText(props.errorText);
// 					props.setIsValid(false);
// 				}
// 				props.setIsSent(false);
// 			}}
// 		/>
// 	);
// }

// export default RegisterField;

export { };
