import { Card, CardContent, Typography } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";      
import { FC, Fragment } from "react";
import { ITag } from "../types/ModelTypes";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      tagsContainer: {
            display: 'flex',
      },
      tagCard: {
            display: 'flex',
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
  })
);


interface TagsGalleryProps {
      tags: [ITag];
}


const TagsGallery: FC<TagsGalleryProps> = (props) => {
      const classes = useStyles();


      function displayTags() {
            if(props.tags.length > 0) {
                  return(props.tags.map((tag: ITag) => {
                        return(
                              <Fragment key={tag._id}>
                                    <Card className={classes.tagCard} style={{padding: 0}}>
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
            </div>
            </>
      );
}

export default TagsGallery;
