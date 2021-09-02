import { FC } from 'react';
import { INestedIssue } from '../../../types/ModelTypes';
import AttachmentsGallery from '../../galleries/AttachmentsGallery';


interface UpdateAttachmentsProps {
      issue: INestedIssue,
}


const UpdateAttachments: FC<UpdateAttachmentsProps> = (props) => {


      return (
            <AttachmentsGallery
                            
            />
      );
}

export default UpdateAttachments;