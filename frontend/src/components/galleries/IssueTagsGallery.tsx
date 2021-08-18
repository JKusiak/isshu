import { Card, CardContent, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/AddOutlined';
import { FC, Fragment } from "react";
import { INestedIssue, ITag } from "../../types/ModelTypes";
import TagsListModal from "../modals/TagsListModal";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      tagsContainer: {
            display: 'flex',
            // not spacing(4) because tag cards need additional margin if the wrap
            marginBottom: theme.spacing(3),
            flexWrap: 'wrap',
      },
      tagCard: {
            display: 'flex',
            flexShrink: 0,
            minHeight: '30px',
            minWidth: '30px',
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
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
            fontSize: '14px',
      },
      modalButtonIcon: {
            fontSize: '15px',
            color: theme.palette.secondary.main,
      },
  })
);


interface TagsGalleryProps {
      issue: INestedIssue,
      isTagsModalOpen: boolean,
      setTagsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const TagsGallery: FC<TagsGalleryProps> = (props) => {
      const classes = useStyles();


      function displayTags() {
            if(props.issue.tags.length > 0) {
                  return(props.issue.tags.map((tag: ITag) => {
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
            <TagsListModal
                  issue={props.issue}
                  isTagsModalOpen={props.isTagsModalOpen} 
                  setTagsModalOpen={props.setTagsModalOpen}
            />
            </>
      );
}

export default TagsGallery;
