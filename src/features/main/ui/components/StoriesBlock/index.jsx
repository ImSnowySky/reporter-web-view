import React from 'react';
import Card from '../../../../shared/Card';
import getText from '../../../../shared/Text';
import Story from './Story';
import { StoriesContainer } from './elements';

const text = getText('MAIN');

const StoriesBlock = ({ pending, list, error }) => {
  if (pending || !list) return null;
  if (error) return <Card stretch title = {text('STORIES_BLOCK_TITLE')} withError = {error} />

  return (
    <Card stretch title = {text('STORIES_BLOCK_TITLE')}>
      <StoriesContainer>
        { Object.keys(list).map((userID, i) => <Story steps = {list[userID]} userID = {userID} key = {i}/>) }
      </StoriesContainer>
    </Card>
  );
}
export default StoriesBlock;