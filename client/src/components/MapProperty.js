import {OverlayView} from "google-maps-react";
import React from "react";

export default class MapProperty extends OverlayView {
  constructor(args) {
    super();
    this.onClick = args.onClick;
    this.latlng = args.latlng;
    this.html = args.html;
    this.setMap(args.map);
  }

  createDiv() {
    //set the content of the component to be whatever was passed in as a div element
    this.div = (<div onClick={this.args.onClick}/>);
    this.div.style.position = "absolute";
    if (this.html) {
      this.div.innerHTML = this.html;
    }
  }

  appendDivToOverlay() {
    //overlay the html container on the component
    const panes = this.getPanes();
    panes.overlayImage.appendChild(this.div);
  }

  positionDiv() {
    //convert the co-ordinates to pixels on the screen.
    const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
    if (point) {
      this.div.style.left = `${point.x}px`;
      this.div.style.top = `${point.y}px`;
    }
  }

  draw() {
    if (!this.div) {
      this.createDiv();
      this.appendDivToOverlay();
    }
    this.positionDiv();
  }

  remove() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  }

  getPosition() {
    return this.latlng;
  }

  getDraggable() {
    return false;
  }
}
