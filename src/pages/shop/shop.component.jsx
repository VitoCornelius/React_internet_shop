import React from 'react';

import PreviewCollection from "../../components/preview-collection/preview-collection.component";

import {selectShopItems} from '../../redux/shop/shop.selectors';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

const ShopPage = ({collections}) => (
    <div className='shop-page'>
        {
            collections.map( ({id, ...otherCollectionProps }) => (
                <PreviewCollection key={id} {...otherCollectionProps} />
            ))
        }
    </div>
)  


const mapStateToProps = createStructuredSelector(
    {
        collections : selectShopItems
    }
)

export default connect(mapStateToProps)(ShopPage);