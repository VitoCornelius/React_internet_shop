import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selectors';

//hold the state values from the menu items

import MenuItem from "../menu-item/menu-item.component";
import './directory.styles.scss'

const Directory = ({sections}) => (
    <div className='directory-menu'>
        {
            sections.map(({id, ...otherSectionProps}) => ( //mapping other section propertie
                <MenuItem key={id} {...otherSectionProps}/>
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections : selectDirectorySections
})

export default connect(mapStateToProps)(Directory);