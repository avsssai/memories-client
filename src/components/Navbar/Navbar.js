import React, { useState, useEffect } from "react";

import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import memories from "../../images/memories.png";
import useStyles from "./styles";
import { LOGOUT } from "../../constants/actionTypes";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar = (props) => {
	const classes = useStyles();
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("profile"))
	);
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const logout = () => {
		dispatch({ type: LOGOUT });
		history.push("/");
		setUser(null);
	};
	useEffect(() => {
		const token = user?.token;

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	console.log(user);
	return (
		<AppBar position='static' color='inherit' className={classes.appBar}>
			<div className={classes.brandContainer}>
				<Typography
					component={Link}
					to='/'
					variant='h2'
					align='center'
					className={classes.heading}>
					Memories
				</Typography>
				<img
					src={memories}
					alt='memories'
					height='60'
					className={classes.image}
				/>
			</div>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.imageUrl}>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>
							{user.result.name}
						</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							onClick={logout}
							color='secondary'>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to='/auth'
						variant='contained'
						color='primary'>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};
export default Navbar;
