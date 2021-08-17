import React from "react";
import styled from "styled-components";
import Map from "../../pages/map/Map";

type MainProps = {};
type MainState = {};

class Main extends React.Component<MainProps, MainState>{
    constructor(props: MainProps){
        super(props);
    }

    render(){
        return(
            <main>
                <Map></Map>
            </main>
        );
    }
}

export default Main;