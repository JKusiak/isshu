import { Card } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC } from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            marginBottom: theme.spacing(4),
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
            width: '100%',
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
           marginBottom: theme.spacing(4),
           marginRight: theme.spacing(2),
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
        <div className={classes.wrapper}>
            <div className={classes.title}>Attachments</div>
            <div className={classes.gallery}>
            <Card className={classes.attachmentCard}>
                <AddIcon className={classes.addAttachmentIcon}/>
            </Card><Card className={classes.attachmentCard}>
                <AddIcon className={classes.addAttachmentIcon}/>
            </Card><Card className={classes.attachmentCard}>
                <AddIcon className={classes.addAttachmentIcon}/>
            </Card><Card className={classes.attachmentCard}>
                <AddIcon className={classes.addAttachmentIcon}/>
            </Card><Card className={classes.attachmentCard}>
                <AddIcon className={classes.addAttachmentIcon}/>
            </Card>
            </div>
            
        </div>
    );
}

export default AttachmentsGallery;
