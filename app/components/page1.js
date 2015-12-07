import React from 'react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import AVTextInput from '../uikit/AVTextInput';



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
					
            <AVTextInput
            label="Name"
            tooltipText="A word or set of words by which a person, animal, place, or thing is known, addressed, or referred"
            placeholder="Enter 1 letter to see validation in action" />
            
            <AVTextInput
            label="Date of Birth"
            tooltipText="Enter Date of Birth"
            placeholder="When were you born?" />

          


            </Panel>
			</form>
            );
    }
}


export default Page1;