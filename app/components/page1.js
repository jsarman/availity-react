import React from 'react';
import { connect } from 'react-redux'
import { Input, Panel, Button, ButtonToolbar } from 'react-bootstrap'
import AVTextInput from '../uikit/AVTextInput'
import AVDateInput from '../uikit/AVDateInput'
import AVSelect from '../uikit/AVSelect'
import { updateField, enableTooltips } from '../actions'


class Page1 extends React.Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.userProfile);
    }

    render() {
        const {dispatch, userProfile, uiSettings} = this.props;
        const Buttons = (
        <ButtonToolbar>
            <Button type="reset" bsStyle="default" >Clear</Button>
            <Button type="button" onClick={e => dispatch(enableTooltips(!uiSettings.enableTooltips))}
        bsStyle="info">{uiSettings.enableTooltips ? 'Hide' : 'Show'}
            </Button>
            <Button type="submit" bsStyle="primary" className="form-controls-right" >Next</Button>
        </ButtonToolbar>
        );
        const datePickerOptions = {
            autoclose: true,
            endDate: new Date(),
            todayHighlight: true
        };

        const options = [
            {
                text: 'Florida',
                id: 'FL'
            },
            {
                text: 'Georgia',
                id: 'GA'
            },
            {
                text: 'West Virginia',
                id: 'WV'
            },
            {
                text: 'Hawaii',
                id: 'HI'
            },
            {
                text: 'Texas',
                id: 'TX'
            }
        ];

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
            <Panel header={<h1>User Profile</h1>} footer={Buttons}>
                    
            <AVTextInput value={userProfile.name} onChange={e => dispatch(updateField('name', e.target.value))}
            label="Name"
            tooltipText="A word or set of words by which a person, animal, place, or thing is known, addressed, or referred"
            placeholder="Enter 1 letter to see validation in action"
            showTooltip={uiSettings.enableTooltips} />
            
         
            <AVDateInput bsStyle="error" help="YOU GONE" value={userProfile.dob} onChange={e => dispatch(updateField('dob', e.target.value))}
            label="Date of Birth"
            tooltipText="Enter Date of Birth"
            placeholder="When were you born?"
            showCalendar={true}
            datePickerOptions={datePickerOptions}
            showTooltip={uiSettings.enableTooltips} />
            
            <AVSelect bsStyle = "error" help="YOU GONE"  data={options} value={userProfile.stateCode} onChange={e => dispatch(updateField('stateCode', e.val))}
            label="Favorite State"
            tooltipText="Pick your Favorite State"
            placeholder="Select State"
            showTooltip={uiSettings.enableTooltips}

            />
            
            </Panel>
            </form>

            );
    }
}

Page1.propTypes = {
    userProfile: React.PropTypes.object,
    uiSettings: React.PropTypes.object
}

export default connect(state => state)(Page1)