import React from "react";

class Monitor extends React.Component{
    constructor(props,context){
        super(props,context)
    }
    render(){
        return (
                <div id="app-all">
                    {this.props.children}
                </div>
            )
    }
}

export default Monitor