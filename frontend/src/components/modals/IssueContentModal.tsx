import { Backdrop, createStyles, Fade, makeStyles, Modal, Theme } from "@material-ui/core";
import React, { FC, useState } from "react";
import { INestedIssue } from "../../types/ModelTypes";
import ManageAttachments from "../functional/issueFunctionals/ManageAttachments";
import ManageContributors from "../functional/issueFunctionals/ManageContributors";
import ManageMessages from "../functional/issueFunctionals/ManageMessages";
import ManageSteps from "../functional/issueFunctionals/ManageSteps";
import UpdateDescription from "../functional/issueFunctionals/UpdateDescription";
import UpdateName from "../functional/issueFunctionals/UpdateName";
import IssueTagsGallery from "../galleries/IssueTagsGallery";


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
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  paddingRight: theme.spacing(2),
                  gridColumn: 1,
                  minHeight: 0,
                  minWidth: 0,
            },
            rightColumn: {
                  display: 'flex',
                  flexDirection: 'column',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  gridColumn: 2,
                  minHeight: 0,
                  minWidth: 0,
            },
            creatorContainer:{
                  fontSize: '16px',
                  marginBottom: theme.spacing(4),
            },
            creatorTitle: {
                  fontWeight: 'bold',
            },
            creatorName: {
                  marginLeft: theme.spacing(2),
            }

      }
));


interface IssueContentModalProps {
      issue: INestedIssue,
      isIssueModalOpen: boolean,
      setIssueModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const IssueContentModal: FC<IssueContentModalProps> = (props) => {
      const classes = useStyles();
      const [isTagsModalOpen, setTagsModalOpen] = useState(false);

      return(
            <Modal
                  className={classes.modal}
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={props.isIssueModalOpen}
                  onClose={() => props.setIssueModalOpen(false)}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                        timeout: 500,
                  }}
            >
                  <Fade in={props.isIssueModalOpen}>
                        <div className={classes.paper}>
                              <div className={classes.leftColumn}>
                                    <UpdateName issue={props.issue} />

                                    <IssueTagsGallery
                                          issue={props.issue}
                                          isTagsModalOpen={isTagsModalOpen} 
                                          setTagsModalOpen={setTagsModalOpen}
                                    />

                                    <UpdateDescription issue={props.issue} />

                                    <ManageAttachments issue={props.issue} />

                                    <ManageMessages issue={props.issue} />
                              </div>
                              <div className={classes.rightColumn}>
                                    <div className={classes.creatorContainer}>
                                         <span className={classes.creatorTitle}>Creator</span> 
                                         <span className={classes.creatorName}>{`${props.issue.creator.name} ${props.issue.creator.surname}`}</span>
                                    </div>
                                    <ManageContributors issue={props.issue} />
                                    <ManageSteps issue={props.issue} />
                              </div>
                        </div>
                  </Fade>
            </Modal>
      );
}

export default IssueContentModal;