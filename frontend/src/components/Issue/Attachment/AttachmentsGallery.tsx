import { Card } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC, Fragment, useContext, useRef } from "react";
import { BoardReducerContext } from "../../../api/Board/GetBoard";
import { ActionTypes } from "../../../reducers/BoardReducer";
import { IAttachment, INestedIssue } from "../../../types/ModelTypes";
import EnlargedAttachmentModal from "./EnlargedAttachmentModal";


const useStyles = makeStyles((theme: Theme) => createStyles({
    wrapper: {
        marginBottom: theme.spacing(2),
    },
    title: {
        fontWeight: 'bold',
        fontSize: '16px',
        marginBottom: theme.spacing(1),
        color: theme.palette.secondary.main,
    },
    gallery: {
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },
    },

    addAttachmentIcon: {
        fontSize: '35px',
        color: theme.palette.secondary.main,
    },
    attachmentCard: {
        display: 'flex',
        flexShrink: 0,
        height: '80px',
        width: '142px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.light,
        transition: 'all .12s linear',
        boxShadow: theme.shadows[2],
        "&:hover": {
            boxShadow: theme.shadows[5],
            cursor: 'pointer',
        },
        marginBottom: theme.spacing(2),
    },

})
);


interface AttachmentsGalleryProps {
    issue: INestedIssue,
    addAttachment: (file: string | Blob) => void,
    deleteAttachment: () => void,
    deleteImage: (clickedAttachment: IAttachment) => void,
}


const AttachmentsGallery: FC<AttachmentsGalleryProps> = (props) => {
    const classes = useStyles();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const { dispatch } = useContext(BoardReducerContext);


    function handleImageClick() {
        imageInputRef.current?.click();
    }


    function handleChooseFile(e: any) {
        const newAttachment = {
            name: e.target.files[0].name,
        };

        const updatedAttachments = [...props.issue.attachments, newAttachment];

        const payload = {
            columnId: props.issue.columnId,
            issueId: props.issue._id,
            modified: {
                attachments: updatedAttachments,
            },
        };
        const mimeType = e.target.files[0].type;
        const correctExtension =  mimeType === 'image/png' || mimeType === 'image/jpg' || mimeType === 'image/jpeg';
        if (correctExtension) {
            dispatch({ type: ActionTypes.UpdateIssue, payload: payload });
            props.addAttachment(e.target.files[0]);
        }
    }


    function displayAttachments() {
        return (props.issue.attachments.map((attachment: IAttachment, index: number) => {
            if (attachment._id) {
                return (
                    <Fragment key={index}>
                        <EnlargedAttachmentModal
                            issue={props.issue}
                            clickedAttachment={attachment}
                            deleteAttachment={props.deleteAttachment}
                            deleteImage={props.deleteImage}
                        />
                    </Fragment>
                );
            }
            return null;
        }));
    }


    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>Attachments</div>
            <div className={classes.gallery}>
                {displayAttachments()}
                <Card className={classes.attachmentCard} onClick={handleImageClick}>
                    <AddIcon className={classes.addAttachmentIcon} />
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleChooseFile}
                        ref={imageInputRef}
                    />
                </Card>
            </div>

        </div>
    );
}

export default AttachmentsGallery;
