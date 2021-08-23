import axios from "axios";
import { FC, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ProjectTemplate } from "../../types/ModelContentTemplate";
import { INestedProject } from "../../types/ModelTypes";
import ProjectInfoBanner from "../ProjectInfoBanner";
import { ActionTypes, bannerReducer } from "../reducers/BannerReducer";


interface GetProjectInfoBannerProps {
      project: INestedProject,
}

const GetProjectInfoBanner: FC<GetProjectInfoBannerProps> = (props) => {
      const { projectId } = useParams<{ projectId: string }>();
      const [projectBannerState, dispatch] = useReducer(bannerReducer, ProjectTemplate)
      

      useEffect(() => {
            const initialReducerData = {
                  _id: props.project._id,
                  name: props.project.name,
                  description: props.project.description,
                  dateStart: props.project.dateStart,
                  dateEnd: props.project.dateEnd,
                  creator: props.project.creator,
            }

            dispatch({type: ActionTypes.FetchData, payload: initialReducerData});
      }, [props.project])


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
            <ProjectInfoBanner projectBannerState={projectBannerState} dispatch={dispatch} updateProject={updateProject}/>
      </>
      );
}

export default GetProjectInfoBanner;