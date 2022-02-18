import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { clearSuggestion, getSuggestion } from '@/store/actions'
import classnames from 'classnames'
import debounce from 'lodash/debounce'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

const Search = ({ history }) => {
  const dispatch = useDispatch()
  const suggestList = useSelector(state => state.search.suggest)
  const [searchValue, setSearchValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const showSuggest = useMemo(
    () => debounce(value => dispatch(getSuggestion(value)), 500),
    [dispatch]
  )

  const onSearchChange = e => {
    const value = e.target.value
    setSearchValue(value)

    if (value.trim()) {
      setIsSearching(true)
      showSuggest(value)
    } else {
      setIsSearching(false)
    }
  }

  const onClear = () => {
    setSearchValue('')
    setIsSearching(false)
    dispatch(clearSuggestion())
  }

  const onGoToDetail = (value = searchValue) =>
    history.push(`/search/result?q=${value}`)

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onLeftClick={() => history.go(-1)}
        rightContent={
          <span className="search-text" onClick={() => onGoToDetail()}>
            搜索
          </span>
        }
      >
        <div className="navbar-search">
          <Icon type="iconbtn_search" className="icon-search" />
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="请输入关键字搜索"
              value={searchValue}
              onChange={onSearchChange}
            />
            {searchValue && (
              <Icon
                type="iconbtn_tag_close"
                className="icon-close"
                onClick={onClear}
              />
            )}
          </div>
        </div>
      </NavBar>
      {/* <div className="navbar">
        <div className="navbar-left">
          <Icon type="iconfanhui" />
        </div>
        
        </div>
        <div className="navbar-right">
          <span>搜索</span>
        </div>
      </div> */}

      <div
        className="history"
        style={{ display: isSearching ? 'none' : 'block' }}
      >
        <div className="history-header">
          <span>搜索历史</span>
          <span>
            <Icon type="iconbtn_del" />
            清除全部
          </span>
        </div>

        <div className="history-list">
          <span className="history-item">
            Python生成九宫格图片<span className="divider"></span>
          </span>
          <span className="history-item">
            Python<span className="divider"></span>
          </span>
          <span className="history-item">
            CSS<span className="divider"></span>
          </span>
          <span className="history-item">
            数据分析<span className="divider"></span>
          </span>
        </div>
      </div>

      <div
        className={classnames('search-result', isSearching ? 'show' : false)}
      >
        {suggestList.map((item, index) => (
          <div
            key={index}
            className="result-item"
            onClick={() => onGoToDetail(`${item.suggest}${item.rest}`)}
          >
            <Icon className="icon-search" type="iconbtn_search" />
            <div className="result-value">
              <span>{item.suggest}</span>
              {` ${item.rest}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
