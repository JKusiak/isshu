import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      minWidth: 360,
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.primary.light
    },
    nested: {
      color: theme.palette.secondary.dark
    }
  })
);


interface PersonalDataProps {
      credentials: any;
}


const PersonalData: FC<PersonalDataProps> = (props) => {
      const classes = useStyles();

      return(
            <div className={classes.root}>
                  <h3>Name: {props.credentials.name}</h3>
                  <h3>Surname: {props.credentials.surname}</h3>
                  <h3>Email: {props.credentials.email}</h3>  
            </div>
      );
}

export default PersonalData;