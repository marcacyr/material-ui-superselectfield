import React, { Component } from 'react'
import SuperSelectField from './SuperSelectField'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import Chip from 'material-ui/Chip/Chip'
import countries from './assets/countries'
import flagIconCSSCountryCodes from './assets/flagIconCSSCountryCodes'
import FontIcon from 'material-ui/FontIcon/FontIcon'
import Avatar from 'material-ui/Avatar/Avatar'
import './assets/flag-icon.css'

const containerStyle = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1
}
const menuItemStyle = {
  whiteSpace: 'normal',
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: 'normal'
}
const chipAvatarStyle = {
  width: '100%',
  height: '100%',
  margin: 0,
  borderRadius: '50%',
  backgroundSize: 'cover'
}

const displayState = state => state.length
  ? [...state].map(({ value, label }) => label || value).join(', ')
  : 'empty state'

const dataSource = ['Raphaël', 'Jessica', 'Naomie', 'Oliver', 'Wynona', 'Ben', 'Vincent', 'Clémentine', 'Angélique', 'Julien', 'Steve', 'Yoan', 'Nathalie', 'Marie', 'Renée']

class CodeExample extends Component {
  state = {
    state31: [{
      label: 'France',
      value: {
        'English short name': 'France',
        'French short name': 'France (la)',
        'Alpha-2 code': 'FR',
        'Alpha-3 code': 'FRA',
        'Numeric': 250,
        'Capital': 'Paris',
        'Continent': 4
      }
    }],
    state32: []
  }

  handleSelection = (values, name) => this.setState({ [name]: values })

  handleCustomDisplaySelections = name => values => values.length
    ? <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {values.map(({ label, value: country }, index) =>
        <Chip key={index} style={{ margin: 5 }} onRequestDelete={this.onRequestDelete(index, name)}>
          <Avatar icon={(
            <FontIcon
              className={`flag-icon flag-icon-${country['Alpha-2 code'].toLowerCase()}`}
              style={chipAvatarStyle}
            />)}
          />
          {label}
        </Chip>
      )}
    </div>
    : <div style={{ minHeight: 42, lineHeight: '42px' }}>Select some values</div> // advice: use one of <option>s' default height as min-height

  onRequestDelete = (key, name) => event => {
    this.setState({ [name]: this.state[name].filter((v, i) => i !== key) })
  }

  render () {
    const { state31, state32 } = this.state
    console.debug('state31', state31, '\nstate32', state32)

    const countriesNodeList = countries.map((country, index) => {
      const countryCode = country['Alpha-2 code'].toLowerCase()
      const countryLabel = country['English short name']
      if (!flagIconCSSCountryCodes.includes(countryCode)) return null

      return (
        <div key={index} value={country} label={countryLabel} style={menuItemStyle}>
          <div style={{ marginRight: 10 }}>
            <span style={{ fontWeight: 'bold' }}>{countryLabel}</span><br />
            <span style={{ fontSize: 12 }}>{country.Capital}</span>
          </div>
          <FontIcon className={`flag-icon flag-icon-${countryCode}`} />
        </div>
      )
    })

    const dataSourceNodes = dataSource.map((data, index) => <div key={index} value={data}>{data}</div>)

    return <section style={containerStyle}>

      <fieldset style={{ marginBottom: 40 }}>
        <legend>Selected values</legend>
        <div>State 31: {displayState(state31)}</div>
        <div>State 32: {displayState(state32)}</div>
      </fieldset>

      <div style={{ display: 'flex' }}>
        <SuperSelectField
          name='state31'
          multiple
          hintText='Complex example'
          onChange={this.handleSelection}
          value={state31}
          elementHeight={58}
          selectionsRenderer={this.handleCustomDisplaySelections('state31')}
          style={{ width: 300, marginTop: 20, marginRight: 40 }}
        >
          {countriesNodeList}
        </SuperSelectField>

        <SuperSelectField
          name='state32'
          multiple
          hintText='Simple example'
          onChange={this.handleSelection}
          value={state32}
          hoverColor='rgba(3, 169, 244, 0.15)'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          style={{ width: 200, marginTop: 20 }}
          menuCloseButton={<FlatButton label='close' hoverColor={'lightSalmon'} />}
        >
          {dataSourceNodes}
        </SuperSelectField>
      </div>

    </section>
  }
}

export default CodeExample
