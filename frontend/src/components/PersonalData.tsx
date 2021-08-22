import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";
import { IUser } from "../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      minWidth: 360,
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.light
    },
    nested: {
      color: theme.palette.secondary.main
    }
  })
);


interface PersonalDataProps {
      user: IUser;
}


const PersonalData: FC<PersonalDataProps> = (props) => {
      const classes = useStyles();

      return(
            <div className={classes.root}>
                  <h3>Name: {props.user.name}</h3>
                  <h3>Surname: {props.user.surname}</h3>
                  <h3>Email: {props.user.email}</h3>  
            </div>
      );
}

export default PersonalData;