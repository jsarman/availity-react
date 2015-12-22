import React from 'react';
import { connect } from 'react-redux';
import { Input, Panel, Button, ButtonToolbar } from 'react-bootstrap';
import AVTextInput from '../uikit/AVTextInput';
import AVDateInput from '../uikit/AVDateInput';
import AVSelect from '../uikit/AVSelect';
import AVCheckbox from '../uikit/AVCheckbox';
import { saveUserProfile, updateUserProfile, resetUserProfile, enableTooltips } from '../actions';


class Page1 extends React.Component {

  constructor(props) {
    super( props );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch( saveUserProfile( {
      formName: 'userProfile'
    } ) );
    console.log( this.props.userProfile );
  }

  handleFieldUpdate(formName, field, value) {
    this.props.dispatch( updateUserProfile( {
      formName,
      field,
      value
    } ) );
  }

  render() {
    const {dispatch, userProfile, uiSettings} = this.props;
    const Buttons = (
    <ButtonToolbar>
            <Button type="reset" bsStyle="default" onClick={() => dispatch( resetUserProfile( {} ) )} >Clear</Button>
            <Button type="button" onClick={e => dispatch( enableTooltips( !uiSettings.enableTooltips ) )}
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
    let disabled = userProfile.email.value && userProfile.email.value.trim() !== '' ? '' : 'disabled';
    return (
      <form onSubmit={this.handleSubmit.bind( this )}>
            <Panel header={<h1>User Profile</h1>} footer={Buttons}>
                    
            <AVTextInput avValue={userProfile.name} onChange={e => this.handleFieldUpdate( 'userProfile', 'name', e.target.value )}
      label="Name"
      tooltipText="A word or set of words by which a person, animal, place, or thing is known, addressed, or referred"
      placeholder="Enter 1 letter to see validation in action"
      showTooltip={uiSettings.enableTooltips}/>

           
            <AVTextInput avValue={userProfile.email} onChange={e => this.handleFieldUpdate( 'userProfile', 'email', e.target.value )}
      label="Email"
      tooltipText="Email someone@nowhere.com"
      placeholder="Enter email address"
      showTooltip={uiSettings.enableTooltips} />

        <AVCheckbox avValue={userProfile.subscribe} onChange={e => this.handleFieldUpdate( 'userProfile', 'subscribe', !e.target.checked )}
      label="Subscribe to Newsletter"
      tooltipText="Check here to subscribe to newsletter"
      disabled={disabled}
      showTooltip={uiSettings.enableTooltips} />

      
           
            <AVDateInput avValue={userProfile.dob} onChange={e => this.handleFieldUpdate( 'userProfile', 'dob', e.target.value )}
      label="Date of Birth"
      tooltipText="Enter Date of Birth"
      placeholder="When were you born?"
      showCalendar={true}
      datePickerOptions={datePickerOptions}
      showTooltip={uiSettings.enableTooltips} />
            
       <AVSelect data={options} avValue={userProfile.stateCode} onChange={e => this.handleFieldUpdate( 'userProfile', 'stateCode', e.val )}
      label="Favorite State"
      tooltipText="Pick your Favorite State"
      placeholder="Select State"
      showTooltip={uiSettings.enableTooltips}
      options={{
        allowClear: true
      }}

      />
            
      </Panel>
      </form>

      );
  }


}

Page1.propTypes = {
  userProfile: React.PropTypes.object,
  uiSettings: React.PropTypes.object
};

export default connect( state => state )( Page1 )