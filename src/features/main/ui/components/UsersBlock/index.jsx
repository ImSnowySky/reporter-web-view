import React from 'react';
import Card from '../../../../shared/Card';
import getText from '../../../../shared/Text';
import CountBlock, { TYPES } from '../shared/CountBlock';
import UserOnCard from './UserOnCard';
import * as Users from './elements';

const text = getText('MAIN');

const UserBlock = ({ pending, list, count, error }) => {
  if (pending) return null;
  if (error) return <Card stretch title = {text('USERS_BLOCK_TITLE')} withError = {error} />

  if (!list || list.length === 0) return <Card stretch link = '/users' title = {text('USERS_BLOCK_TITLE')} empty = {text('USERS_EMPTY')} />

  return (
    <Card stretch title = {text('USERS_BLOCK_TITLE')} link = '/users'>
      <Users.NumbersBlock>
        <CountBlock
          type = {count.lastWeek === 0 ? TYPES.WARNING : TYPES.GOOD}
          number = {count.lastWeek}
          title = {text('USERS_COUNT_TOP')}
          subtitle = {text('CURRENT_COUNT_BOTTOM')}
        />
        <CountBlock
          type = {count.allTime === 0 ? TYPES.BAD : TYPES.GOOD}
          number = {count.allTime}
          title = {text('USERS_COUNT_TOP')}
          subtitle = {text('ALL_COUNT_BOTTOM')}
        />
        {
          count.allTime !== 0 && <CountBlock
            type = {count.allTime < 10 ? TYPES.BAD : count.allTime < 50 ? TYPES.WARNING : TYPES.GOOD}
            number = {`${Math.floor((count.allTimeWithError / count.allTime)) * 100}%`}
            title = {text('USERS_PERCENT_TOP')}
            subtitle = {text('USERS_PERCENT_BOTTOM')}
          />
        }
      </Users.NumbersBlock>
      <Users.ContentBlock>
        {
          list && list.length > 0
            ? list.filter((_, i) => i < 4).map((user, i) => <UserOnCard {...user} key = {i} />)
            : null
        }
      </Users.ContentBlock>
    </Card>
  );
}
export default UserBlock;