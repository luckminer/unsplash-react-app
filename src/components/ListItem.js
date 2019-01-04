import React from "react";

const ListItem = ({ photo }) => {
  return (
    <div key={photo.id} className="grid_item card">
      <div className="card_body">
        <img src={photo.urls.small} alt="" />
      </div>
      <div className="card_footer media">
        <img src={photo.user.profile_image.small} alt="" className="media_obj" />
        <div className="media_body">
          <a href={photo.user.portfolio_url} target="_blank">{ photo.user.name }</a>
        </div>
      </div>
    </div>
  )
};

export default ListItem;
