import React from 'react'
import { Panel, Button, Input, ButtonToolbar, Tooltip, OverlayTrigger } from 'react-bootstrap'


export default class AVLabel extends React.Component {

    static defaultProps = {
         tooltipAlignment: 'right',
         showTooltip: true
    };

    static propTypes = {
        label: React.PropTypes.string.isRequired,
        htmlFor: React.PropTypes.string,
        tooltipText: React.PropTypes.string,
        tooltipAlignment: React.PropTypes.oneOf(['top','bottom','left','right']),
        showTooltip: React.PropTypes.bool
    }


    render() {
        const {htmlFor, label, tooltipText, tooltipAlignment, showTooltip} = this.props;

        if (showTooltip && tooltipText) {
            const tooltip = (
            <Tooltip id={htmlFor}>
                {tooltipText}
            </Tooltip>
            );
            return (
                <OverlayTrigger placement={tooltipAlignment} overlay={tooltip} >
                    <label className="control-label" htmlFor={htmlFor}>{label}</label>
                </OverlayTrigger>
                );
        }

        return (<label className="control-label" htmlFor={htmlFor}>{label}</label>);
    }   

    
}

