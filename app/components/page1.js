import React from 'react'
import { Panel, Button, Input, ButtonToolbar } from 'react-bootstrap'


var Footer = (
<ButtonToolbar>
				<Button type="reset" bsStyle="default" >Clear</Button>
				<Button type="button" bsStyle="info">Show </Button>
				<Button type="submit" bsStyle="primary" className="form-controls-right" >Next </Button>
			</ButtonToolbar>
);

class Page1 extends React.Component {
    render() {
        return (
            <form>
				<Panel header="User Profile" footer={Footer}>
					<Input type="text" label="Name" help="A word or set of words by which a person, animal, place, or thing is known, addressed, or referred"/>
            	</Panel>
			</form>
            );
    }
}


export default Page1;