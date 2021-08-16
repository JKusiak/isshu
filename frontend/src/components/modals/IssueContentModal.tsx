import { Backdrop, createStyles, Fade, makeStyles, Modal, Theme } from "@material-ui/core";
import React, { FC, useState } from "react";
import { INestedIssue } from "../../types/ModelTypes";
import ManageMessages from "../functional/issueFunctionals/ManageMessages";
import UpdateAttachments from "../functional/issueFunctionals/UpdateAttachments";
import UpdateDescription from "../functional/issueFunctionals/UpdateDescription";
import UpdateName from "../functional/issueFunctionals/UpdateName";
import IssueTagsGallery from "../galleries/IssueTagsGallery";
import TagsListModal from "./TagsListModal";


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
                  overflow: 'auto',
                  gridColumn: 1,
                  minHeight: 0,
                  minWidth: 0,
            },
            rightColumn: {
                  display: 'flex',
                  flexDirection: 'column',
                  gridColumn: 2,
                  minHeight: 0,
                  minWidth: 0,
            },
            tagContainer: {
                  display: 'flex',
                  flexDirection: 'row',
            },

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

                                          <div className={classes.tagContainer}>
                                                <IssueTagsGallery 
                                                      tags={props.issue.tags}
                                                      isTagsModalOpen={isTagsModalOpen} 
                                                      setTagsModalOpen={setTagsModalOpen}
                                                />

                                                <TagsListModal
                                                      issue={props.issue}
                                                      isTagsModalOpen={isTagsModalOpen} 
                                                      setTagsModalOpen={setTagsModalOpen}
                                                />
                                          </div>

                                          <UpdateDescription issue={props.issue} />

                                          <UpdateAttachments issue={props.issue} />

                                          <ManageMessages issue={props.issue} />
                              </div>
                              <div className={classes.rightColumn}>
   
                                    
                              </div>
                        </div>
                  </Fade>
            </Modal>
      );
}

export default IssueContentModal;