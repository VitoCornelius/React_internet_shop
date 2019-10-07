import React from 'react';

import {Route} from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firabase.config';
import {connect} from 'react-redux';
import {updateCollections} from './../../redux/shop/shop.actions';

import WithSpinner from './../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage); 

class ShopPage extends React.Component {

  state = { //this will create a constructor with a call to super() 
    loading : true
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() { //download the colleciton data from firebase DB 
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collection');


    // fetch('https://firestore.googleapis.com/v1/projects/crown-db-6492e/databases/(default)/documents/')
    // .then(response => response.json())
    // .then(collections => console.log(collections))
    //the same with fetch ! we use the firebase REST API 

    // collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap);
    //   this.setState({loading : false});
    // })
    //this is by using the observer pattern 

    //the same can be achieved with collectionRef.get().then(XXX) but this is not an observable pattern, so the data will only be loaded once ! 
    collectionRef.get().then(
      snapshot => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot)
        updateCollections(collectionsMap);
        this.setState({loading : false});
      }
    )
  }

  render() {
    const {match} = this.props;
    const {loading} = this.state;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/> } />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
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
  updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap))
})

// class ShopPage extends React.Component ({match}) => ( //Route automatically passes those 3 objects of routing 
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview}/>
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
//   </div>
// )  

export default connect(null, mapDispatchToProps)(ShopPage);