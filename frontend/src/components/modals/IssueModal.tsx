import { Backdrop, createStyles, Fade, makeStyles, Modal, Theme } from "@material-ui/core";
import React, { FC, useState } from "react";
import { INestedIssue } from "../../types/ModelTypes";
import UpdateDescription from "../functional/issueFunctionals/UpdateDescription";
import UpdateName from "../functional/issueFunctionals/UpdateName";
import IssueTagsGallery from "../IssueTagsGallery";
import TagsModal from "./TagsModal";


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
                  minHeight: 0,
                  minWidth: 0,
            },
            rightColumn: {
                  gridColumn: 2,
                  minHeight: 0,
                  minWidth: 0,
            },
            scrollableContent: {
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'auto',
            },
            tagContainer: {
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: theme.spacing(4),
            },

      }
));


interface IssueModalProps {
      issue: INestedIssue,
      isIssueModalOpen: boolean,
      setIssueModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const IssueModal: FC<IssueModalProps> = (props) => {
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
                                    <div className={classes.scrollableContent}>
                                          <UpdateName issue={props.issue} />

                                          <div className={classes.tagContainer}>
                                                <IssueTagsGallery 
                                                      tags={props.issue.tags}
                                                      isTagsModalOpen={isTagsModalOpen} 
                                                      setTagsModalOpen={setTagsModalOpen}
                                                />

                                                <TagsModal
                                                      issue={props.issue}
                                                      isTagsModalOpen={isTagsModalOpen} 
                                                      setTagsModalOpen={setTagsModalOpen}
                                                />
                                          </div>

                                          <UpdateDescription issue={props.issue} />


                                    </div>
                              </div>
                              <div className={classes.rightColumn}>
                                    <div className={classes.scrollableContent}>

                                    </div>
                                    
                              </div>
                        </div>
                  </Fade>
            </Modal>
      );
}

export default IssueModal;