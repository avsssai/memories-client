import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grid, Grow } from "@material-ui/core";
import memories from "./images/memories.png";
import { getPosts } from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [currentID, setCurrentID] = useState(null);

	// LOAD POSTS
	useEffect(() => {
		dispatch(getPosts());
	}, [currentID, dispatch]);

	return (
		<Container maxWidth='lg'>
			<AppBar
				position='static'
				color='inherit'
				className={classes.appBar}>
				<Typography
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
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justify='space-between'
						alignItems='stretch'
						spacing={3}
						className={classes.mainContainer}>
						<Grid item xs={12} sm={7}>
							<Posts setCurrentID={setCurrentID} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form
								currentID={currentID}
								setCurrentID={setCurrentID}
							/>
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};

export default App;
