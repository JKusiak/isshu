
import axios from 'axios';
import { mount, shallow, render } from 'enzyme';
import React from 'react';
import LoginForm from './LoginForm';


describe('Login hooks and input fields connection', () => {
	const mockFunction = jest.fn();
	const initEmailValue = '';
	const setEmail = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
	useStateSpy.mockImplementation(() => [initEmailValue, setEmail] as any);

	const loginComponent = shallow(
		<LoginForm
			loginUser={mockFunction}
			isValid={true}
			setIsValid={mockFunction}
		/>
	)
	const newEmailValue = 'john.wayne@gmail.com';
	const emailInput = loginComponent.find('[name="email"]');
	
	it('should change hook state on user input', () => {
		emailInput.simulate('change', { target: { value:  newEmailValue}});
		expect(setEmail).toHaveBeenCalledWith(newEmailValue);
	})
}) 


// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('Login API', () => {
	
// 	it("should authenticate user", async () => {
// 		const credentials = {
// 			email: 'john.wayne@gmail.com',
// 			password: 'John123!',
// 		}

// 		mockedAxios.post.mockResolvedValueOnce(credentials);

// 		axios.post('/login', credentials)
// 			.then((res) => {
// 				expect(res.statusCode).toBe(200)
// 			}).catch((err) => {
// 				console.log(err);
// 				setIsValid(false);
// 			});
// 		const response = await request(app).post("/authenticate").send({
// 		username: "Ola",
// 		password: "test"
// 		})
		
// 		expect(response.body.token).toBeTruthy()
// 		expect(response.body.state).toBeTruthy()
// 		expect(response.body.state.session.authenticated).toEqual("AUTHENTICATED")
// 		})
// }) 