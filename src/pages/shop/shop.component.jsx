import React from 'react';

import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import {selectIsCollectionFetching, selectIsCollectionLoading} from '../../redux/shop/shop.selectors';

import WithSpinner from './../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage); 

class ShopPage extends React.Component {

  // constructor(){
  //   //do not move any redux methods here !  antipattern!!! 
  // }

  // UNSAFE_componentWillMount() {
  //   //before react 16 -> this fires before the render method, but is very unsafe !!!!!! unsupported !!
  // }

  componentDidMount() { //fires after the first render() call !!!
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const {match, isCollectionFetching, isCollectionLoading} = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props}/> } />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionLoading} {...props}/>}/>
      </div>
    )
  }
  
  // render() { //before modifying the withSpinnner ! 
  //   const {match} = this.props;
  //   return (
  //     <div className='shop-page'>
  //       <Route exact path={`${match.path}`} component={CollectionsOverview}/>
  //       <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
  //     </div>
  //   ) 
  // }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

const mapStateToProps = createStructuredSelector({
  isCollectionFetching : selectIsCollectionFetching,
  isCollectionLoading : selectIsCollectionLoading
});

// class ShopPage extends React.Component ({match}) => ( //Route automatically passes those 3 objects of routing 
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview}/>
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
//   </div>
// )  

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);