import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FC } from "react";


const useStyles = makeStyles((theme: Theme) =>
      createStyles({

      }
));


interface ProjectDataProps {
      project: any,
}


const ProjectData: FC<ProjectDataProps> = (props) => {
      const classes = useStyles();


      return (
            <>
                  <div>{props.project.name}</div>
                  <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat luctus nibh non pulvinar. Sed iaculis at mi sed fermentum. Suspendisse maximus luctus nisl, ut feugiat lectus consequat ac. Nulla sit amet urna orci. Vivamus neque metus, sagittis in cursus condimentum, aliquam at urna. Nullam mollis eu mi vitae mattis. Morbi finibus, odio eget hendrerit mollis, risus magna venenatis risus, sit amet suscipit nibh massa vel ante. Nulla in justo nec magna tincidunt sodales. Quisque eu mattis velit. Praesent finibus est eu nunc molestie, in imperdiet nisl convallis. Nunc elit odio, viverra eget magna nec, aliquet fringilla ligula.
                        <br/><br/><br/>
                        Suspendisse aliquam ultricies augue eu rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vel nisl purus. Fusce in sem tempor, elementum nulla eget, sagittis eros. Pellentesque eleifend risus id pharetra consectetur. Proin sagittis convallis ex, ut ullamcorper felis mollis ut. Cras lacus tellus, iaculis ut pellentesque vitae, sodales in enim. Fusce eu risus sit amet enim tincidunt congue. Mauris et felis a dui accumsan mollis ac non libero. In posuere massa justo. Nulla suscipit magna at diam tincidunt placerat at vitae ante. Integer sed elit pharetra, vehicula ipsum quis, ornare velit. Nam sagittis quis justo at scelerisque.
                        <br/><br/><br/>
                        Vestibulum ullamcorper sit amet neque id porta. Morbi condimentum neque ut venenatis volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam gravida massa sit amet dui hendrerit, quis mollis ante ornare. Aliquam lobortis ligula diam, tempor aliquet purus placerat vel. Vivamus ac luctus lorem. Vivamus porta scelerisque purus, ac ultricies purus pellentesque euismod.
                  </div>
                  
            </>
      );
}

export default ProjectData;