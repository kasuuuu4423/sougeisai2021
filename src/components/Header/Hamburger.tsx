import React from "react";
import styled, {css} from "styled-components";
import Color from "../../assets/cssVars/Color";
import Margin from "../../assets/cssVars/Margin";
import Other from "../../assets/cssVars/Other";

type LineProps = {
    isOpen: boolean | false;
};

const Line = styled.span<LineProps>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${Color.BLACK};
    width: 35px;
    height: 4px;
    transition: ${Other.TRANSITION};
    display: block;
    ${(props) =>
        props.isOpen
            ? css`
                background: rgba(0,0,0,0);
            `
    :''}
`;

const LineTop = styled(Line)`
    top: 0%;
    ${(props) => 
        props.isOpen
            ? css`
                background: ${Color.BLACK};
                transform: translate(-50%, -50%) rotate(45deg);
                top: 50%;
            `
    :''}
`;

const LineBottom = styled(Line)`
    top: 100%;
    ${(props) => 
        props.isOpen
            ? css`
                background: ${Color.BLACK};
                transform: translate(-50%, -50%) rotate(-45deg);
                top: 50%;
            `
    :''}
`;

const WrapHam = styled.div`
    position: fixed;
    top: 75px;
    width: 35px;
    height: 20px;
    margin: ${Margin.M};
    cursor: pointer;
`;

type HamProps = {
    status?: boolean;
    toggleState?: ()=>void;
};

type HamState = {
}

class Hamburger extends React.Component<HamProps, HamState>{
    constructor(props: HamProps) {
        super(props);
        this.state = {
        }
    }

    render(){
        let status = this.props.status != null ? this.props.status : false;
        return (
            <WrapHam onClick={()=>{
                let func = this.props.toggleState != undefined ? this.props.toggleState : ()=>{};
                func();
            }}>
                <LineTop isOpen={status} />
                <Line isOpen={status} />
                <LineBottom isOpen={status} />
            </WrapHam>
        );
    }

    handleClick = () => {
        console.log('Click happened');
        return this.props.toggleState;
    }
}


export default Hamburger;