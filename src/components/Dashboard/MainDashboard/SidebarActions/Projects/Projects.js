import React from "react";

import ProjectsHeader from "./ProjectsHeader/ProjectsHeader";
import ProjectsCardItem from "./ProjectsCardItem/ProjectsCardItem";

const Projects = props => {

    return (
        <div className='dashboard_main_projects'>
            <ProjectsHeader />
            <div className='dashboard_main_projects_cards'>
                <ProjectsCardItem status='Active' />
                <ProjectsCardItem />
                <ProjectsCardItem />
                <ProjectsCardItem status='Active' />
                <ProjectsCardItem />
                <ProjectsCardItem status='Active' />
                <ProjectsCardItem status='Active' />
            </div>
        </div>
    )
};

export default Projects;