import React from 'react'
import { Panel, ButtonInput, Input } from 'react-bootstrap'


var Footer = (
<Input wrapperClassName="">
				<button type="button" className="btn btn-default">Clear</button>
				<button type="button" className="btn btn-info" >Show</button>
				<input type="submit" className="btn btn-primary form-controls-right" value="Next"/>
			</Input>
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