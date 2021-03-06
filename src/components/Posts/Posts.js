import React from "react";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentID }) => {
	const posts = useSelector((state) => state.posts);
	const classes = useStyles();
	console.log(posts);
	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid
			className={classes.container}
			container
			justify='space-between'
			alignItems='stretch'
			spacing={3}>
			{posts.map((post) => (
				<Grid item key={post._id} xs={12} sm={6}>
					<Post post={post} setCurrentID={setCurrentID} />
				</Grid>
			))}
		</Grid>
	);
};
export default Posts;
