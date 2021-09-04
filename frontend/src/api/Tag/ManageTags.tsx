import axios from 'axios';
import React, { FC, useState } from 'react';
import AllTagsGallery from '../../components/Tag/AllTagsGallery';
import { getLoggedInUser } from '../../functions/GetLoggedInUser';
import { useMountEffect } from '../../hooks/useMountEffect';
import { TagTemplate } from '../../types/ModelContentTemplate';
import { INestedIssue, ITag } from '../../types/ModelTypes';



interface ManageTagsProps {
    issue: INestedIssue,
    isTagsModalOpen: boolean,
    setTagsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


const ManageTags: FC<ManageTagsProps> = (props) => {
    const [allTags, setAllTags] = useState<[ITag]>([TagTemplate]);
    const loggedInUser = getLoggedInUser();


    useMountEffect(fetchAllTags);


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
        axios.get(`http://localhost:5000/tags/${loggedInUser.organizationId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            setAllTags(res.data);
        })
        console.log('fetched');
    }


    function addTag(e: React.SyntheticEvent, newTagName: string) {
        e.preventDefault();

        const requestBody = {
            name: newTagName,
            organizationId: loggedInUser.organizationId,
        }

        axios.post('http://localhost:5000/tags/add', requestBody, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            fetchAllTags();
        })
    }


    function deleteTag(e: React.SyntheticEvent, tagId: string) {
        e.preventDefault();

        axios.delete(`http://localhost:5000/tags/delete/${tagId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            fetchAllTags();
        })
    }


    return (
        <>
            <AllTagsGallery
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