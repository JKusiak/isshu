import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FC } from 'react';


const useStyles = makeStyles((theme: Theme) => createStyles({
	descriptionText: {
		textAlign: 'start',
		color: theme.palette.secondary.main,
		"&:hover": {
			cursor: 'pointer'
		}
	},
}));


interface DescriptionProps {
	permDescription: string,
}


const DescriptionText: FC<DescriptionProps> = (props) => {
	const classes = useStyles();

	
	return (
		<>
			<div className={classes.descriptionText}>
				{props.permDescription ? props.permDescription : 'Add description...'}
			</div>
		</>
	);
}


export default DescriptionText;