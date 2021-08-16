import { Card } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC } from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        attachmentsTitle: {
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: theme.spacing(1),
        },
        attachmentCard: {
            display: 'flex',
            height: '120px',
            width: '214px',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all .12s linear',
            boxShadow: theme.shadows[2],
            "&:hover": {
                  boxShadow: theme.shadows[5],
                  cursor: 'pointer',
            },
      },
        addAttachmentIcon: {
            fontSize: '35px',
            color: theme.palette.secondary.main,
      },
    })
);


interface AttachmentsGalleryProps {

}


const AttachmentsGallery: FC<AttachmentsGalleryProps> = (props) => {
    const classes = useStyles();

     
    return(
        <>
            <div className={classes.attachmentsTitle}>Attachments</div>
            <Card className={classes.attachmentCard}>
                <AddIcon className={classes.addAttachmentIcon}/>
            </Card>
        </>
    );
}

export default AttachmentsGallery;
