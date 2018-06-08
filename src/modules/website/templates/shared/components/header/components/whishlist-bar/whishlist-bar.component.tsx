import * as React from "react";
import "./whishlist-bar.component.scss";
import { DataWishlistService } from "../../../../services/data-wishlist.service";
import { WhishlistProps, WhishlistState } from "./whishlist.model";

export class WhishListBarcomponent extends React.Component<WhishlistProps, WhishlistState> {
  constructor(props: any) {
    super(props);
   
  }

  public render() {

    return (
      <div className="whishlist-bar-component">
        <a href="/account/wishlist">
          <svg className={`${(this.props.numberOfProducts > 0) ? "active" : "inactive"} icon-header`} x="0px" y="0px" viewBox="0 0 14.719 13.235"> <path d="M10.527,0.525c-1.352,0-2.53,0.661-3.172,1.645 C6.714,1.187,5.536,0.525,4.185,0.525C2.149,0.525,0.5,2.021,0.5,3.865c0,3.374,6.855,8.736,6.855,8.736s6.856-5.224,6.856-8.736 C14.212,2.021,12.563,0.525,10.527,0.525z" /></svg>
        </a>
        {(this.props.numberOfProducts > 0) ? <span className="numberOfProducts">{this.props.numberOfProducts}</span> : ""}
      </div>
    );
  }
}
