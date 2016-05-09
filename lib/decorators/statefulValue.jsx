import React, { Component } from 'react'

export default (Target) => {
  class DecoratedComponent extends Component {
    render () {
      const {
        onChange,
        ...props
      } = this.props

      return (
        <Target
          {...props}
          {...this.state}
          onChange={this.handleChange.bind(this, onChange)}
        />
      )
    }

    handleChange (onChange, e) {
      this.setState({
        value: e.target.value
      })

      onChange && onChange(e)
    }
  }

  DecoratedComponent.displayName = Target.displayName || Target.name

  return DecoratedComponent
}
