import React from 'react';
import { bindActionCreators } from 'redux';
import { bindSelectCreators } from 'reselect-computed';
import { connect } from 'react-redux';
import { Paper, Typography, TextField, Select, Input, Radio, Checkbox, Switch } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormGroup, FormControlLabel, FormLabel, FormHelperText } from 'material-ui/Form';
import { RadioGroup } from 'material-ui/Radio';

import * as actions from './actions';
import * as selectors from './selectors';

const TemplateDriven = ({ templateDriven, actions, selectors }) => {
  const {
    nickname,
    name, nameTouched,
    age, listOfage,
    countries, listOfCountries,
    category, variety, animals,
    frameworks,
    gender,
    autoplay,
  } = templateDriven;

  const { nameError, listOfVariety } = selectors;

  return (
    <div className="container">
      <Paper>
        <Typography type="title" gutterBottom style={{ padding: '1rem 1rem 0' }}>
          Just Redux
        </Typography>

        <form className="form">
          <div className="row">
            {/* input */}
            <FormControl>
              <TextField
                label="Nickname"
                value={nickname}
                onChange={event => actions.setData({ nickname: event.target.value })}
              />
            </FormControl>
            <div className="outputs">{nickname}</div>
          </div>

          <div className="row">
            {/* input validation */}
            <FormControl>
              <TextField
                required
                label="Name"
                value={name}
                error={nameTouched && nameError}
                onChange={event => actions.setData({ name: event.target.value })}
                onBlur={() => actions.setData({ nameTouched: true })}
              />
              {
                nameTouched && nameError &&
                <FormHelperText error={nameTouched && nameError}>
                  {name === '' && 'Required'}
                  {name.length > 15 && 'Must be 15 characters or less'}
                </FormHelperText>
              }
            </FormControl>
            <div className="outputs">{name}</div>
          </div>

          <div className="row">
            {/* select */}
            <FormControl>
              <InputLabel htmlFor="age">Age</InputLabel>
              <Select
                value={age}
                onChange={event => actions.setData({ age: event.target.value })}
                input={<Input id="age" style={{ width: '7rem' }} />}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {
                  listOfage.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <div className="outputs">{age}</div>
          </div>

          <div className="row">
            {/* multiple select */}
            <FormControl>
              <InputLabel htmlFor="countries">Countries</InputLabel>
              <Select
                multiple
                value={countries}
                onChange={event => actions.setData({ countries: event.target.value })}
                input={<Input id="countries" style={{ width: '15rem' }} />}
              >
                {
                  listOfCountries.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <div className="outputs">{countries.join(', ')}</div>
          </div>

          <div className="row">
            {/* nested select */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Animals</FormLabel>
              <FormGroup row>
                <FormControl>
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Select
                    value={category}
                    onChange={event => actions.setData({ category: event.target.value, variety: '' })}
                    input={<Input id="category" style={{ width: '7rem' }} />}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {
                      animals.map(item => (
                        <MenuItem
                          key={item.category}
                          value={item.category}
                        >
                          {item.category}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

                <FormControl style={{ marginLeft: '1rem' }} disabled={!category}>
                  <InputLabel htmlFor="variety">Variety</InputLabel>
                  <Select
                    value={variety}
                    onChange={event => actions.setData({ variety: event.target.value })}
                    input={<Input id="variety" style={{ width: '7rem' }} />}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {
                      listOfVariety.length &&
                      listOfVariety[0].variety.map(item => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </FormGroup>
            </FormControl>
            <div className="outputs">{category} {variety ? `- ${variety}` : ''}</div>
          </div>

          <div className="row">
            {/* checkboxes */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Frameworks</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={frameworks.angular}
                      onChange={(event, checked) =>
                        actions.setData({ frameworks: { ...frameworks, angular: checked } })
                      }
                      value="angular"
                    />
                  }
                  label="Angular"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={frameworks.react}
                      onChange={(event, checked) =>
                        actions.setData({ frameworks: { ...frameworks, react: checked } })
                      }
                      value="react"
                    />
                  }
                  label="React"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={frameworks.vue}
                      onChange={(event, checked) =>
                        actions.setData({ frameworks: { ...frameworks, vue: checked } })
                      }
                      value="vue"
                    />
                  }
                  label="Vue"
                />
              </FormGroup>
            </FormControl>
            <div className="outputs" style={{ padding: '0 0 .5rem' }}>
              {frameworks.angular ? 'Angular' : ''} {' '}
              {frameworks.react ? 'React' : ''} {' '}
              {frameworks.vue ? 'Vue' : ''}
            </div>
          </div>

          <div className="row">
            {/* radio buttons */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                style={{ display: 'flex', flexDirection: 'row' }}
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(event, value) => actions.setData({ gender: value })}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <div className="outputs" style={{ padding: '0 0 .5rem' }}>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </div>
          </div>

          <div className="row">
            {/* switch */}
            <FormControl component="fieldset">
              <FormGroup row>
                <FormLabel component="legend" style={{ alignSelf: 'center' }}>Autoplay</FormLabel>
                <Switch
                  checked={autoplay}
                  onChange={(event, checked) => actions.setData({ autoplay: checked })}
                  aria-label="Autoplay"
                />
              </FormGroup>
            </FormControl>
            <div className="outputs" style={{ padding: '0 0 .5rem' }}>
              {autoplay ? `${autoplay}`.charAt(0).toUpperCase() + `${autoplay}`.slice(1) : ''}
            </div>
          </div>

          <div className="row">
            ...
          </div>
        </form>
      </Paper>

      <style jsx>{`
        .container {
          margin: 1rem 0;
        }

        .form {
          padding: .5rem 1rem;
        }

        .row {
          padding: .66rem;
          display: flex;
          flex-direction: row;
        }

        .outputs {
          align-self: flex-end;
          margin: 0 0 .5rem .5rem;
          color: #3F51B5;
        }
      `}</style>
    </div>
  );
};

export default connect(
  ({ formControls: { templateDriven } }) => ({
    templateDriven,
    selectors: bindSelectCreators(selectors, templateDriven),
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(TemplateDriven);
