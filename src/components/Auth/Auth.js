import React, { useState } from "react";
import {
	Avatar,
	Paper,
	Grid,
	Button,
	Typography,
	Container,
} from "@material-ui/core";
import Input from "../Input/Input";
import Icon from "./Icon.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Auth = () => {
	const classes = useStyles();
	const [isSignup, setIsSignUp] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const handleSubmit = () => {};
	const handleChange = () => {};
	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);
	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp);
		handleShowPassword(false);
	};
	const dispatch = useDispatch();
	const history = useHistory();
	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: "AUTH", payload: { result, token } });
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = () => {
		console.log("Google Sign in was unsuccessful. Try again later.");
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>
					{isSignup ? "Sign Up" : "Sign In"}
				</Typography>
				<form onSubmit={handleSubmit} className={classes.form}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									autoFocus
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									type='text'
									half
								/>
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									type='text'
									half
								/>
							</>
						)}
						<Input
							name='email'
							label='Email'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Confirm Password'
								handleChange={handleChange}
								type={showPassword ? "text" : "password"}
							/>
						)}
						<Button
							type='submit'
							variant='contained'
							fullWidth
							color='primary'
							className={classes.submit}>
							{isSignup ? "Sign Up" : "Sign In"}
						</Button>
						<GoogleLogin
							clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
							cookiePolicy={"single_host_origin"}
							onSuccess={googleSuccess}
							onFailure={googleFailure}
							render={(renderProps) => (
								<Button
									className={classes.googleButton}
									color='primary'
									fullWidth
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
									startIcon={<Icon />}
									variant='contained'>
									Google Sign In
								</Button>
							)}
						/>
						<Grid container justify='flex-end'>
							<Grid item>
								<Button onClick={switchMode}>
									{isSignup
										? "Already have an account? Sign In."
										: "Don't have an account? Sign Up."}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
