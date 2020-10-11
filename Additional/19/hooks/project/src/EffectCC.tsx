import React from  'react';
import Button from '@material-ui/core/Button';

interface IEffectCCState {
  count1:number;
  count2:number;
}

class EffectCC extends React.Component<{},IEffectCCState> {
  constructor(props:{}) {
    super(props);
    this.state = {
      count1: 0,
      count2: 0,
    };
  }

  componentDidMount() {
    document.title =`Mount（C1:${this.state.count1}) (C2:${this.state.count2}）`
  }

  componentDidUpdate() {
    document.title =`Update（C1:${this.state.count1}) (C2:${this.state.count2}）`
  }

  handleClick1() {
    this.setState({ count1: this.state.count1 + 1 })
  }
  handleClick2() {
    this.setState({ count2: this.state.count2 + 1 })
  }

  render() {
    return (
      <div>
        <h1>クラスコンポーネント</h1>
        <p>[1] {this.state.count1} 回クリックしました。</p>
        <p>[2] {this.state.count2} 回クリックしました。</p>
        <Button variant="contained" color="primary" onClick={this.handleClick1.bind(this)}>C1</Button>
        <Button variant="contained" color="primary" onClick={this.handleClick2.bind(this)}>C2</Button>
      </div>
    );
  }
}

export default EffectCC