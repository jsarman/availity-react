import React from 'react'
import { Panel, Button, Input, ButtonToolbar, Tooltip, OverlayTrigger } from 'react-bootstrap'
import AVLabel from './AVLabel'


let count = 0;

class AVTextInput extends React.Component {

	constructor(props) {
        super(props);
        this.guid = 'input-ui-' + count++;
    }
    
    render() {
        let {id, inputRef, label, tooltipText, tooltipAlignment, showTooltip, ...others} = this.props;
		id = id ? id : this.guid;
        const labelNode = <AVLabel {...this.props} htmlFor={id} />
        
        return (
            <Input id={id} type="text" ref={inputRef} label={labelNode}  {...others} />
            );
    }

}

export default AVTextInput;