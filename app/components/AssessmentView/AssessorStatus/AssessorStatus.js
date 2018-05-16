import { Component } from 'react'
import h from 'react-hyperscript'
import styled from 'styled-components'

// styles
const Feedback = styled.div`
font-size: 0.7em; 
font-style: italic;
color:${props => props.invalidScoreRange ? 'red' : 'lightgrey'};
`
const ActiveButton = styled.button`
color:${props => props.theme.primary};
border-color:${props => props.theme.primary};
background-color:${props => props.theme.light};
cursor: pointer;
`
const StaleButton = styled.span`
color:lightgrey;
cursor: auto;
`

// component to display an individual assessor slot address and options
export class AssessorStatus extends Component {
  constructor (props) {
    super(props)

    // get cache/localStorage data in case a score-salt has been commited
    let cacheCommitData = JSON.parse(window.localStorage.getItem(this.props.assessmentAddress + this.props.userAddress))

    // state contains local variables that would rerender the component
    // state is set to default score-salt only if the cache is empty for that assessment address
    if (cacheCommitData) {
      this.state = {
        score: Number(cacheCommitData.score),
        salt: cacheCommitData.salt,
        invalidScoreRange: false
      }
    } else {
      this.state = {
        score: 100,
        salt: 'hihi',
        invalidScoreRange: false
      }
    }
  }

  setScore (e) {
    let score = Number(e.target.value)
    if (score >= 0 && score <= 100) {
      this.setState({score: score, invalidScoreRange: false})
    } else {
      this.setState({invalidScoreRange: true})
    }
  }

  stake () {
    this.props.confirmAssessor(this.props.assessmentAddress)
  }

  commit () {
    // commit score+salt (salt is fixed for now)
    window.alert('Please write down your salt:' + this.state.salt)
    this.props.commit(this.props.assessmentAddress, this.state.score, this.state.salt)

    // save salt and score in local storage
    let cacheCommitData = JSON.stringify({score: this.state.score, salt: this.state.salt})
    window.localStorage.setItem(this.props.assessmentAddress + this.props.userAddress, cacheCommitData)
  }

  reveal () {
    console.log('reveal', this.props.assessmentAddress, this.state.score, this.state.salt)
    this.props.reveal(this.props.assessmentAddress, this.state.score, this.state.salt)
  }

  steal () {
    // TODO
  }

  // function returns good comonents according to stage and user status
  actionComponent (active, stage) {
  // choose the right button depending on the userAddress
  // let Button;
    let button = (active, text, funct) => {
      if (active) {
        if (funct) {
          return h(ActiveButton, {onClick: funct.bind(this)}, text)
        } else {
          return h(ActiveButton, text)
        }
      } else {
        return h(StaleButton, text)
      }
    }

    // choose the right form depending on the userAddress
    switch (stage) {
      case 1:
        return button(active, 'Stake!', this.stake)
      case 2:
        return h('div', {style: {display: 'inline-block'}}, [
        // input field
          h('div', {style: {display: 'inline-block'}}, [
            h(Feedback, {invalidScoreRange: this.state.invalidScoreRange}, 'must be 0 <= score <= 100'),
            h('input', {value: this.state.score, type: 'number', onChange: this.setScore.bind(this)})
          ]),
          // button
          button(active, 'Commit a score!', this.commit)
        ])
      case 3:
        return button(active, 'Reveal your score!', this.reveal)
      case 4:
        return button(active, 'Done! (Payout: ' + this.props.payout + ')')
      case 5:
        return button(active, 'Burned !')
      default:
        console.log('assessment has unexpected stage !')
        return button(active, 'wrong stage !')
    }
  }

  render () {
    // display assessor information
    let displayString = 'assessor ' + (this.props.assessorNumber + 1) + ': ' + this.props.assessorAddress + '... ->   '
    // determine if assessor is ahead of assessment
    let active = this.props.assessorStage === this.props.stage
    if (active) {
      let ActionComponent = this.actionComponent(this.props.assessorAddress === this.props.userAddress, this.props.assessorStage)
      return (
        h('div', [
          h('span', displayString),
          h('span', {}, ActionComponent)
        ])
      )
    } else {
      return (
        h('div', [
          h('span', displayString),
          h('span', 'Waiting for others')
        ])
      )
    }
  }
}

export default AssessorStatus
