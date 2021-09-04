import { Card, CardContent, createStyles, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/ClearOutlined';
import React, { FC, useContext } from 'react';
import { BoardReducerContext } from '../../api/Board/GetBoard';
import { ActionTypes } from '../../reducers/BoardReducer';
import { INestedIssue, ITag } from '../../types/ModelTypes';
import AddTagButton from './AddTagButton';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tagsContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        headline: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: theme.palette.secondary.main,
            alignSelf: 'center',
            marginBottom: theme.spacing(2),
        },
        tagItem: {
            display: 'flex',
        },
        tagIncludedCard: {
            width: '100%',
            marginBottom: '10px',
            marginRight: '10px',
            backgroundColor: theme.palette.primary.light,
            transition: 'all .12s linear',
            boxShadow: theme.shadows[2],
            "&:hover": {
                cursor: 'pointer',
                boxShadow: theme.shadows[5],
            },
            "& .MuiCardContent-root": {
                padding: theme.spacing(1),
            },
            "& *": {
                fontWeight: 'bold',
                color: theme.palette.secondary.main
            }
        },
        tagNotIncludedCard: {
            width: '100%',
            marginBottom: '10px',
            marginRight: '10px',
            backgroundColor: theme.palette.primary.light,
            transition: 'all .12s linear',
            boxShadow: theme.shadows[2],
            "&:hover": {
                cursor: 'pointer',
                boxShadow: theme.shadows[5],
            },
            "& .MuiCardContent-root": {
                padding: theme.spacing(1),
            },
            "& *": {
                color: theme.palette.secondary.main
            }
        },
        tagName: {
            fontSize: '12px',
        },
        deleteButton: {
            width: '30px',
            height: '30px',
        },
        deleteIcon: {
            color: theme.palette.secondary.main,
        }
    })
);


interface AllTagsGalleryProps {
    issue: INestedIssue,
    updateIssueTags: () => void,
    allTags: [ITag],
    deleteTag: (e: React.SyntheticEvent, tagId: string) => void,
    addTag: (e: React.SyntheticEvent, newTagName: string) => void,
}


const AllTagsGallery: FC<AllTagsGalleryProps> = (props) => {
    const classes = useStyles();
    const { dispatch } = useContext(BoardReducerContext);


    function checkIfChosen(tag: ITag) {
        return (
            props.issue.tags.some((issueTag: ITag) => issueTag._id === tag._id) ? true : false
        );
    }


    function displayType(isChosen: boolean) {
        return (
            isChosen ?
                classes.tagIncludedCard :
                classes.tagNotIncludedCard
        );
    }


    function manageClicked(e: React.SyntheticEvent, isChosen: boolean, clickedTag: ITag) {
        e.preventDefault();

        if (isChosen) {
            const tagsWithoutClicked = props.issue.tags.filter((issueTag: ITag) => issueTag._id !== clickedTag._id);

            const payload = {
                columnId: props.issue.columnId,
                issueId: props.issue._id,
                modified: {
                    tags: tagsWithoutClicked,
                },
            }

            dispatch({ type: ActionTypes.UpdateIssue, payload: payload })
        } else {
            const tagsWithClicked = [...props.issue.tags, clickedTag];

            const payload = {
                columnId: props.issue.columnId,
                issueId: props.issue._id,
                modified: {
                    tags: tagsWithClicked,
                },
            }

            dispatch({ type: ActionTypes.UpdateIssue, payload: payload })
        }

        props.updateIssueTags();
    }


    return (
        <div className={classes.tagsContainer}>
            <Typography className={classes.headline} component="h5" variant="h5">
                All tags
            </Typography>
            {props.allTags.map((tag: ITag, index: number) => {
                const isChosen = checkIfChosen(tag);

                return (
                    <div className={classes.tagItem} key={index}>
                        <Card className={displayType(isChosen)} onClick={(e) => manageClicked(e, isChosen, tag)}>
                            <CardContent>
                                <Typography className={classes.tagName} component="h5" variant="h5">
                                    {tag.name}
                                </Typography>
                            </CardContent>
                        </Card>
                        <IconButton className={classes.deleteButton} onClick={(e) => props.deleteTag(e, tag._id)}>
                            <DeleteIcon className={classes.deleteIcon} />
                        </IconButton>
                    </div>

                )
            })}
            <AddTagButton
                addTag={props.addTag}
            />
        </div>
    );
}

export default AllTagsGallery;