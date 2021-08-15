import { Backdrop, createStyles, Fade, makeStyles, Modal, Theme } from "@material-ui/core";
import React, { FC } from "react";
import { INestedIssue } from "../../types/ModelTypes";
import ManageTags from "../functional/issueFunctionals/ManageTags";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            modal: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
            },
            paper: {
                  display: 'grid',
                  width: '25vw',
                  minWidth: '270px',
                  height: '60vh',
                  backgroundColor: theme.palette.primary.main,
                  border: '2px solid',
                  borderColor: theme.palette.secondary.main,
                  borderRadius: '10px',
                  boxShadow: theme.shadows[2],
                  padding: theme.spacing(2, 2 ,2),
            },
      }
));


interface IssueModalProps {
      issue: INestedIssue,
      isTagsModalOpen: boolean,
      setTagsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,

}


const IssueModal: FC<IssueModalProps> = (props) => {
      const classes = useStyles();


      return(
            <Modal
                  className={classes.modal}
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={props.isTagsModalOpen}
                  onClose={() => props.setTagsModalOpen(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                        timeout: 500,
                  }}
            >
                  <Fade in={props.isTagsModalOpen}>
                        <div className={classes.paper}>
                            <ManageTags
                                issue={props.issue} 
                                isTagsModalOpen={props.isTagsModalOpen} 
                                setTagsModalOpen={props.setTagsModalOpen} 
                            />
                        </div>
                  </Fade>
            </Modal>
      );
}

export default IssueModal;