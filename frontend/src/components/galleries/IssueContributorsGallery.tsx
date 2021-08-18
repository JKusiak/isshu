import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, useContext } from 'react';
import { BoardReducerContext } from '../functional/GetBoard';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contributorsContainer: {
      marginBottom: theme.spacing(4),
    },
    headline: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
  })
);


interface IssueContributorsGalleryProps {

}


const IssueContributorsGallery: FC<IssueContributorsGalleryProps> = (props) => {
    const classes = useStyles();
    const { dispatch } = useContext(BoardReducerContext);

    return (
      <div className={classes.contributorsContainer}>
        <Typography className={classes.headline} component="h5" variant="h5">
            Contributors
        </Typography>
      </div>
      
    );
}

export default IssueContributorsGallery;