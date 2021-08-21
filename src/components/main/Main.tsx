import React from "react";
import styled from "styled-components";
import Map from "../../pages/map/Map";

const _Main = styled.main`
    overflow: hidden;
`;

type MainProps = {};
type MainState = {};

class Main extends React.Component<MainProps, MainState>{
    constructor(props: MainProps){
        super(props);
    }

    render(){
        return(
            <_Main>
                <Map></Map>
            </_Main>
        );
    }
}

export default Main;