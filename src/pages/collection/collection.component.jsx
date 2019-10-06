import React from 'react';
import './collection.styles.scss';
import {connect} from 'react-redux';
import ColectionItem from "./../../components/collection-item/collection-item.component";

import {selectCollection} from '../../redux/shop/shop.selectors';


const CollectionPage = ({collection, match}) => { //we have access to match 
    //we have access to match.params.collectionId
    console.log(collection);
    console.log(match);

    const {title, items} = collection;

    return (
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item => (<ColectionItem key={item.id} item={item}/>)) 
            }
        </div>
    </div>
    )
};

const mapStateToProps = (state, ownProps) => ({ //our own props inside the compoenet 
    collection : selectCollection(ownProps.match.params.collectionId)(state) //we need to pass an argument to the selector 
})

export default connect(mapStateToProps)(CollectionPage);
