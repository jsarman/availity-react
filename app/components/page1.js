import React from 'react';
import { Panel, Button, Input, ButtonToolbar, Tooltip, OverlayTrigger } from 'react-bootstrap';

function getTooltip(id, tip) {
    return (
        <Tooltip id={id}>
			{tip}
		</Tooltip>
        )
}

function getLabel(inputId, label, tip, alignment) {
    if (!alignment) {
        alignment = "right";
    }
    const tooltip = getTooltip(inputId + "Tooltip", tip);

    return (
        <OverlayTrigger placement={alignment} overlay={tooltip}>
        	<label htmlFor={inputId}>{label}</label>
    	</OverlayTrigger>
        );
}

class Page1 extends React.Component {
    render() {
        const Footer = (
        <ButtonToolbar>
			<Button type="reset" bsStyle="default" >Clear</Button>
			<Button type="button" bsStyle="info">Show </Button>
			<Button type="submit" bsStyle="primary" className="form-controls-right" >Next </Button>
		</ButtonToolbar>
        );
        return (
            <form>
				<Panel header="User Profile" footer={Footer}>
					<Input id="name" type="text" label={getLabel("name", "Name", "A word or set of words by which a person, animal, place, or thing is known, addressed, or referred")} />
            	
            	</Panel>
			</form>
            );
    }
}


export default Page1;;