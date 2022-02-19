// 使用js来动态判断是否为组件添加class（类名），这里我们使用到了classnames传递多个className
import classnames from 'classnames'
//添加校验规则
import PropTypes from 'prop-types'

const Icon = ({ type, className, ...rest }) => {
  return (
    <svg
      className={classnames('icon', className)}
      {...rest}//注册事件
      aria-hidden="true"
    >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

Icon.propTypes = {
  //校验规则，type是必传属性
  type: PropTypes.string.isRequired,
}

export default Icon
