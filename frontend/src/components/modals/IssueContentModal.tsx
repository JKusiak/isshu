import { Backdrop, createStyles, Fade, makeStyles, Modal, Theme } from "@material-ui/core";
import React, { FC, useState } from "react";
import { INestedIssue } from "../../types/ModelTypes";
import ArchivizeIssue from "../functional/issueFunctionals/ArchivizeIssue";
import ManageAttachments from "../functional/issueFunctionals/ManageAttachments";
import ManageCompletion from "../functional/issueFunctionals/ManageCompletion";
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
                  [theme.breakpoints.up('sm')]: {
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr',
                        gridTemplateRows: 'auto 10fr',
                        gridTemplateAreas: `
                              "header header"
                              "leftColumn rightColumn"`,
                        width: '75vw',
                        minWidth: '430px',
                        height: '75vh',
                        padding: theme.spacing(4, 4, 4),
                  },
                  [theme.breakpoints.down('xs')]: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '75vw',
                        height: '75vh',
                        overflow: 'scroll',
                        padding: theme.spacing(2),
                  },
                  backgroundColor: theme.palette.primary.main,
                  border: '2px solid',
                  borderColor: theme.palette.secondary.main,
                  borderRadius: '10px',
                  boxShadow: theme.shadows[2],
            },
            name: {
                  gridArea: 'header',
                  justifySelf: 'start',
                  width: '67%',
                  paddingRight: theme.spacing(2),
            },
            buttons: {
                  display: 'flex',
                  [theme.breakpoints.up('sm')]: {
                        gridArea: 'header',
                        justifySelf: 'end',
                        display: 'flex',
                        overflowX: 'hidden',
                  },
                  [theme.breakpoints.down('sm')]: {
                        height: '100%',
                        marginBottom: theme.spacing(4),
                  },
            },
            leftColumn: {
                  gridArea: 'leftColumn',
                  display: 'flex',
                  flexDirection: 'column',
                  [theme.breakpoints.up('sm')]: {
                        paddingRight: theme.spacing(2),
                        minHeight: 0,
                        minWidth: 0,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                  },
                  [theme.breakpoints.down('sm')]: {
                        height: 'auto',
                  },
            },
            rightColumn: {
                  gridArea: 'rightColumn',
                  display: 'flex',
                  flexDirection: 'column',

                  [theme.breakpoints.up('sm')]: {
                        paddingRight: theme.spacing(2),
                        paddingLeft: theme.spacing(2),
                        minHeight: 0,
                        minWidth: 0,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                  },
                  [theme.breakpoints.down('sm')]: {
                        height: 'auto',
                  },
            },
            creatorContainer: {
                  fontSize: '16px',
                  marginBottom: theme.spacing(4),
            },
            creatorTitle: {
                  fontWeight: 'bold',
                  color: theme.palette.secondary.main,
            },
            creatorName: {
                  marginLeft: theme.spacing(2),
                  color: theme.palette.secondary.main,
            }
      })
);


interface IssueContentModalProps {
      issue: INestedIssue,
      isIssueModalOpen: boolean,
      setIssueModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const IssueContentModal: FC<IssueContentModalProps> = (props) => {
      const classes = useStyles();
      const [isTagsModalOpen, setTagsModalOpen] = useState(false);

      return (
            <Modal
                  className={classes.modal}
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={props.isIssueModalOpen}
                  onClose={() => { { props.setIssueModalOpen(false) } }}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                        timeout: 500,
                  }}
            >
                  <Fade in={props.isIssueModalOpen}>
                        <div className={classes.paper}>
                              <div className={classes.name}>
                                    <UpdateName issue={props.issue} />
                              </div>
                              <div className={classes.buttons}>
                                    <ManageCompletion issue={props.issue} />
                                    <ArchivizeIssue issue={props.issue} setIssueModalOpen={props.setIssueModalOpen} />
                              </div>
                              <div className={classes.leftColumn}>
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
                                          <span className={classes.creatorName}>
                                                {`${props.issue.creator.name} ${props.issue.creator.surname}`}
                                          </span>
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