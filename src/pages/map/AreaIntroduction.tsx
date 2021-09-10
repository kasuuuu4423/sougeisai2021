import React from "react";
import styled from "styled-components";
import Color from "../../assets/cssVars/Color";

type AreaIntroductionProps = {
    name: string,
    introduction: string,
};

type AreaIntroductionState = {};

class AreaIntroduction extends React.Component<AreaIntroductionProps, AreaIntroductionState>{
    constructor(props: AreaIntroductionProps){
        super(props);
    }

    render(){
        return(
            <Introduction>
                <h2>{this.props.name}</h2>
                <div className="introduction">{this.props.introduction}</div>
            </Introduction>
        );
    }
}

export default AreaIntroduction;

const Introduction = styled.div`
    position: fixed;
    top: 20px;
    left: 0;
    max-width: 100%;
    h2, .introduction{
        background: ${Color.WHITE};
        padding: 20px;
        margin: 0;
    }
    h2{
        min-width: 100px;
        width: fit-content;
        border-radius: 0 2rem 1rem 0;
    }
    .introduction{
        min-width: 200px;
        width: fit-content;
        border-radius: 0 2rem 1.5rem 0;
        max-width: calc(100% - 40px);
        line-break: anywhere;
        white-space: pre-wrap;
    }
    @media screen and (max-width: 750px){
        h2, .introduction{
            padding: 10px;
        }
    }
`;