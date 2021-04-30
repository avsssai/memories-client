import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

const Form = ({ currentID, setCurrentID }) => {
	const classes = useStyles();
	const post = useSelector((state) =>
		currentID ? state.posts.find((post) => post._id === currentID) : null
	);

	const [postData, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});
	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentID) {
			dispatch(updatePost(currentID, postData));
		} else {
			dispatch(createPost(postData));
		}
		clear();
	};

	const clear = () => {
		setCurrentID(null);
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}>
				<Typography variant='h6'>
					{currentID ? "Editing" : "Creating"} a memory
				</Typography>
				<TextField
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth
					value={postData.creator}
					onChange={(e) =>
						setPostData({ ...postData, creator: e.target.value })
					}
				/>
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={(e) =>
						setPostData({ ...postData, title: e.target.value })
					}
				/>
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					size='large'
					type='submit'
					color='primary'
					fullWidth>
					Submit
				</Button>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					size='small'
					onClick={clear}
					color='secondary'
					fullWidth>
					clear
				</Button>
			</form>
		</Paper>
	);
};
export default Form;
