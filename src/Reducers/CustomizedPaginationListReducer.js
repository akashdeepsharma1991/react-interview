import { PaginationStateManager } from '@twotalltotems/paginatable-list'
import Config from 'react-native-config'

export default class CustomizedPaginationStateManager extends PaginationStateManager {
	constructor(name, url) {
		super(name, url)
	}

	highlightItem = ({ index, extra }) => {
		// Overwrite Default highlightItem() function. For example, you might need to do network call before dispatch an action.
		return dispatch => {
			dispatch(this.actions.highlightItem(index, extra))
		}
	} /* If you do not overwrite the default generated highlightItem(), 
    the default highlightItem() method will just dispatch the action directly 
    with the same params that you used while calling highlightItem() for a PaginationStateManager instance. */
}

export const customizedPaginationStateManager = new CustomizedPaginationStateManager(
	'users',
	`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0`
)

customizedPaginationStateManager.addActions([
	{
		type: 'highlightItem',
		payload: ['index', 'extra'],
		handler: (state, { index, extra }) => {
			return {
				...state,
				highlightedItemIndex: index,
				extra: extra
			}
		}
	}
])

export const reducer = customizedPaginationStateManager.reducer()
