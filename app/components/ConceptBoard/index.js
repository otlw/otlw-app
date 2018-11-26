import { connect } from 'react-redux'
import { LoadingStage } from '../../constants.js'
import ConceptBoard from './ConceptBoard.js'

const mapStateToProps = state => {
  return {
    concepts: state.concepts,
    loadedConcepts: (state.loading.concepts === LoadingStage.Done),
    loading: state.loading
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ConceptBoard)
