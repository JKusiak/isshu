import { Card, CardContent, IconButton, Typography } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";      
import { FC, Fragment } from "react";
import { ITag } from "../types/ModelTypes";
import AddIcon from '@material-ui/icons/AddOutlined';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      tagsContainer: {
            display: 'flex',
      },
      tagCard: {
            display: 'flex',
            minWidth: '30px',
            marginRight: '5px',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all .12s linear',
            boxShadow: theme.shadows[2],
            "&:hover": {
                  cursor: 'pointer',
                  boxShadow: theme.shadows[5],
            },
            "& .MuiCardContent-root": {
                  padding: theme.spacing(1),
            },
      },
      tagName: {
            fontSize: '12px',
      },
      modalButtonIcon: {
            fontSize: '15px',
            color: theme.palette.secondary.main,
      },
  })
);


interface TagsGalleryProps {
      tags: [ITag],
      isTagsModalOpen: boolean,
      setTagsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const TagsGallery: FC<TagsGalleryProps> = (props) => {
      const classes = useStyles();


      function displayTags() {
            if(props.tags.length > 0) {
                  return(props.tags.map((tag: ITag) => {
                        return(
                              <Fragment key={tag._id}>
                                    <Card className={classes.tagCard} onClick={() => props.setTagsModalOpen(true)}>
                                          <CardContent>
                                                <Typography className={classes.tagName} component="h5" variant="h5">
                                                      {tag.name}
                                                </Typography>
                                          </CardContent>
                                    </Card>
                              </Fragment>
                        );
                  }));
            }
      }
     

      return(
            <>
            <div className={classes.tagsContainer}>
                  {displayTags()}
                  <Card className={classes.tagCard} onClick={() => props.setTagsModalOpen(true)}>
                        <AddIcon className={classes.modalButtonIcon}/> 
                  </Card>
            </div>
            </>
      );
}

export default TagsGallery;
