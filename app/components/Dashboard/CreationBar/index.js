import { connect } from 'react-redux'
import { compose } from 'redux'
import { LoadComponent } from '../../hocs/loadComponent.js'
import { LoadingStage } from '../../../constants.js'
import CreationBar from './CreationBar.js'
import {
  loadConceptContractAndCreateAssessment,
  loadConceptsFromConceptRegistery } from '../../../actions/conceptActions.js'

const mapStateToProps = state => {
  return {
    concepts: state.concepts,
    loadedConcepts: (state.loading.concepts === LoadingStage.Done),
    loading: state.loading
  }
}

const mapDispatchToProps = {
  load: loadConceptsFromConceptRegistery,
  loadConceptContractAndCreateAssessment
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  LoadComponent
)(CreationBar)
