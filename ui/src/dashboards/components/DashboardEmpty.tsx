import React, {Component} from 'react'
import {Cell} from 'src/types/dashboards'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {addDashboardCellAsync} from 'src/dashboards/actions'
import {ErrorHandling} from 'src/shared/decorators/errors'
import {GRAPH_TYPES} from 'src/dashboards/graphics/graph'

import Authorized, {EDITOR_ROLE} from 'src/auth/Authorized'

interface Dashboard {
  id: string
  cells: Cell[]
}

interface PropsFromDispatch {
  addDashboardCell: (dashboard: Dashboard, cell?: Cell) => void
}

interface ClassProps {
  dashboard: Dashboard
}

type Props = ClassProps & PropsFromDispatch

@ErrorHandling
class DashboardEmpty extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  public render() {
    return (
      <div className="dashboard-empty">
        <p>
          This Dashboard doesn't have any <strong>Cells</strong>,<br />why not
          add one?
        </p>
        <Authorized requiredRole={EDITOR_ROLE}>
          <div className="dashboard-empty--menu">
            {GRAPH_TYPES.map(graphType => (
              <div
                key={graphType.type}
                className="dashboard-empty--menu-option"
              >
                <div onClick={this.handleAddCell(graphType.type)}>
                  {graphType.graphic}
                  <p>{graphType.menuOption}</p>
                </div>
              </div>
            ))}
          </div>
        </Authorized>
      </div>
    )
  }

  private handleAddCell = type => () => {
    const {dashboard, addDashboardCell} = this.props
    addDashboardCell(dashboard, type)
  }
}

const mdtp = dispatch => ({
  addDashboardCell: bindActionCreators(addDashboardCellAsync, dispatch),
})

export default connect<{}, PropsFromDispatch, ClassProps>(null, mdtp)(
  DashboardEmpty
)
