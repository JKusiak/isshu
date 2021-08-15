import React, { FC, useContext, useState } from 'react';
import axios from 'axios';
import { INestedIssue, ITag} from '../../../types/ModelTypes';
import { BoardReducerContext } from '../GetBoard';
import { ActionTypes } from '../../reducers/BoardReducer';
import TagsModal from '../../modals/TagsModal';
import IssueTagsGallery from '../../IssueTagsGallery';
import { TagTemplate } from '../../../types/ModelContentTemplate';
import { useEffect } from 'react';
import AllTagsList from '../../AllTagsList';
import AddTagButton from '../../buttons/issueButtons/AddTagButton';


interface ManageTagsProps {
    issue: INestedIssue,
    isTagsModalOpen: boolean,
    setTagsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const ManageTags: FC<ManageTagsProps> = (props) => {
    const [issueTags, setIssueTags] = useState<[any]>(props.issue.tags);
    const [allTags, setAllTags] = useState<[ITag]>([TagTemplate]);
    const { dispatch } = useContext(BoardReducerContext);


    useEffect(() => {
        fetchAllTags();
    }, []);


    function updateIssueTags() {
        const tagsToId = issueTags.map(tag => tag._id);

        const requestBody = {
                tags: tagsToId,
        }

        axios.post(`http://localhost:5000/issues/update/${props.issue._id}`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
        }).catch((err) => {
                console.log(err);
        })

        const payload = {
            columnId: props.issue.columnId,
            issueId: props.issue._id,
            modified: {
                tags: issueTags,
            },
        }
        dispatch({type: ActionTypes.UpdateIssue, payload: payload})
    }


    function fetchAllTags() {
        axios.get('http://localhost:5000/tags/')
        .then((res) => {
            setAllTags(res.data);
        })
    }


    function addTag(e: React.SyntheticEvent, newTagName: string) {
        e.preventDefault();

        const requestBody = {
            name: newTagName
        }

        axios.post('http://localhost:5000/tags/add', requestBody)
        .then(() => {
            fetchAllTags();
        })
    }


    function deleteTag(e: React.SyntheticEvent, tagId: string) {
        e.preventDefault();

        axios.delete(`http://localhost:5000/tags/delete/${tagId}`)
        .then(() => {
            fetchAllTags();
        })
    }

    
    return (
        <>
            <AllTagsList
                issueTags={issueTags}
                setIssueTags={setIssueTags}
                updateIssueTags={updateIssueTags}
                allTags={allTags}
                deleteTag={deleteTag}
                addTag={addTag}
            />
        </>
    );
}

export default ManageTags;