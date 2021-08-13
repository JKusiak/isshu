import { Backdrop, createStyles, Fade, makeStyles, Modal, Theme } from "@material-ui/core";
import React, { FC } from "react";
import { INestedIssue } from "../../types/ModelTypes";
import UpdateIssue from "../functional/UpdateIssueModal";
import TagsGallery from "../TagsGallery";

const useStyles = makeStyles((theme: Theme) =>
      createStyles({
            modal: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
            },
            paper: {
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  columnGap: theme.spacing(4),
                  width: '75vw',
                  minWidth: '430px',
                  height: '75vh',
                  backgroundColor: theme.palette.primary.main,
                  border: '2px solid',
                  borderColor: theme.palette.secondary.main,
                  borderRadius: '10px',
                  boxShadow: theme.shadows[2],
                  padding: theme.spacing(4, 4, 4),
            },
            leftColumn: {
                  gridColumn: 1,
                  display: 'flex',
                  minHeight: 0,
                  minWidth: 0,
            },
            rightColumn: {
                  gridColumn: 2,
                  display: 'flex',
                  minHeight: 0,
                  minWidth: 0,
            },
            scrollableContent: {
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'auto',
            },
            name: {
                 fontWeight: 'bold',
                 fontSize: '24px',
                 marginBottom: theme.spacing(2),
            },
            tags: {
                  fontSize: '14px',
                  marginBottom: theme.spacing(2),
            },
            description: {
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginBottom: theme.spacing(2),
            },
            photos: {


            },
            messages: {

            },
            creator: {

            },
            contributors: {
                  

            },
            steps: {
                 

            },
      }
));


interface IssueModalProps {
      issue: INestedIssue,
      isModalOpen: boolean,
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const IssueModal: FC<IssueModalProps> = (props) => {
      const classes = useStyles();

      return(
            <Modal
                  className={classes.modal}
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={props.isModalOpen}
                  onClose={() => props.setIsModalOpen(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                        timeout: 500,
                  }}
            >
                  <Fade in={props.isModalOpen}>
                        <div className={classes.paper}>
                              <div className={classes.leftColumn}>
                                    <div className={classes.scrollableContent}>
                                          <div className={classes.name}>
                                               
                                          </div>
                                          <div className={classes.tags}>
                                                
                                          </div>
                                          <div className={classes.description}>
                                                Description
                                               
                                          </div>
                                          <div className={classes.photos}>
                                                Attachments
                                          </div>
                                          <div className={classes.messages}>
                                                
                                          </div>
                                    </div>
                              </div>
                              <div className={classes.rightColumn}>
                                    <div className={classes.scrollableContent}>
                                          <div className={classes.creator}>
                                                
                                          </div>
                                          <div className={classes.contributors}>
                                               
                                          </div>
                                          <div className={classes.steps}>
                                               
                                          </div>
                                    </div>
                                    
                              </div>
                        </div>
                  </Fade>
            </Modal>
      );
}

export default IssueModal;