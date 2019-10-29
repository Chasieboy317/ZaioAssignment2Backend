import React, {Component} from 'react';
import '../css/ImageSlider.css';


export default class ImageSlider extends Component {
  constructor(props) {
    super(props);
    let images = [];
    for (let i=1; i<=3; i++) {
      images.push(<img onClick={(e) => {this.setActive(e, i)}} key={i} src={require(`../images/properties/${this.props.id}/${i}.jpg`)} />);
    }
    let index = (<img onClick={(e) => {this.setActive(e, 0)}} key={0}src={require(`../images/properties/${this.props.id}/index.jpg`)} />);
    images.unshift(index);
    this.state = {
      index: 0,
      images,
      activeImage: images[0]
    }
  }

  lastImage = (e) => {
    const index = this.state.index > 0 ? this.state.index - 1 : this.state.images.length - 1;
    this.setState({index, activeImage: this.state.images[index]});
  }

  nextImage = (e) => {
    const index = this.state.index == this.state.images.length-1 ? 0 : this.state.index + 1;
    this.setState({index, activeImage: this.state.images[index]});
  }

  setActive = (e, i) => {
    this.setState({activeImage: this.state.images[i], index: i});
  }

  render () {
    return (
      <React.Fragment>
        <div className = "imageSlider">
          <div className="imageSliderMain">
            <button id="last" onClick={this.lastImage}> &lt; </button>
            {this.state.activeImage}
            <button id="next" onClick={this.nextImage}> &gt; </button>
          </div>
          <div className="imageSliderList">
            {this.state.images}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
