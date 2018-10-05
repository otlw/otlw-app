import { Component } from 'react'
import styled from 'styled-components'
import {Props} from './index'
let icoClose = require('../../../assets/ico-close.svg')

var h = require('react-hyperscript')

export class HelperBar extends Component<Props> {
  closeBar () {
    this.props.setHelperBar(null)
  }

  // resetVisits () {
  //   this.props.resetVisits()
  // }

  learnMore () {
    this.closeBar()
    if (this.props.topic.learnMore) this.props.setModal(this.props.topic.learnMore.target)
  }

  render () {
    if (this.props.showBar) {
      let topic = this.props.topic
      return (
        h(barContainer, [
          h(barContainerTitle, [
            h(icoQuestion, '?'),
            h(barTextTitle, topic.title)
          ]),
          h(barObject, [
            h(barTextDescription, topic.text),
            (topic.learnMore
             ? h(barButtonPrimary, {onClick: this.learnMore.bind(this)}, 'Learn More')
             : null)
          ]),
          h(barButtonClose, {onClick: this.closeBar.bind(this)}, h('img', {alt: 'icoClose', src: icoClose, className: 'h1 ma1'}))
          //
          // h('button', {onClick: this.resetVisits.bind(this)}, 'resetToNoob!') // this is for us, so we can pretend being a first timer
        ])
      )
    } else {
      return h('div', '')
    }
  }
}

export default HelperBar

// style

export const barContainer = styled('div').attrs({className: 'relative flex flex-row items-center justify-between w-100 pv3 mt3 br2 shadow-4'})`
max-width: 800px;
background-color: ${props => props.theme.tertiary};
`

export const barObject = styled('div').attrs({className: 'flex items-center justify-center mh2'})`
`

export const barContainerTitle = styled('div').attrs({className: 'flex items-center justify-center mh2 ba br1 b--green'})`
flex-shrink: 0;
color: ${props => props.theme.primary};
border-color: ${props => props.theme.primary};
`

export const icoQuestion = styled('div').attrs({className: 'flex items-center justify-center w2 h2 mr2 bg-green light-green br'})`
background-color: ${props => props.theme.primary};
`

export const barTextTitle = styled('h4').attrs({className: 'f5 fw4 dark-green mv0 ph2'})`
color: ${props => props.theme.primary};
`

export const barTextDescription = styled('h5').attrs({className: 'f6 fw4 dark-green mv0'})`
color: ${props => props.theme.primary};
flex-shrink: 2;
`

export const barButtonClose = styled('button').attrs({className: 'flex items-center justify-center w2 h2 mh2 ba br-100 b--near-black bg-transparent'})`
outline: 0px;
flex-shrink: 0;
transition: 0.2s ease-in-out;
:hover {background-color:hsla(158, 70%, 65%, 1); cursor:pointer;}
`

export const barButtonPrimary = styled('button').attrs({className: 'flex f5 bg-transparent ph1 pv1 ml1 ttu uppercase ba br1 b--dark-green cursor'})`
color: ${props => props.theme.primary};
border-color: ${props => props.theme.primary};
outline: 0px;
transition: 0.2s ease-in-out;
:hover {cursor:pointer; background-color: hsla(158, 70%, 65%, 1);}
`
