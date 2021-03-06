import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as duck from './duck';
import ErrorsView from './ui';
import withPagination from '../shared/HOCs/withPagination';

const mapStateToProps = state => ({
  pending: duck.selectors.isPending(state),
  list: duck.selectors.getErrors(state),
  count: duck.selectors.getErrorsCount(state),
  error: duck.selectors.getRequestError(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(duck.actions, dispatch);

class ErrorsController extends React.Component {
  getPageContent = () => {
    const { page, countOnPage, getErrors, getErrorsCount } = this.props;
    Promise.all([
      getErrors({ limit: `${(page - 1) * countOnPage}, ${page * countOnPage}`}),
      getErrorsCount(),
    ]);
  };

  componentDidMount() {
    this.getPageContent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.getPageContent();
    }
  }
  render() {
    const { getErrors, getErrorsCount, pending, ...rest } = this.props;
    if (pending) return null;
    return <ErrorsView {...rest} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withPagination(ErrorsController));