import axios from "axios";
import { FC, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectTemplate } from "../../types/ModelContentTemplate";
import { INestedProject } from "../../types/ModelTypes";
import ProjectInfoBanner from "../ProjectInfoBanner";
import { ActionTypes, bannerReducer } from "../reducers/BannerReducer";
import { getLoggedInUser } from "./GetLoggedInUser";


interface GetProjectInfoBannerProps {
      project: INestedProject,
}

const GetProjectInfoBanner: FC<GetProjectInfoBannerProps> = (props) => {
      const { projectId } = useParams<{ projectId: string }>();
      const [projectBannerState, dispatch] = useReducer(bannerReducer, ProjectTemplate);
      const [file, setFile] = useState<string | Blob>('');
	const [imageUrl, setUrl] = useState<string | undefined>();
      const loggedInUser = getLoggedInUser();
      

      useEffect(() => {
            const initialReducerData = {
                  _id: props.project._id,
                  name: props.project.name,
                  description: props.project.description,
                  dateStart: props.project.dateStart,
                  dateEnd: props.project.dateEnd,
                  creator: props.project.creator,
            }
            dispatch({ type: ActionTypes.FetchData, payload: initialReducerData });
      }, [props.project])


      // when props are loaded, fetches image from the server
	useEffect(() => {
		if (props.project._id) {
			fetchImage(`uploads/organization-${loggedInUser.organizationId}/projects-covers/${props.project._id}.jpg`);
		}
	}, [props.project._id]);


      // executes uploading image to server when user chooses picture without submit button
	useEffect(() => {
            console.log(file);
		if (file != '') uploadImage();
	}, [file]);


	function uploadImage() {
		const formData = new FormData();

		formData.append('organizationId', loggedInUser.organizationId);
		formData.append('directory', 'projects-covers');
		formData.append('imageUpload', file);

		axios.post(`http://localhost:5000/uploads/add/${props.project._id}`, formData, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'multipart/form-data'
			}
		}).then((resp) => {
			const adjustedPath = resp.data.replaceAll('\\', '/');
			fetchImage(adjustedPath);
			// setErrorText('');
		}).catch((err) => {
			// setErrorText('Please upload in .jpg format and under 1MB file size');
		})
	}


      function fetchImage(path: string) {
		axios.get(`http://localhost:5000/${path}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			}
		}).then(() => {
			setUrl('');
			setUrl(`http://localhost:5000/${path}`);
		}).catch((err) => {
			setUrl(undefined);
		})
	}


      function updateProject() {
            axios.post(`http://localhost:5000/projects/update/${projectId}`, projectBannerState, {
                  headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
            }).catch((err) => {
                  console.log(err);
            });
      }


      return (
            <>
                  <ProjectInfoBanner
                        projectBannerState={projectBannerState}
                        dispatch={dispatch}
                        updateProject={updateProject}
                        bannerPath={imageUrl}
                        setFile={setFile}
                  />
            </>
      );
}

export default GetProjectInfoBanner;