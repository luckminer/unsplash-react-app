import React from "react";

import ListItem from './ListItem'

const List = ({ data }) => {
  var items = data.map(photo => <ListItem key={photo.id} photo={photo}/>);

  // show message "no items found" or similar
  
  return (
    <div className="grid">
      { items }
    </div>
  )
}

export default List
