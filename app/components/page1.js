import React from 'react';
import { Panel, Button, ButtonToolbar } from 'react-bootstrap';
import AVTextInput from '../uikit/av-text-input';
import AVDateInput from '../uikit/av-date-input';
import store from '../stores/ProfileStore'


class Page1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTooltip: true
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(store.getState());
    }
    render() {
        const showTooltip = this.state.showTooltip;
        const Footer = (
        <ButtonToolbar>
            <Button type="reset" bsStyle="default" >Clear</Button>
            <Button type="button" onClick={(e) => {
            this.setState({
                showTooltip: !showTooltip
            })
        }} bsStyle="info">{showTooltip ? 'Hide' : 'Show'}</Button>
            <Button type="submit" bsStyle="primary" className="form-controls-right" >Next</Button>
        </ButtonToolbar>
        );
        const datePickerOptions = {
            autoclose: true,
            endDate: new Date(),
            todayHighlight: true
        };

        // var {profile} = this.state;
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
            <Panel header="User Profile" footer={Footer}>
                    
            <AVTextInput store={store} modelKey="name"
            label="Name"
            tooltipText="A word or set of words by which a person, animal, place, or thing is known, addressed, or referred"
            placeholder="Enter 1 letter to see validation in action"
            showTooltip={this.state.showTooltip} />
            
         
          <AVDateInput store={store} modelKey="dob"
            label="Date of Birth"
            tooltipText="Enter Date of Birth"
            placeholder="When were you born?"
            showCalendar={true}
            datePickerOptions={datePickerOptions}
            showTooltip={this.state.showTooltip} />


            </Panel>
            </form>
            );
    }
}


export default Page1;