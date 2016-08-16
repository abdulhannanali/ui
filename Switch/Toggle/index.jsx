import React, { PropTypes } from 'react'
import classNamesBind from 'classnames/bind'
import defaultStyles from './styles.scss'

const baseClass = 'switch'

const classes = {
  bullet: `${baseClass}__bullet`,
  bulletCheckmark: `${baseClass}__bullet__checkmark`
}

const press = (component) => () => component.setState({ pressed: true })
const release = (component) => () => component.setState({ pressed: false })

export const alignments = ['left', 'right']

export default React.createClass({
  displayName: 'Switch.Toggle',

  defaultProps: {
    error: false,
    disabled: false,
    align: 'left',
    legal: false,
    value: false
  },

  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string,
    customize: PropTypes.shape({
      backgroundColor: PropTypes.string.isRequired,
      bulletColor: PropTypes.string.isRequired
    }),
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    legal: PropTypes.bool,
    name: PropTypes.string,
    align: PropTypes.oneOf(alignments),
    onChange: PropTypes.func,
    styles: PropTypes.object,
    value: PropTypes.bool
  },

  getInitialState () {
    return { pressed: false }
  },

  render () {
    const {
      className,
      align,
      children,
      customize,
      disabled,
      error,
      legal,
      name,
      onChange,
      styles,
      value,
      ...remainingProps } = this.props

    const { pressed } = this.state

    const classNames = classNamesBind.bind({ ...defaultStyles, ...styles })
    const cls = classNames(baseClass, {
      'is-checked': value,
      'is-pressed': pressed,
      'is-disabled': disabled,
      'is-error': error,
      'right': align === 'right',
      'dynamic-styling': customize,
      legal
    }, className)
    const childCls = customize
      ? {
        bullet: classNames(classes.bullet),
        checkmark: classNames(classes.bulletCheckmark)
      }
      : undefined

    const onClick = !disabled && onChange && (() => onChange(!value))
    const onMouseDown = !disabled && press(this)
    const onMouseUp = !disabled && release(this)

    return customize
      ? (
        <div
          className={cls}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          {...remainingProps}>
          <div
            className={childCls.bullet}
            style={{
              backgroundColor: customize.backgroundColor,
              borderColor: customize.backgroundColor
            }}></div>
          <div
            className={childCls.checkmark}
            style={{
              backgroundColor: customize.bulletColor
            }}></div>
          {children}
        </div>
      )
      : (
        <div
          className={cls}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          {...remainingProps}>
          {children}
          {name &&
            <input name={name} type='hidden' value={value} />}
        </div>
      )
  }
})