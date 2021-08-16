import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { TagTemplate } from '../../../types/ModelContentTemplate';
import { INestedIssue, ITag } from '../../../types/ModelTypes';
import AllTagsList from '../../AllTagsList';


interface ManageTagsProps {
    issue: INestedIssue,
    isTagsModalOpen: boolean,
    setTagsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const ManageTags: FC<ManageTagsProps> = (props) => {
    const [allTags, setAllTags] = useState<[ITag]>([TagTemplate]);
    


    useEffect(() => {
        fetchAllTags();
    }, []);


    function updateIssueTags() {
        const tagsToId = props.issue.tags.map(tag => tag._id);

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
                issue={props.issue}
                updateIssueTags={updateIssueTags}
                allTags={allTags}
                deleteTag={deleteTag}
                addTag={addTag}
            />
        </>
    );
}

export default ManageTags;