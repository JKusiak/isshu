import axios from 'axios';
import React, { FC, useContext, useState } from 'react';
import { AuthUserContext } from '../../App';
import AllTagsGallery from '../../components/Tag/AllTagsGallery';
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
    const { loggedInUser } = useContext(AuthUserContext);


    useMountEffect(fetchAllTags);


    function updateIssueTags() {
        const tagsToId = props.issue.tags.map(tag => tag._id);

        const requestBody = {
            tags: tagsToId,
        }

        axios.post(`/issues/update/${props.issue._id}`, requestBody)
            .catch((err) => {
                console.log(err);
            })
    }


    function fetchAllTags() {
        axios.get(`/tags/${loggedInUser.organizationId}`)
            .then((res) => {
                setAllTags(res.data);
            })
    }


    function addTag(e: React.SyntheticEvent, newTagName: string) {
        e.preventDefault();

        const requestBody = {
            name: newTagName,
            organizationId: loggedInUser.organizationId,
        }

        axios.post('/tags/add', requestBody)
            .then(() => {
                fetchAllTags();
            })
    }


    function deleteTag(e: React.SyntheticEvent, tagId: string) {
        e.preventDefault();

        axios.delete(`/tags/delete/${tagId}`)
            .then(() => {
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